let app = new Vue({
    el: '#app',
    data: {
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
        //корзина
        cart:0,
        //Слияние названия brand и product
    },
    computed: {
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
    },
    methods: {
        addToCart() {
            this.cart += 1
        },
        minusToCart() {
            this.cart -= 1
        }
    }

})