<template>
    <div class="CartItem">
        <div class="delGood" @click="delGood">X</div>
        <img class="GoodsItemsImage" :src=" require('@/assets/gameShopContent/' + cart_good_data.url) " alt="">
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

<style>
    .CartItem{
        margin: 20px 20px 0px 20px;
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 300px;
        width: 210px;
        border: 3px solid rgba(130, 125, 209);
        background-color: white;
        position: relative;
    }
    .delGood{
        width: 20px;
        height: 20px;
        line-height: 20px;
        text-align: center;
        text-shadow: 1px 1px 3px black;
        color: white;
        font-size: larger;
        cursor: pointer;
        border-radius: 99px;
        position: absolute;
        right: -10px;
        top: -10px;
        background-color: orange;
    }
    .delGood:hover{
        background-color: crimson
    }
    .yyGood{
        height: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .summGood{
        height: 70px;
        width: 120px;
        line-height: 70px;
        font-size: 16px;
        text-align: center;
    }
    .buttonsMoreLess{
        width: 90px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 50px;
        margin-bottom: 10px;
    }
    .btnInCartItem{
        align-items: center;
    }
    .cartItemInfo{
        width: 210px;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .cartItemName{
        height: 35px;
        line-height: 35px;
        width: 210px;
        text-align: center;
        color: orange;
    }
    .cartItemPrice{
        height: 35px;
        line-height: 35px;
        width: 210px;
        text-align: center;
    }


    @media (max-width: 320px) {
    .CartItem{
        margin: 0;
        display: flex;
        flex-direction: row;
        height: 70px;
        width: 100%;
        border: none;
        border-bottom: 1px solid rgb(236, 236, 236);
        background-color: white;
        position: relative;
    }
    .GoodsItemsImage {
        width: 80px;
        height: 60px;
        margin-bottom: 5px;
    }
    .delGood{
        width: 20px;
        height: 20px;
        line-height: 20px;
        text-align: center;
        text-shadow: 1px 1px 3px black;
        color: white;
        font-size: larger;
        cursor: pointer;
        border-radius: 99px;
        position: absolute;
        left: 10px;
        top: 10px;
        z-index: 13;
        background-color: orange;
    }
    .delGood:hover{
        background: none;
    }
    .yyGood{
        height: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .summGood{
        height: 35px;
        width: 70px;
        line-height: 35px;
        font-size: 8px;
        text-align: center;
    }
    .buttonsMoreLess{
        width: 50px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 50px;
        margin-bottom: 10px;
    }
    .btnInCartItem{
        align-items: center;
    }
    .cartItemInfo{
        width: 100px;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .cartItemName{
        height: 35px;
        line-height: 35px;
        width: 210px;
        text-align: center;
        color: orange;
    }
    .cartItemPrice{
        height: 35px;
        line-height: 35px;
        width: 210px;
        text-align: center;
    }
    }
</style>