export const HomeView =  {

    props: {

    },

    computed: {

    },

    methods: {

    },


    template: /*html*/`
    <div class="background-home">
    <div class="home-view">
        <h1 class="text-giant white-color">Bienvenido a EcoFarm</h1>
        <div class="buttons-home">
        <button @click="$root.goToLogin()" class="button-font">Iniciar Sesión</button>

        <button class="button-font" >Registrarse</button>
        </div>
    </div>
    </div>
    

    `


    

};


