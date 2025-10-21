export const RegisterView =  {

    props: {

    },

    computed: {

    },

    methods: {

    },


    template: /*html*/`
    <div class = "background-login ">
    
    <div class = "login card-register">
        <h1 class="text-king white-color center">Registrarse</h1>
    <form class="form ">
    
        <label class="text-lx white-color medium ">Usuario</label>
        <input type="text" placeholder="Ingresa tu usuario" class="input text-ml medium" />

        <label class="text-lx white-color medium ">Correo electrónico</label>
        <input type="email" placeholder="Ingresa tu correo eletrónico" class="input text-ml medium" />


        <label class="text-lx white-color medium">Contraseña</label>
        <input type="password" placeholder="Ingresa tu contraseña" class="input text-ml medium " />

        <label class="text-lx white-color medium ">Confirmar contraseña</label>
        <input type="password" placeholder="Confirma tu contraseña" class="input text-ml medium" />
        </form>
    <div class = " space-buttons ">

        <button @click="$root.goToHomeView()" type="submit" class="button-font">Volver</button>
        <button @click="$root.goToGardenView()" type="submit" class="button-font">Crear Cuenta</button>
        </div>
    
        </div>
    </div>
    

    `


    

};
