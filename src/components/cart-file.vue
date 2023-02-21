<template>
    <TabletopFile />
    <div class="CartFile">
        <div class="fakeTableTop"></div>
        <div class="emptyCart" v-if="this.GETCART.length === 0">Your cid is empty</div>
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
        <div class="allSumm">Total: {{ this.calculateTotalPrice }}</div>
    </div>
    <div class="fakeFooter" v-if="windowW <= 768"></div>
    <FooterFile/>
</template>

<script>
    import FooterFile from '../components/footer-file.vue'
    import CartItem from '../components/cart-item.vue'
    import TabletopFile from '../components/tabletop-file.vue'
    import { mapActions, mapGetters } from 'vuex'
    export default {
        name: 'CartFile',
        components:{
            CartItem,
            TabletopFile,
            FooterFile,
        },
        props: {
        },
        data(){
            return {
                windowW: ''
            }
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
            calcWindowW() {
            this.windowW = window.innerWidth
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

<style>
    .CartFile {
        display: flex;
        width: 100vw;
        min-height: 100vh;
        flex-direction: column;
        align-items: center;
        position: relative;
        margin-bottom: 30px;
    }
    .fakeTableTop {
        width: 100vw;
        height: 80px;
        background-color: black;
    }
    .emptyCart {
        width: 300px;
        height: 100px;
        line-height: 100px;
        font-size: 32px;
        color: orange;
        text-shadow: 3px 3px 10px 0 solid black;
        margin-top: 30vh;
    }
    .ItemsInCart {
        width: 700px;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        margin-top: 10px;
        z-index: 1;
    }
    .allSumm {
        width: 150px;
        height: 25px;
        background-color: rgba(130, 125, 209);
        position: fixed;
        top: 80px;
        right: 29%;
        text-align: center;
        line-height: 25px;
        border-bottom-left-radius: 20px;
        border-bottom-right-radius: 20px;
        color: rgba(125, 209, 167);
        z-index: 2;
    }
    .orLine{
        height: 3px;
        width: 100%;
        background-color: orange;
        position: fixed;
        top: 80px;
        z-index: 1;
    }



    @media (max-width: 1023px) {
        .fakeTableTop {
            height: 60px;
        }
        .allSumm {
            width: 100px;
            height: 25px;
            background-color: rgba(130, 125, 209);
            position: fixed;
            top: 25%;
            right: 25px;
            text-align: center;
            line-height: 25px;
            color: rgba(125, 209, 167);
            border-radius: 99px;
            z-index: 2;
    }
    }

    @media (max-width: 320px) {
        .CartFile {
            margin: 0;
        }
        .ItemsInCart {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        margin-top: 0px;
        z-index: 1;
    }
    }
</style>