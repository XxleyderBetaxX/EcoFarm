// HeaderNavbar.js
export const HeaderNavbar = {
  props: {
    username: { default: 'Usuario' },
    coins: {  default: 1000 }
  },
  template: `
    <header class="header-navbar">
      <div class="user-size">{{ username }}</div>
      <div class="coin-center">
        <img src="./assets/img/coin.png" alt="Monedas" >
        <span class="coin-count">{{ coins }}</span>
      </div>
      <div class="buttton-right">
        <button @click="$root.goToShop()" class="button-font">Ir a Tienda</button>
        
       <button @click="$root.goToHome()" class="button-font">Cerrar Sesión</button>
      </div>
    </header>
  `
};
