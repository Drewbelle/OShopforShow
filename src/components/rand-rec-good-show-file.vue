<template>
    <div class="RandomRecomendedGoodShowFile"  @mouseover="showRandCartPictGood" @mouseleave="hideRandCartPictGood">
        <img class="RandomRecomendedGoodShowFileImage" @click="showRandGood(rand_rec_good_data)" :src="require('@/assets/css/gameShopContent/' + rand_rec_good_data.url)" alt="">
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

<style lang="scss">
    
</style>