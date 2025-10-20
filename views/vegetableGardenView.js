
export const GardenView = {

  props: {
    backgroundImage: {
      type: String,
      required: true
    }
  },

  template: `
  <div 
    class="vegetable-garden-view"
    :style="{
      background: 'linear-gradient(hsla(0,0%,0%,0.4), hsla(0,0%,0%,0.4)), url(' + backgroundImage + ') no-repeat center/cover'
    }"
  >
    <div class="garden-content">
      <h1 class="text-giant white-color">Mi Huerta Virtual</h1>
      <p class="text-l white-color center">Cuida tus plantas y haz crecer tu EcoFarm </p>
      <div class="garden-buttons">
        <button class="button-font">Ver Mis Plantas</button>
        <button class="button-font">Ir a la Tienda</button>
      </div>
    </div>
  </div>
  `
};

