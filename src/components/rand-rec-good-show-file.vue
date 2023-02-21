<template>
    <div class="RandomRecomendedGoodShowFile"  @mouseover="showRandCartPictGood" @mouseleave="hideRandCartPictGood">
        <img class="RandomRecomendedGoodShowFileImage" @click="showRandGood(rand_rec_good_data)" :src="require('../assets/gameShopContent/' + rand_rec_good_data.url)" alt="">
        <div class="RandomRecomendedGoodShowFileInfo">
            <div class="RandomRecomendedGoodShowFileName" @click="showRandGood(rand_rec_good_data)">{{ rand_rec_good_data.name }}</div>
            <div class="RandomRecomendedGoodShowFilePrice">{{ rand_rec_good_data.price }} ₽</div>
        </div>
        <div class="RandomRecomendedGoodShowFileAddToCart" v-bind:style="showCart" @click="addRandGoodToCart()"></div>
    </div>
</template>

<script>
    export default {
    name: 'RandomRecomendedGoodShowFile',
    components: {
    },
    props: { //пропсы - входные параметры от родительского компонента
            rand_rec_good_data:{
                type: Object,
                default() {
                    return {}
            }
        }
    },
    data(){
        return {
            showCart: {
                visibility: 'hidden'
            }
        }
    },
    methods: {
        showRandGood(rand_rec_good_data) {
            this.$router.push({name: 'goodpage', query: {'Good': rand_rec_good_data.id}})
        },
        showRandCartPictGood() {
            this.showCart.visibility = 'visible'
        },
        hideRandCartPictGood() {
            this.showCart.visibility = 'hidden'
        },
        addRandGoodToCart() {
            this.$emit('addRandGoodToCart', this.rand_rec_good_data)
        }
    }
}
</script>

<style>
    .RandomRecomendedGoodShowFile{
        margin: 5px 0 4px 0;
        height: 60px;
        width: 260px;
        display: flex;
        background-color: white;
        border-top: 2px solid orange;
        border-left: 2px solid orange;
        cursor: pointer;
        border-bottom-right-radius: 99px;
        transition-property: all;
        transition: 0.5s;
        position: relative;
    }
    .RandomRecomendedGoodShowFile:hover {
        border-bottom-right-radius: 0px;
    }
    .RandomRecomendedGoodShowFileImage{
        margin-top: 5px;
        margin-left: 10px;
        height: 50px;
        width: 50px;
    }
    .RandomRecomendedGoodShowFileImage:hover{
        opacity: 0.5
    }
    .RandomRecomendedGoodShowFileInfo{
        height: 60px;
        width: 1900px;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .RandomRecomendedGoodShowFileName{
        height: 30px;
        width: 190px;
        line-height: 35px;
    }
    .RandomRecomendedGoodShowFileName:hover {
        color: orange;
    }
    .RandomRecomendedGoodShowFilePrice{
        height: 30px;
        width: 190px;
        line-height: 35px;
    }
    .RandomRecomendedGoodShowFileAddToCart{
        width: 20px;
        height: 20px;
        background-image: url(../assets/gameShopContent/cart1.png);
        position: absolute;
        bottom: 5px;
        right: 5px;
        background-repeat: no-repeat;
        background-size: contain;
        z-index: 2;
    }
    .RandomRecomendedGoodShowFileAddToCart::before{
        content: '';
        display: block;
        position: absolute;
        width: 20px;
        height: 20px;
        background-color: rgba(130, 125, 209);
        opacity: 0.2;
        border-radius: 99px;
        z-index: 1;
    }
    .RandomRecomendedGoodShowFileAddToCart:hover::before{
        background-color: orange;
    }
</style>