import { HomeView } from '../views/homeView.js';
import { LoginView } from '../views/loginView.js';
import { GardenView } from '../views/vegetableGardenView.js';


const app = Vue.createApp({

    data() {
        return {
            currentView: 'home-view'
            
            

        }
        

    },
    
    computed: {
        

    },

    methods: {
        goToLogin() {
            this.currentView = 'login-view';
        },

        goToGardenView() {
            this.currentView = 'garden-view';
        }
        

    },
    

    mounted() {
        
    },





});

app.component('home-view', HomeView);
app.component('login-view', LoginView);
app.component('garden-view', GardenView);




// Montar la app
app.mount('#app');