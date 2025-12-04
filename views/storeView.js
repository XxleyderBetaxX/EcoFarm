import { HeaderNavbar } from "../components/headerNavbar.js";

export const StoreView = {
    components: { HeaderNavbar },
    
    data() {
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

            totalCoins: 0,
            totalCoinsUser: localStorage.getItem('wallet_balance') 
                        ? parseInt(localStorage.getItem('wallet_balance')) 
                        : 1000, 
        };
        
    },

    props: {
        coins: { default: 1000 },
        username: { default: 'Usuario'}

    },
    
    emits: ['goToGardenView'],

    mounted() {
    this.loadWalletBalance();
},


    methods: {
    async loadWalletBalance() {
        try {
            const response = await fetch("http://127.0.0.1:8000/api/wallet", {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            });
            const data = await response.json();
            if (response.ok) {
                this.totalCoinsUser = data.wallet_balance;
                localStorage.setItem('wallet_balance', data.wallet_balance);
            }
        } catch (error) {
            console.error(error);
        }
    },

    increment(product) {
        product.amount++;
        this.updateTotal();
    },

    decrement(product) {
        if (product.amount > 0) {
            product.amount--;
            this.updateTotal(); 
        }
    },

    updateTotal() {
        let total = 0;

        for (let i = 0; i < this.products.length; i++) {
            total += this.products[i].amount * this.products[i].price;
        }

        this.totalCoins = total;
    },

    async buyProducts() {
        const productsToBuy = this.products.filter(p => p.amount > 0);
        if (productsToBuy.length === 0) {
            alert("Selecciona algún producto primero");
            return;
        }

        try {
            const response = await fetch("http://127.0.0.1:8000/api/wallet/buy", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify({
                    products: productsToBuy
                }),
            });

            const data = await response.json();
            console.log("Respuesta del backend:", data);

            if (response.ok) {
                alert("Compra realizada con éxito");
                this.totalCoinsUser = data.wallet_balance;
                this.products.forEach(p => p.amount = 0);
                this.updateTotal();
            } else if (response.status === 400) {
                alert(data.message);
            } else {
                alert("Error: " + (data.message || "No se pudo completar la compra"));
            }
        } catch (error) {
            console.error("Error:", error);
            alert("No se pudo conectar con el servidor");
        }
    },

    async sellProducts() {
        const productsToSell = this.products.filter(p => p.amount > 0);
        if (productsToSell.length === 0) {
            alert("Selecciona algún producto primero");
            return;
        }

        try {
            const response = await fetch("http://127.0.0.1:8000/api/wallet/sell", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify({
                    products: productsToSell
                }),
            });

            const data = await response.json();

            if (response.ok) {
                this.totalCoinsUser = data.wallet_balance;
                this.products.forEach(p => p.amount = 0);
                this.updateTotal();
                alert(`Has vendido productos por ${data.total_sold} monedas`);
            } else {
                alert("Error: " + (data.message || "No se pudo completar la venta"));
            }
        } catch (error) {
            console.error("Error:", error);
            alert("No se pudo conectar con el servidor");
        }
    }
},


    

template: /*html*/`
<div>
    <HeaderNavbar
        :coins="coins"
        :username="username"
        botonDestino="Ir al Jardín"
        accionBoton="goToGardenView"
    />

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


