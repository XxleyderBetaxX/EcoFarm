export const RegisterView = {
    
    data() {
        return {
            name: "",
            email: "",
            password: "",
            password_confirmation: ""
        };
        
    },


    methods: {
        async register() {
            try {
                const response = await fetch("http://127.0.0.1:8000/api/register", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        name: this.name,
                        email: this.email,
                        password: this.password,
                        password_confirmation: this.password_confirmation
                        
                    }),

                });

                const data = await response.json();
                console.log("Respuesta del backend: ", data);
                
                if (response.ok) {
                    alert("Usuario creado con éxito");
                    this.$root.goToLoginView();
                } else {
                    alert("Error " + (data.error || "Verifica los datos"));
                }

            } catch (error) {
                console.error("Error ", error);
                alert("No se pudo conectar con el servidor")
            }
        }
        

    },


    template: /*html*/`
<div class="background-login">

    <div class="login card-register">
        <h1 class="text-king white-color center">Registrarse</h1>
        <form class="form" @submit.prevent="register">

            <label class="text-lx white-color medium">Usuario</label>
            <input v-model="name" type="text" placeholder="Ingresa tu usuario" class="input text-ml medium" />

            <label class="text-lx white-color medium">Correo electrónico</label>
            <input v-model="email" type="email" placeholder="Ingresa tu correo eletrónico" class="input text-ml medium" />

            <label class="text-lx white-color medium">Contraseña</label>
            <input v-model="password" type="password" placeholder="Ingresa tu contraseña" class="input text-ml medium" />

            <label class="text-lx white-color medium">Confirmar contraseña</label>
            <input v-model="password_confirmation" type="password" placeholder="Confirma tu contraseña" class="input text-ml medium" />

            <div class="space-buttons">
                <button @click="$root.goToHomeView()" type="submit" class="button-font button-main">Volver</button>
                <button type="submit" class="button-font button-main">Crear Cuenta</button>
            </div>

        </form>
    </div>

</div>
`



    

};
