import { HomeView } from '../views/homeView.js';
import { LoginView } from '../views/loginView.js';


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
            this.currentView = 'login-view'
        }
        

    },
    

    mounted() {
        
    },





});

app.component('home-view', HomeView);
app.component('login-view', LoginView);


// Montar la app
app.mount('#app');