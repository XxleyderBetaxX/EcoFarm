export const HomeView =  {



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


