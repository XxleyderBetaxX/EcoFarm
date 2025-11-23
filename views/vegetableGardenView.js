import { HeaderNavbar } from '../components/headerNavbar.js';

export const GardenView = {
  components: { HeaderNavbar },

  data() {
    return {
      currentAction: null,
      selectedVegetable: null,

      vegetableImages: {
        tomato: { seed: "./assets/img/harvested tomato.png", grown: "./assets/img/tomato.png" },
        carrot: { seed: "./assets/img/harvested carrot.png", grown: "./assets/img/carrot.png" },
        watermelon: { seed: "./assets/img/harvested watermelon.png", grown: "./assets/img/watermelon.png" },
        onion: { seed: "./assets/img/harvested onion.png", grown: "./assets/img/onion.png" },
        strawberry: { seed: "./assets/img/harvested strawberry.png", grown: "./assets/img/strawberry.png" },
        radish: { seed: "./assets/img/harvested radish.png", grown: "./assets/img/radish.png" },
        lettuce: { seed: "./assets/img/harvested lettuce.png", grown: "./assets/img/lettuce.png" },
        pumpkin: { seed: "./assets/img/harvested pumpkin.png", grown: "./assets/img/pumpkin.png" }
      },

      parcels: Array(32).fill().map(() => ({
        img: "./assets/img/earth.png",
        watered: false,
        fertilized: false,
        planted: false,
        vegetable: null
      }))
    };
  },

  methods: {
    setAction(action) {
      this.currentAction = action;
    },

    ParcelClick(index) {
      if (!this.currentAction) return;

      const parcel = this.parcels[index]; 

      switch (this.currentAction) {
        case "Sembrar":
          if (this.selectedVegetable)
            {
            parcel.planted = true;
             parcel.watered = false;
             parcel.fertilized = false;
            parcel.vegetable = this.selectedVegetable;
            parcel.img = this.vegetableImages[parcel.vegetable].seed;
            this.currentAction = null;
          }
          break;

        case "Cosechar":
          if (parcel.planted && parcel.watered && parcel.fertilized) {
            parcel.planted = false;
            parcel.watered = false;
            parcel.fertilized = false;
            parcel.vegetable = null;
            parcel.img = "./assets/img/earth.png";
          }
          break;

        case "Regar":
          if (parcel.planted) {
            parcel.watered = true;
            this.updateParcel(parcel);
          }
          break;

        case "Abonar":
          if (parcel.planted) {
            parcel.fertilized = true;
            this.updateParcel(parcel);
          }
          break;
      }
    },

    updateParcel(parcel) {
      if (parcel.planted && parcel.watered && parcel.fertilized) {
        parcel.img = this.vegetableImages[parcel.vegetable].grown;
      } else if (parcel.planted) {
        parcel.img = this.vegetableImages[parcel.vegetable].seed;
      } else {
        parcel.img = "./assets/img/earth.png";
      }
    }
  },

  template: `
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
            <label class ="button-font">Elegir vegetal:</label>
            <select v-model="selectedVegetable">
              <option v-for="(images, vegetable) in vegetableImages" :key="vegetable" :value="vegetable">
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
             <button class="button-font button-main" @click="setAction('Regar')">Regar</button>
            <button class="button-font button-main" @click="setAction('Abonar')">Abonar</button>
             <button class="button-font button-main" @click="setAction('Sembrar')">Sembrar</button>
             <button class="button-font button-main" @click="setAction('Cosechar')">Cosechar</button>
          </div>
        </div>
      </div>
    </div>
  `
};

