let eventBus = new Vue()

Vue.component('product-details', {
        props: {
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

Vue.component('product-review', {
    template: `
   <form class="review-form" @submit.prevent="onSubmit">
   <p v-if="errors.length">
 <b>Please correct the following error(s):</b>
 <ul>
   <li v-for="error in errors">{{ error }}</li>
 </ul>
</p>

 <p>
   <label for="name">Name:</label>
   <input  required id="name" v-model="name" placeholder="name">
   <input @click="hideReview" type="submit" value="Confirm name"> 
   <p v-if="Visibility" class="butrad">«Would you recommend this product?».</p>
   <label  style="display: none" v-show="Visibility" for="radiobuttonfirst">yes</label>
   <input style="display: none" v-show="Visibility" type="radio" id="radiobuttonfirst" name="223" @click="rating=5">
   <label style="display: none" v-show="Visibility" for="radiobuttontwo">no</label>
   <input style="display: none" v-show="Visibility" type="radio" id="radiobuttontwo" name="223" @click="rating=1">
 </p>

 <p>
   <label style="display: none" v-show="Visibility" for="review">Review:</label>
   <textarea required style="display: none" v-show="Visibility" id="review" v-model="review"></textarea>
 </p>

 <p>
   <label style="display: none" v-show="Visibility" for="rating">Rating:</label>
   <select style="display: none" v-show="Visibility" id="rating"   v-model.number="rating">
     <option>5</option>
     <option>4</option>
     <option>3</option>
     <option>2</option>
     <option>1</option>
   </select>
 </p>

 <p>
   <input type="submit" value="Submit"> 
 </p>

</form>
 `,
    data() {
        return {
            Visibility: false,
            name: null,
            review: null,
            rating: null,
            errors: [],
        }
    },
    methods: {
        hideReview() {
            this.Visibility = true;
        },
        onSubmit() {
            if(this.name && this.review && this.rating) {
                let productReview = {
                    name: this.name,
                    review: this.review,
                    rating: this.rating
                }
                eventBus.$emit('review-submitted', productReview)
                this.name = null
                this.review = null
                this.rating = null
            } else {
                if (!this.name) this.errors.push("Name required.")
                if (!this.review) this.errors.push("Review required.")
                if (!this.rating) this.errors.push("Rating required.")
            }
            },

    }
})
Vue.component('product-tabs', {
    props: {
        reviews: {
            type: Array,
            required: false
        },
        shipping: {
            required: true
        },
        details: {
            type: Array,
            required: true
        }
    },
    template: `
     <div>   
       <ul>
         <span class="tab"
               :class="{ activeTab: selectedTab === tab }"
               v-for="(tab, index) in tabs"
               @click="selectedTab = tab"
         >{{ tab }}</span>
       </ul>
       <div v-show="selectedTab === 'Reviews'">
         <p v-if="!reviews.length">There are no reviews yet.</p>
         <ul>
           <li v-for="review in reviews">
           <p>{{ review.name }}</p>
           <p>Rating: {{ review.rating }}</p>
           <p>{{ review.review }}</p>
           </li>
         </ul>
       </div>
       <div v-show="selectedTab === 'Make a Review'">
         <product-review></product-review>
       </div>
       <div v-show="selectedTab === 'Shipping'">
       <p>Shipping:{{shipping}}</p> 
</div>
<div v-show="selectedTab === 'Details'">
<ul>
                <li v-for="detail in details">{{ detail }}</li>
            </ul>
</div>
     </div>
`,


    data() {
        return {
            tabs: ['Reviews', 'Make a Review', 'Shipping', 'Details'],
            selectedTab: 'Reviews'
        }
    }
})


Vue.component('product', {
    props: {
        premium: {
            type: Boolean,
            required: true
        }
    },
    template: `
   <div class="product">
	<div class="product-image">
            <img v-bind:alt="altText" v-bind:src="image"/>
            <div>

</div>

    </div>

        <div class="product-info">
            <h1>{{ title }}</h1>
            <p>{{description}}</p>
            <p v-if="inventory > 10">In Stock</p>
            <p v-else-if="inventory <= 10 && inventory > 0">Almost sold out!</p>
            <p v-else style="text-decoration: line-through">Out of Stock</p>
            <p v-if="onSale"><span>{{sale}} On sale</span></p>
            <p v-else="onSale"><span></span></p>
            <a v-bind:href="link">More products like this.</a>
            <div class="color-box"
                 v-for="(variant, index) in variants"
                 :style="{ backgroundColor:variant.variantColor }"
                 @mouseover="updateProduct(index)">

            </div>

                <ul>
                <li v-for="sizes in sizes">{{ sizes }}</li>
                </ul>

            <button v-on:click="addToCart"
                    :disabled="!inStock"
                    :class="{ disabledButton: !inStock }">Add to cart</button>
            <button v-on:click="minusToCart"
                    :disabled="!inStock"
                    :class="{ disabledButton: !inStock }">Minus to cart</button>
            <button v-on:click="clearCart"
                    :disabled="!inStock"
                    :class="{ disabledButton: !inStock }">Clear to cart</button>
            <div class="cart">
            
            </div>

              
        </div>
                    <product-tabs :reviews="reviews" :shipping="shipping" :details="details" ></product-tabs>
   </div>
 `,
    data() {
        return {
            //отзыв
            name: null,
            review: null,
            rating: null,
            //
            product: "Socks",
            brand: 'Vue Mastery',
            description: "A pair of warm, fuzzy socks.",
            selectedVariant: 0,
            altText: "A pair of socks",
            link: "https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords=socks",
            inventory: 100,
            onSale: true,
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
            reviews: [],
        }
    },
    mounted() {
        eventBus.$on('review-submitted', productReview => {
            this.reviews.push(productReview)
        })
    },

    methods: {
        addReview(productReview) {
            this.reviews.push(productReview)
        },
        addToCart() {
            this.$emit('add-to-cart');
        },
        minusToCart() {
            this.$emit('minus-to-cart');
        },
        clearCart() {
            this.$emit('clear-to-cart');
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
        inStock() {
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
        cart: []
    },
    methods: {
        updateCart(id) {
            this.cart.push(id);
        },
        minusToCart228(id) {
            this.cart.pop(id);
        },
        clearCart(id) {
            for (let i = this.cart.length - 1; i >= 0; i--) {
                if (this.cart[i] === id) {
                    this.cart.splice(i, 1);
                }
            }
        },
        ratingChose() {
            this.ratingTop = true;
        }
    }
})