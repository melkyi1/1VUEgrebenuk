Vue.component('product-details', {
    props:{
        details: {
            type: Array,
            required: true,
        }
    },
    template: `<ul>
        <li v-for="detail in details">{{detail}}</li>
    </ul>`,
}
)

Vue.component('product', {
    props: {
        premium: {
            type:Boolean,
            required: true
        }
    },
    template: `
   <div class="product">
	<div class="product-image">
            <img v-bind:alt="altText" v-bind:src="image"/>
        </div>

        <div class="product-info">
            <h1>{{ title }}</h1>
            <p>{{description}}</p>
            <ul>
                <li v-for="detail in details">{{ detail }}</li>
            </ul>
            <p v-if="inventory > 10">In Stock</p>
            <p v-else-if="inventory <= 10 && inventory > 0">Almost sold out!</p>
            <p v-else style="text-decoration: line-through">Out of Stock</p>
            <p v-if="onSale"><span>{{sale}} On sale</span></p>
            <p v-else="onSale"><span></span></p>
            <a v-bind:href="link">More products like this.</a>
            <p>Shipping:{{shipping}}</p> 
            <div class="color-box"
                 v-for="(variant, index) in variants"
                 :style="{ backgroundColor:variant.variantColor }"
                 @mouseover="updateProduct(index)">

            </div>
            <div >
                <ul>
                <li v-for="sizes in sizes">{{ sizes }}</li>
                </ul>
            </div>
            <button v-on:click="addToCart"
                    :disabled="!inStock"
                    :class="{ disabledButton: !inStock }">Add to cart</button>
            <button v-on:click="minusToCart"
                    :disabled="!inStock"
                    :class="{ disabledButton: !inStock }">Minus to cart</button>
            <div class="cart">
            </div>



        </div>
   </div>
 `,
    data() {
        return {
            product: "Socks",
            brand:'Vue Mastery',
            description: "A pair of warm, fuzzy socks.",
            selectedVariant: 0,
            altText: "A pair of socks",
            link: "https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords=socks",
            inventory: 100,
            onSale:true,
            details: ['80% cotton', '20% polyester', 'Gender-neutral'],
            variants: [
                {
                    variantId: 2234,
                    variantColor: 'green',
                    variantImage: "./img/vmSocks-green-onWhite.jpg",
                    variantQuantity: 10
                },
                {
                    variantId: 2235,
                    variantColor: 'blue',
                    variantImage: "./img/vmSocks-blue-onWhite.jpg",
                    variantQuantity: 0
                }
            ],
            updateProduct(index) {
                this.selectedVariant = index;
                console.log(index);
            },
            //this.image = variantImage
            sizes: ['S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
        }
    },
    methods: {
        addToCart() {
            this.$emit('add-to-cart');
        },
         minusToCart() {
             this.$emit('minus-to-cart');
         },
    },
    computed: {
        shipping() {
            if (this.premium) {
                return "Free";
            } else {
                return 2.99
            }
        },
        sale() {
            return this.brand + ' ' + this.product
        },
        image() {
            return this.variants[this.selectedVariant].variantImage;
        },
        inStock(){
            return this.variants[this.selectedVariant].variantQuantity
        },
        title() {
            return this.brand + ' ' + this.product;
        }
        // тут будут вычисляемые свойства
    }
})

let app = new Vue({
    el: '#app',
    data: {
        premium: true,
        cart:[]
    },
    methods: {
        updateCart(id) {
            this.cart.push(id);
        },
        minusToCart228(id) {
            this.cart.pop(id);
            },
    },
})