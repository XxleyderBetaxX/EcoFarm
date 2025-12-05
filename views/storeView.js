//storeView.js
//Componente que muestra la vista de la tienda

import { HeaderNavbar } from "../components/headerNavbar.js";

export const StoreView = {
    //Se registra el componente headerNavbar que se usará en la vista
    components: { HeaderNavbar },
    
    data() {
        //Lista de productos disponibles en la tienda
        return {
            products: [
                { name: "Zanahoria", img: "./assets/img/carrot-seed.png", price: 110, amount:0 },
                { name: "Lechuga", img: "./assets/img/lettuce-seed.png", price: 120, amount:0 },
                { name: "Cebolla", img: "./assets/img/onion-seed.png", price: 140, amount:0 },
                { name: "Calabaza", img: "./assets/img/pumpkin-seed.png", price: 180, amount:0 },
                { name: "Rábano", img: "./assets/img/radish-seed.png", price: 100, amount:0 },
                { name: "Fresa", img: "./assets/img/strawberry-seed.png", price: 160, amount:0 },
                { name: "Tomate", img: "./assets/img/tomato-seed.png", price: 130, amount:0 },
                { name: "Sandía", img: "./assets/img/watermelon-seed.png", price: 200, amount:0 },
                
            ],

            //Total de monedas de la compra actual
            totalCoins: 0,

            //Saldo del usuario, se obtiene de localStorage si existe, si no se inicia con 1000 monedas
            totalCoinsUser: localStorage.getItem('wallet_balance') 
                        ? parseInt(localStorage.getItem('wallet_balance')) 
                        : 1000, 
        };
        
    },

    
    props: {
        //Valor inicial de monedas
        coins: { default: 1000 },

        //Nombre del usuario
        username: { default: 'Usuario'}

    },
    
    //Eventos que pueden emitir esta vista
    emits: ['goToGardenView'],

    //Cuando el componente se monta en la página, se carga el balance (la cantidad de monedas) del usuario desde el backend
    mounted() {
    this.loadWalletBalance();
},


    methods: {
    //Cargar el balance de la wallet desde el backend
    async loadWalletBalance() {
            try {
            //Llamada al endpoint del backend para obtener el balance del usuario
            const response = await fetch("http://127.0.0.1:8000/api/wallet", {
                headers: {
                    //Se indica que el cuerpo del request está en JSON
                    "Content-Type": "application/json",

                    //Esperamos recibir JSON como respuesta
                    "Accept": "application/json",

                    //Se envía el token de autenticación que se guardó en localStorage
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            });
                
            //Se convierte la respuesta del servidor a un objeto JS desde JSON
            const data = await response.json();
            
            //Si la respuesta es correcta se actualiza el saldo del usuario
            if (response.ok) {
                this.totalCoinsUser = data.wallet_balance;
                //Se guarda el balance en localStorage para que se mantenga al recargar la página
                localStorage.setItem('wallet_balance', data.wallet_balance);
            }
        } catch (error) {
            //Error al conectar con el servidor
            console.error(error);
        }
    },

    //Incrementar la cantidad de un producto en la compra
    increment(product) {
        product.amount++;
        this.updateTotal();
        },
    
    //Disminuir la cantidad de un producto en la compra
    decrement(product) {
        if (product.amount > 0) {
            product.amount--;
            this.updateTotal(); 
        }
    },

    //Calcular el monto total de monedas de la compra
    updateTotal() {
        let total = 0;

        for (let i = 0; i < this.products.length; i++) {
            total += this.products[i].amount * this.products[i].price;
        }

        this.totalCoins = total;
    },

    //Comprar los productos seleccionados
    async buyProducts() {
        
        //Se filtra solo los productos que tienen cantidad mayor a 0
        const productsToBuy = this.products.filter(p => p.amount > 0);
        if (productsToBuy.length === 0) {
            alert("Selecciona algún producto primero");
            return;
        }

        try {
            //Llamada al backend para realizar la compra
            const response = await fetch("http://127.0.0.1:8000/api/wallet/buy", {
                method: "POST",
                headers: {
                    //Se indica que el cuerpo del request está en JSON
                    "Content-Type": "application/json",

                    //Esperamos recibir JSON como respuesta
                    "Accept": "application/json",

                    //Se envía el token del usuario para autenticar la solicitud
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
                //Se envían los productos a comprar
                body: JSON.stringify({
                    products: productsToBuy
                }),
            });

            const data = await response.json();
            console.log("Respuesta del backend:", data);

            //Si la compra sale bien
            if (response.ok) {
                alert("Compra realizada con éxito");

                //Acualizamos el balance del usuario
                this.totalCoinsUser = data.wallet_balance;

                //Se reinicia las cantidades de los productos seleccionados
                this.products.forEach(p => p.amount = 0);

                //Recalcula el total
                this.updateTotal();

            } else if (response.status === 400) {
                //Error de validación
                alert(data.message);
            } else {
                alert("Error: " + (data.message || "No se pudo completar la compra"));
            }
            //Error con el servidor
        } catch (error) {
            console.error("Error:", error);
            alert("No se pudo conectar con el servidor");
        }
    },


    //Vender productos seleccionados
        async sellProducts() {
        //Se filtra los productos que tienen cantidad mayor a 0
        const productsToSell = this.products.filter(p => p.amount > 0);
        if (productsToSell.length === 0) {
            alert("Selecciona algún producto primero");
            return;
        }

            try {
            //Se llama al bakend para poder vender los productos
            const response = await fetch("http://127.0.0.1:8000/api/wallet/sell", {
                method: "POST",
                headers: {
                    //Se indica que el cuerpo del request está en JSON
                    "Content-Type": "application/json",

                    //Esperamos recibir JSON como respuesta
                    "Accept": "application/json",
                    
                    //Se envía el token del usuario para autenticar la solicitud
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },

                //Cuerpo del request en donde se envían los productos que el usuario quiere veneder
                body: JSON.stringify({
                    products: productsToSell
                }),
            });

            const data = await response.json();

                if (response.ok) {

                //Actualizamos el saldo del usuario después de la venta
                this.totalCoinsUser = data.wallet_balance;
                
                //Se reinicia las cantidades
                this.products.forEach(p => p.amount = 0);
                this.updateTotal();
                
                //Mensaje después de haber vendido
                alert(`Has vendido productos por ${data.total_sold} monedas`);
            } else {
                alert("Error: " + (data.message || "No se pudo completar la venta"));
            }
        
        //Error en el servidor
        } catch (error) {
            console.error("Error:", error);
            alert("No se pudo conectar con el servidor");
        }
    }
},


    
//Plantilla HTML del componente
template: /*html*/`
<div>
    <HeaderNavbar
        :coins="coins"
        :username="username"
        botonDestino="Ir al Jardín"
        accionBoton="goToGardenView"
    />

    <!-- HTML de la parte de comprar productos-->
    <div class="background-store">
        <div class="square-store">
            <img src="./assets/img/titleStore.png" alt="EcoFarm Store" class="margin-btm-xxl">

            <div class="store-frame">
                <img src="./assets/img/square.png" alt="Square for the store" class="store-background">

                <div class="store-overlay">
                    <ul class="no-style products-store">
                        <li v-for="product in products" :key="product.name">
                            <img :src="product.img" alt="" class="product-img">
                            <div class="price-row">
                                <h3 class="margin-btm-xs light">Precio: {{ product.price }}</h3>
                                <img src="./assets/img/coin2.png" alt="coin" class="coin-store">
                            </div>
                            <div class="buttons-store">
                                <button class="text-xl btn-plus" @click="increment(product)">+</button>
                                <button class="text-xl btn-minus" @click="decrement(product)">-</button>
                            </div>
                        </li>
                    </ul>

                    <div class="info-store">
                        <h2 class="text-xxl bold ">Total:</h2>
                        <ul class="no-style">
                            <li v-for="product in products" :key="product.name" class="space-b-xs">
                                <h2 class="text-lx regular margin-btm-sm">{{ product.name }}: {{ product.amount }}</h2>
                            </li>
                        </ul>
                        <h2 class="text-xl bold margin-btm-m">-{{ totalCoins }} monedas</h2>
                        <button class="text-l btn-buy" @click="buyProducts">Comprar</button>
                        <h2 class="text-lx regular margin-b-m">Saldo actual:
                            <span :style="{ color: totalCoinsUser === 0 ? 'red' : 'green'}">{{ totalCoinsUser }} monedas </span>
                        </h2>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- HTML de la parte de vender productos-->
    <div class="background-store">
        <div class="square-store">
            <img src="./assets/img/titleStoreSell.png" alt="EcoFarm Store" class="margin-btm-xxl">

            <div class="store-frame">
                <img src="./assets/img/square.png" alt="Square for the store" class="store-background">

                <div class="store-overlay">
                    <ul class="no-style products-store">
                        <li v-for="product in products" :key="product.name">
                            <img :src="product.img" alt="" class="product-img">
                            <div class="price-row">
                                <h3 class="margin-btm-xs light">Precio: {{ product.price }}</h3>
                                <img src="./assets/img/coin2.png" alt="coin" class="coin-store">
                            </div>
                            <div class="buttons-store">
                                <button class="text-xl btn-plus" @click="increment(product)">+</button>
                                <button class="text-xl btn-minus" @click="decrement(product)">-</button>
                            </div>
                        </li>
                    </ul>

                    <div class="info-store">
                        <h2 class="text-xxl bold margin-btm-sm">Total:</h2>
                        <ul class="no-style">
                            <li v-for="product in products" :key="product.name" class="space-b-xs">
                                <h2 class="text-lx regular margin-btm-sm">{{ product.name }}: {{ product.amount }}</h2>
                            </li>
                        </ul>
                        <h2 class="text-xl bold margin-btm-m">+{{ totalCoins }} monedas</h2>
                        <button class="text-l btn-buy" @click="sellProducts">Vender</button>
                        <h2 class="text-lx regular margin-b-m">Saldo Actual: 
                            <span :style="{ color: totalCoinsUser === 0 ? 'red' : 'green'}">{{ totalCoinsUser }} monedas </span>
                        </h2>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
`



    

};


