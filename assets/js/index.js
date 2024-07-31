const URL = 'data.json'
const app = Vue.createApp({
    data() {
        return {
            products: {
                items: [],
                cart: [],
            },
            cartOrder: 0,
            modal: false,
        }
    },
    methods: {
        useFetch() {
            fetch(URL)
                .then(response => response.json())
                .then(data => {
                    this.products.items = data
                })
                .catch(error => {
                    alert('Hubo un error al realizar el fetch')
                    console.log(error)
                })
        },
        handleButton(e) {
            this.products.items[e.target.title].selected = true
            this.products.items[e.target.title].count = 1
            this.cartOrder++
            this.cartAdd(e.target.title, this.products.items[e.target.title].count, this.products.items[e.target.title].name, this.products.items[e.target.title].price, this.products.items[e.target.title].image.thumbnail)
        },
        handleIncrement(e) {
            this.products.items[e.target.parentNode.title].count++
            this.cartOrder++
            for(let i of this.products.cart) {
                if(i.id == e.target.parentNode.title) {
                    i.count++
                    i.total = i.count * i.price
                }
            }
        },
        handleDecrement(e) {
            this.products.items[e.target.parentNode.title].count--
            this.cartOrder--
            for(let i of this.products.cart) {
                if(i.id == e.target.parentNode.title) {
                    if(i.count <= 1) {
                        i.count = 0
                        this.products.items[e.target.parentNode.title].selected = false
                        var deleteOrder = this.products.cart.filter(obj => obj.id != e.target.parentNode.title)
                        this.products.cart = deleteOrder
                    } else {
                        i.count--
                    }
                    i.total = i.count * i.price
                }
            }
        },
        cartAdd(id, count, name, price, image) {
            this.products.cart.push({
                "id": id,
                "count": count,
                "name": name,
                "price": price,
                "total": count * price,
                "image": image
            })
        },
        deleteOrder(e) {
            for(let i of this.products.cart) {
                if(i.id == e.target.parentNode.title) {
                    var deleteCart = this.cartOrder - i.count
                    this.cartOrder = deleteCart
                    i.count = 0
                    this.products.items[e.target.parentNode.title].selected = false
                    var deleteOrder = this.products.cart.filter(obj => obj.id != e.target.parentNode.title)
                    this.products.cart = deleteOrder
                }
            }
            
        },
        newOrder() {
            this.modal = false
            this.products.cart = []
            this.cartOrder = 0
            for(let i of this.products.items) {
                i.count = 0
                i.selected = false
            }
        }
    },
    mounted() {
        this.useFetch()
    },
    computed: {
        totalCart() {
            var total = 0
            for(let i of this.products.cart) {
                total = total + i.total
            }
            return total
        }
    }
})
app.mount('body')