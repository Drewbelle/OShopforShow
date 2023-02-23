<template>
    <div class="CartItem">
        <div class="delGood" @click="delGood">X</div>
        <img class="GoodsItemsImage" :src=" require('@/assets/css/gameShopContent/' + cart_good_data.url) " alt="">
        <div class="cartItemInfo">        
            <div class="cartItemName">{{ cart_good_data.name }}  </div>
            <div class="cartItemPrice"> Price: {{ this.cart_good_data.price * this.cart_good_data.summGood }} ₽</div>
        </div>
        <div class="yyGood">
            <div class="summGood">Quantity: {{ cart_good_data.summGood }}</div>
            <div class="buttonsMoreLess">
                <ButtonFile class="btnInCartYv" @click="moreGood">
                    More
                </ButtonFile>
                <ButtonFile class="btnInCartYm" @click="lessGood">
                    Less
                </ButtonFile>
            </div>
        </div>
    </div>
</template>

<script>
    import ButtonFile from '../components/button-file.vue'
    export default {
        name: 'CartItem',
        components: {
            ButtonFile
        },
        data() {
            return {
            }
        },
        props: {
            cart_good_data: {
                type: Object,
                default() {
                    return{}
                }
            }
        },
        methods: {
            moreGood() {
                this.$emit('moreGood', this.cart_good_data)
            },
            lessGood() {
                this.$emit('lessGood', this.cart_good_data)
            },
            delGood() {
                this.$emit('delGood', this.cart_good_data)
            }
        }
    }
</script>

<style lang="scss">
    
</style>