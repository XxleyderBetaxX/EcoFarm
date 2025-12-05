//vegetableGarden.js

import { HeaderNavbar } from '../components/headerNavbar.js';

export const GardenView = {
  components: { HeaderNavbar },

  data() {
    return {
      // es la accion actual, ya sea cocechar, abonar etc
      currentAction: null,
      // este es el vegetal seleccionado para cocechar
      selectedVegetable: null,

//este es el array con los vegetales y todos sus estados y respectivas imagenes
      vegetableImages: {
        tomate: { seed: "./assets/img/harvested tomato.png", 
          grown: "./assets/img/tomato.png", 
          wet: "./assets/img/wet-tomato.png", 
          damaged: "./assets/img/damaged-tomato.png" },

        zanahoria: { seed: "./assets/img/harvested carrot.png", 
          grown: "./assets/img/carrot.png",
           wet: "./assets/img/wet-carrot.png", 
           damaged: "./assets/img/damaged-carrot.png" },

        sandia: { seed: "./assets/img/harvested watermelon.png", 
          grown: "./assets/img/watermelon.png", 
          wet: "./assets/img/wet-watermelon.png",
           damaged: "./assets/img/damaged-watermelon.png" },

        cebolla: { seed: "./assets/img/harvested onion.png", 
          grown: "./assets/img/onion.png", 
          wet: "./assets/img/wet-onion.png", 
          damaged: "./assets/img/damaged-onion.png" },

        fresa: { seed: "./assets/img/harvested strawberry.png",
           grown: "./assets/img/strawberry.png", 
           wet: "./assets/img/wet-strawberry.png", 
           damaged: "./assets/img/damaged-strawberry.png" },

        rabano: { seed: "./assets/img/harvested radish.png", 
          grown: "./assets/img/radish.png",
           wet: "./assets/img/wet-radish.png",
            damaged: "./assets/img/damaged-radish.png" },

        lechuga: { seed: "./assets/img/harvested lettuce.png",
           grown: "./assets/img/lettuce.png",
            wet: "./assets/img/wet-lettuce.png", 
            damaged: "./assets/img/damaged-lettuce.png" },

        calabaza: { seed: "./assets/img/harvested pumpkin.png", 
          grown: "./assets/img/pumpkin.png",
           wet: "./assets/img/wet-pumpkin.png", 
           damaged: "./assets/img/damaged-pumpkin.png" }
      },

       //Array de 32 parcelas , cada cuadrícula del terreno
      parcels: Array(32).fill().map(() => ({
        img: "./assets/img/earth.png",
        watered: false,
        fertilized: false,
        planted: false,
        vegetable: null,
        deathTimer: null,
        waterTimer: null,
        fertilizerTimer: null
      }))
    };
  },

  methods: {
    // Establece la acción actual
    setAction(action) {
      this.currentAction = action;
    },
    // Maneja os clicks en una parcela
    ParcelClick(index) {
      if (!this.currentAction) return;
      const parcel = this.parcels[index];

      switch (this.currentAction) {

        // metodo para sembrar
        case "Sembrar":
          if (this.selectedVegetable) {
            parcel.planted = true;
            parcel.watered = false;
            parcel.fertilized = false;
            parcel.vegetable = this.selectedVegetable;
            parcel.img = this.vegetableImages[parcel.vegetable].seed;

           // inicia el contador de muerte de la planta
            this.startDeathTimer(parcel);
            this.currentAction = null;
          }
          break;

          // metodo para cosechar una planta lista
        case "Cosechar":
           if (parcel.planted) {

              // esto es para evitar cosechar si la planta no está lista
              if (parcel.img !== this.vegetableImages[parcel.vegetable].grown) {
                return;
              }

              // Limpia la parcela
              parcel.planted = false;
              parcel.watered = false;
              parcel.fertilized = false;
              parcel.vegetable = null;
              parcel.img = "./assets/img/earth.png"; 
              // Limpia timers activos
              this.clearTimers(parcel); 
          }
          break;

         // metodo para regar una planta 
        case "Regar":
          if (parcel.planted) {
            parcel.watered = true;
            parcel.img = this.vegetableImages[parcel.vegetable].wet;

            clearTimeout(parcel.waterTimer);
            parcel.waterTimer = setTimeout(() => {
              parcel.watered = false;
              this.updateParcel(parcel);
              this.startDeathTimer(parcel);
            }, 8000);

            this.updateParcel(parcel);
          }
          break;

         // metodo para abonar una planta
        case "Abonar":
          if (parcel.planted) {
            parcel.fertilized = true;

            clearTimeout(parcel.fertilizerTimer);
            parcel.fertilizerTimer = setTimeout(() => {
              parcel.fertilized = false;
              this.updateParcel(parcel);
              this.startDeathTimer(parcel);
            }, 10000);

            this.updateParcel(parcel);
          }
          break;
  // metodo para desechar una planta dañada
        case "Desechar":
          if (parcel.img.includes("damaged")) {
            this.clearTimers(parcel);
            parcel.planted = false;
            parcel.watered = false;
            parcel.fertilized = false;
            parcel.vegetable = null;
            parcel.img = "./assets/img/earth.png";
          }
          break;
      }
    },

//  si la planta no está regada y abonada, muere después de 15 s
    startDeathTimer(parcel) {
      this.clearTimers(parcel);

      if (parcel.watered && parcel.fertilized) return;

      parcel.deathTimer = setTimeout(() => {
        parcel.img = this.vegetableImages[parcel.vegetable].damaged;
        parcel.planted = false;
      }, 15000);
    },

    clearTimers(parcel) {
      clearTimeout(parcel.deathTimer);
      clearTimeout(parcel.waterTimer);
      clearTimeout(parcel.fertilizerTimer);
    },
    
   // Actualiza la imagen acorde al estado actual
    updateParcel(parcel) {
      if (!parcel.planted) return;

      if (parcel.watered && parcel.fertilized) {
        parcel.img = this.vegetableImages[parcel.vegetable].grown;
        this.clearTimers(parcel);
        return;
      }

      if (parcel.watered) {
        parcel.img = this.vegetableImages[parcel.vegetable].wet;
        return;
      }

      parcel.img = this.vegetableImages[parcel.vegetable].seed;
    }
  },
//Plantilla HTML del componente
  template: /*html*/`
    <div class="garden-view-container">
      <HeaderNavbar 
        @go-home="$emit('goHome')"
        @go-to-shop="$emit('goToShop')"
      />

      <div class="background-garden">
        <div class="garden-content">

          <div class="sun-icon">
            <img src="./assets/img/sun.png" alt="Sol" />
          </div>

          <div class="crop-selector" v-if="currentAction == 'Sembrar'">
            <label class="button-font">Elegir vegetal:</label>
            <select v-model="selectedVegetable">
              <option v-for="(images, vegetable) in vegetableImages" 
                      :key="vegetable" 
                      :value="vegetable">
                {{ vegetable }}
              </option>
            </select>
          </div>

          <div class="earth-row">
            <div class="earth-grid">
              <div 
                v-for="(parcel, index) in parcels.slice(0,16)" 
                :key="'left-' + index" 
                class="earth-tile"
                @click="ParcelClick(index)"
              >
                <img :src="parcel.img" alt="Tierra para sembrar" />
              </div>
            </div>

            <div class="garden-icon center-icon">
              <img src="./assets/img/Icon.png" alt="Icono" />
            </div>

            <div class="earth-grid">
              <div 
                v-for="(parcel, index) in parcels.slice(16,32)" 
                :key="'right-' + index" 
                class="earth-tile"
                @click="ParcelClick(index + 16)"
              >
                <img :src="parcel.img" alt="Tierra para sembrar" />
              </div>
            </div>
          </div>

          <div class="garden-buttons">

           
            <button class="button-font button-main" @click="setAction('Sembrar')">Sembrar</button>
            <button class="button-font button-main" @click="setAction('Regar')">Regar</button>
            <button class="button-font button-main" @click="setAction('Abonar')">Abonar</button>
            <button class="button-font button-main" @click="setAction('Cosechar')">Cosechar</button>
            <button class="button-font button-main" @click="setAction('Desechar')">Desechar</button>

          </div>

        </div>
      </div>
    </div>
  `
};

