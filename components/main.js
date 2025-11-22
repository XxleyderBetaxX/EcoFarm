import { HomeView } from '../views/homeView.js';
import { LoginView } from '../views/loginView.js';
import { GardenView } from '../views/vegetableGardenView.js';
import { RegisterView } from '../views/registerView.js';
import { StoreView } from '../views/storeView.js';


const app = Vue.createApp({

    data() {
        return {
            currentView: 'store-view'
            
            

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
        goToShop() {
            this.currentView = 'store-view';

        }

    },
    

    mounted() {
        
    },





});

app.component('home-view', HomeView);
app.component('login-view', LoginView);
app.component('garden-view', GardenView);
app.component('register-view', RegisterView);
app.component('store-view', StoreView);




// Montar la app
app.mount('#app');