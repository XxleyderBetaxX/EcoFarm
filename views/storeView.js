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

            selectedProduct: null,
            totalCoins: 0
        };
        
    },

    props: {
        coins: { default: 1000 },
        username: { default: 'Usuario'}

    },
    
    emits: ['goToGardenView'],

    computed: {

    },

    methods: {
        select(product) {
            this.selectedProduct = product.name;
        },

        increment(product) {
            product.amount++;
            this.updateTotal();
        },

        decrement(product) {
            if (product.amount>0) {
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
        <li
            v-for="product in products"
            :key="product.name"
            @click="select(product)"
            :class="{ select: selectedProduct === product.name }"
        >
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
        <h2 class="text-xl bold margin-btm-m">{{ totalCoins }} monedas</h2>
        <button class="text-l btn-buy">Comprar</button>
        </div>
    </div>
    </div>
</div>
</div>
</div>
`


    

};


