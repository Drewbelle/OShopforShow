import CartItem from '../components/cart-item.vue'
import TabletopFile from '../components/tabletop-file.vue'
import { mapActions, mapGetters } from 'vuex'
    export default {
        name: 'CartFile',
        components:{
            CartItem,
            TabletopFile
        },
        props: {
        },
        data(){
            return {
            }
        },
        computed: {
            ...mapGetters([
                'GETCART', 'GETGOODS'
            ]),
            calculateTotalPrice() {
                var unitsTotalPrice = null
                var totalPrice = null
                unitsTotalPrice = this.GETCART.map(element => {
                    return element.price * element.summGood
                })
                unitsTotalPrice.push(0)
                totalPrice = unitsTotalPrice.reduce((a , b) => {
                    return a + b
                })
                return totalPrice
            }
        },
        methods: {
            ...mapActions([ 'ADDMOREGOOD', 'ADDLESSGOOD', 'GETGOODSSFROMAPI', 'MAKEGOODSNULL', 'GETDELGOOD' ]),
            moreGood(index) {
                this.ADDMOREGOOD(index)
            },
            lessGood(index) {
                this.ADDLESSGOOD(index)
            },
            delGood(index) {
                this.GETDELGOOD(index)
            }
        },
        mounted() {
            this.GETGOODSSFROMAPI()//получаем список  из db.json и заносим в массив в store
        },
        unmounted() {
            this.MAKEGOODSNULL()
        }
    }