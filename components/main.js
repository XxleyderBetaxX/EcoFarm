import { HomeView } from '../views/homeView.js';
import { LoginView } from '../views/loginView.js';
import { GardenView } from '../views/vegetableGardenView.js';
import { RegisterView } from '../views/registerView.js';


const app = Vue.createApp({

    data() {
        return {
            currentView: 'home-view'
            
            

        }
        

    },
    
    computed: {
        

    },

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
         goToShop() { console.log("Ir a la tienda");

          }

    },
    

    mounted() {
        
    },





});

app.component('home-view', HomeView);
app.component('login-view', LoginView);
app.component('garden-view', GardenView);
app.component('register-view', RegisterView)




// Montar la app
app.mount('#app');