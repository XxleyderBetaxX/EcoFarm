// HeaderNavbar.js
export const HeaderNavbar = {
  props: {
    username: { default: 'Usuario' },
    coins: { default: 1000 },
    botonDestino: { default: 'Ir a tienda' },
    accionBoton: {default: 'goToShop'}
  },
  template: /*html*/ `
    <header class="header-navbar">
      <div class="user-size">{{ username }}</div>
      <div class="coin-center">
        <img src="./assets/img/coin.png" alt="Monedas" >
        <span class="coin-count">{{ coins }}</span>
      </div>
      <div class="buttton-right">
        <button @click="$root[accionBoton]()" class="button-font button-main">{{botonDestino}}</button>
        
        <button @click="$root.goToHome()" class="button-font button-main">Cerrar Sesión</button>
      </div>
    </header>
  `
};
