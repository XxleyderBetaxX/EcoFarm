// HeaderNavbar.js
//es la barra superior que se ve en la vista de jardín y la tienda, la idea es que se viera el nombre del usuario
//junto con los botones de cerrar sesion y el de ir a tienda o ir al jardín, pero lo del usuario no lo logramos

export const HeaderNavbar = {

  props: {
    username: { default: 'Usuario' },
    botonDestino: { default: 'Ir a tienda' },
    accionBoton: {default: 'goToShop'}
  },
  template: /*html*/ `
    <header class="header-navbar">
    <!-- Donde se debería ver el nombre del usuario -->
      <div class="user-size">{{ username }}</div>
      <div class="buttton-right">

        <!-- Botón dinámico que ejecuta un método del root según la prop -->
        <button @click="$root[accionBoton]()" class="button-font button-main">{{botonDestino}}</button>
        
        <!-- Botón para cerrar sesión -->
        <button @click="$root.goToHome()" class="button-font button-main">Cerrar Sesión</button>
      </div>
    </header>
  `
};
