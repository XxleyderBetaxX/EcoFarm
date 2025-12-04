// HeaderNavbar.js
export const HeaderNavbar = {
  props: {
    username: { default: 'Usuario' },
    botonDestino: { default: 'Ir a tienda' },
    accionBoton: {default: 'goToShop'}
  },
  template: /*html*/ `
    <header class="header-navbar">
      <div class="user-size">{{ username }}</div>
      <div class="buttton-right">
        <button @click="$root[accionBoton]()" class="button-font button-main">{{botonDestino}}</button>
        
        <button @click="$root.goToHome()" class="button-font button-main">Cerrar Sesión</button>
      </div>
    </header>
  `
};
