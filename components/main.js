//main.js
//Archivo principal que inicializa la aplicación Vue y registra las vistas (componentes)

import { HomeView } from '../views/homeView.js';
import { LoginView } from '../views/loginView.js';
import { GardenView } from '../views/vegetableGardenView.js';
import { RegisterView } from '../views/registerView.js';
import { StoreView } from '../views/storeView.js';


//crea la instancia principal de Vue
const app = Vue.createApp({

    data() {
        return {
            //Vista actual
            currentView: 'home-view'  
        }
        
    },
    

    //Métodos para poder cambiar la vista
    methods: {
        goToLoginView() {
            this.currentView = 'login-view';
        },

        goToGardenView() {
            this.currentView = 'garden-view';
        },

        goToHomeView() {
            this.currentView = 'home-view';
        },

        goToRegisterView() {
            this.currentView = 'register-view';
        },
        goToHome(){
            this.currentView= 'home-view';
        },
        goToShop() {
            this.currentView = 'store-view';

        }

    },
    
});


//Registra los componentes de las vistas para poder usarlos en la aplicación
app.component('home-view', HomeView);
app.component('login-view', LoginView);
app.component('garden-view', GardenView);
app.component('register-view', RegisterView);
app.component('store-view', StoreView);




// Montar la app
app.mount('#app');