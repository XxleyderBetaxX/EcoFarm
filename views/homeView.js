//homeView.js
//componente que muestra la vista principal donde puede seleccionar desea iniciar sesión o registrarse

export const HomeView = {


//template para mostrar el mensaje de bienvenida y botones
    template: /*html*/`
    <div class="background-home">
    <div class="home-view">
        <h1 class="text-giant white-color">Bienvenido a EcoFarm</h1>
        <div class="buttons-home ">
        <button @click="$root.goToLoginView()" class="button-font button-main">Iniciar Sesión</button>

        <button @click="$root.goToRegisterView()" class="button-font button-main" >Registrarse</button>
        </div>
    </div>
    </div>
    

    `


    

};


