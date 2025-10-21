import { HeaderNavbar } from '../components/headerNavbar.js';

export const GardenView = {
  components: { HeaderNavbar },

  props: { 
    
  },
  emits: ['goHome', 'goToShop'],

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

          <div class="earth-row">
            <div class="earth-grid">
              <div v-for="n in 16" :key="'left-' + n" class="earth-tile">
                <img src="./assets/img/earth.png" alt="Tierra" />
              </div>
            </div>

            <div class="garden-icon center-icon">
              <img src="./assets/img/Icon.png" alt="Icono" />
            </div>

            <div class="earth-grid">
              <div v-for="n in 16" :key="'right-' + n" class="earth-tile">
                <img src="./assets/img/earth.png" alt="Tierra" />
              </div>
            </div>
          </div>

          <div class="garden-buttons">
            <button class="button-font">Regar</button>
            <button class="button-font">Abonar</button>
            <button class="button-font">Sembrar</button>
            <button class="button-font">Cosechar</button>
          </div>
        </div>
      </div>
    </div>
  `
};

