export const LoginView = {
    data() {
        return {
            name: "",
            password: ""

        };
        
    },

    methods: {
        async login() {
            try {
                const response = await fetch("http://127.0.0.1:8000/api/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        name: this.name,
                        password: this.password
                    }),
                });
                const data = await response.json();
                console.log("Respuesta del backend: ", data);

                if (response.ok) {
                    const token = data.token; 
                    const walletBalance = data.wallet_balance;
                    localStorage.setItem('token', token);
                    localStorage.setItem('wallet_balance', walletBalance);
                    alert("Login exitoso");
                    this.$root.goToGardenView();
                } else {
                    alert("Error: " + (data.error || "Credenciales inválidas"));
                }
                
            } catch (error) {
                console.error("Error:", error);
                alert("No se pudo conectar con el servidor");
                
            }
        }

    },



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

