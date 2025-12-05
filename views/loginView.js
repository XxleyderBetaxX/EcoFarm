//loginView.js
//Componente que muestra la vista de iniciar sesión

export const LoginView = {

    //Datos reactivos del componente
    data() {
        return {

            //Nombre y contraseña que ingresa el usuario
            name: "",
            password: ""

        };
        
    },

    methods: {
        async login() {
            try {
                //Enviar las credenciales al backend
                const response = await fetch("http://127.0.0.1:8000/api/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        //Tomar el valor del input del usuario y contraseña
                        name: this.name,
                        password: this.password
                    }),
                });

                //Convertir respuesta en JSON para poder trabajar con lso datos
                const data = await response.json();
                console.log("Respuesta del backend: ", data);

                //Condicional de si el login es exitoso
                if (response.ok) {

                    //Guardar token de autenticación en localStorage
                    const token = data.token; 
                    localStorage.setItem('token', token);

                    //Guardar balance de la wallet en localStorage
                    const walletBalance = data.wallet_balance;
                    localStorage.setItem('wallet_balance', walletBalance);

                    //Si el login fue exitoso se le muestra un mensaje
                    alert("Login exitoso");

                    //Redirige a la vista del jardín
                    this.$root.goToGardenView();

                } else {
                    //Si la respuesta del backend indica error se muestra un mensaje
                    alert("Error: " + (data.error || "Credenciales inválidas"));
                }
                
            } catch (error) {
                //Caputar errores de conexión con el servidor
                console.error("Error:", error);
                alert("No se pudo conectar con el servidor");
                
            }
        }

    },


//Plantilla HTML del componente
template: /*html*/`
<div class="background-login">

    <div class="login card">
        <h1 class="text-king white-color center">Iniciar Sesión</h1>
        <form class="form" @submit.prevent="login">

            <label class="text-lx white-color medium">Usuario</label>
            <input v-model="name" type="text" placeholder="Ingresa tu usuario" class="input text-ml medium" />

            <label class="text-lx white-color medium">Contraseña</label>
            <input v-model="password" type="password" placeholder="Ingresa tu contraseña" class="input text-ml medium" />

            <div class="space-buttons">
                <button @click="$root.goToHomeView()" type="submit" class="button-font button-main">Volver</button>
                <button type="submit" class="button-font button-main">Iniciar sesión</button>
            </div>

        </form>
    </div>

</div>
`

    

};

