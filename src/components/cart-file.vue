<template>
    <TabletopFile />
    <div class="CartFile">
        <div class="fakeTableTop"></div>
        <div class="emptyCart" v-if="this.GETCART.length === 0">Your cart is empty</div>
        <div class="ItemsInCart">
            <CartItem 
            v-for="(Good, index) in GETCART"
            :key="Good.id"
            :cart_good_data="Good"
            @delGood="delGood(index)"
            @moreGood="moreGood(index)"
            @lessGood="lessGood(index)"
            />
        </div>
        <div class="allSumm">Total: {{ this.calculateTotalPrice }} ₽</div>
    </div>
    <div class="fakeFooter" v-if="windowW <= 768"></div>
    <FooterFile/>
</template>

<script>
    import FooterFile from '../components/footer-file.vue'
    import CartItem from '../components/cart-item.vue'
    import TabletopFile from '../components/tabletop-file.vue'
    import calcWindowMixin from './mixinsForComponents/calcWindow-mixin'
    import { mapActions, mapGetters } from 'vuex'
    export default {
        name: 'CartFile',
        mixins: [calcWindowMixin],
        components:{
            CartItem,
            TabletopFile,
            FooterFile,
        },
        props: {
        },
        data(){
            return {}
        },
        computed: {
            ...mapGetters([
                'GETCART'
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
            this.GETGOODSSFROMAPI(), this.calcWindowW()//получаем список  из db.json и заносим в массив в store
        },
        unmounted() {
            this.MAKEGOODSNULL()
        }
    }
</script>

<style lang="scss">
    
</style>