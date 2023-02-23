<template>
    <div class="GoodsItemsFile" @click="catalogItemClick()" @mouseover="nullOpacity" @mouseleave="fullOpacity">
        <img class="GoodsItemsImage" :src=" require('@/assets/css/gameShopContent/' + goods_data.url) " alt="">
        <div class="GoodsItemsInfo">
            <div class="GoodsItemsName"> {{ goods_data.name }} </div>
            <div class="GoodsItemPriceSales" v-if="goods_data.oldPrice">
                {{ goods_data.price }} ₽
                <div class="sale"></div> 
            </div>
            <div class="GoodsItemPrice" v-else>
                {{ goods_data.price }} ₽
            </div>
            <ButtonFile class="showMoreBtn" v-bind:style="showMoreHide" v-if="windowW > 320">
                Show more
            </ButtonFile>
            <div class="blockTimeAgePlayers" v-if="goods_data.time && goods_data.age && goods_data.players && windowW > 320">
                <div class="time" v-bind:style="showMoreHide">{{ goods_data.time }}min+</div>
                <div class="age" v-bind:style="showMoreHide">{{ goods_data.age }}+</div>
                <div class="players" v-bind:style="showMoreHide">1-{{ goods_data.players }}</div>
            </div>
            <div class="blockTimeAgePlayers" v-else-if="goods_data.age && goods_data.players && windowW > 320">
                <div class="age" v-bind:style="showMoreHide">{{ goods_data.age }}+</div>
                <div class="players" v-bind:style="showMoreHide">1-{{ goods_data.players }}</div>
            </div>
            <div class="blockTimeAgePlayers" v-else-if="goods_data.age && windowW > 320">
                <div class="age" v-bind:style="showMoreHide">{{ goods_data.age }}+</div>
            </div>
        </div>
        <div class="Hits" v-bind:style="showMoreHide" v-if="hits && windowW > 320">HIT</div>
        <div class="News" v-bind:style="showMoreHide" v-if="news && windowW > 320">NEW</div>
    </div>
</template>

<script>
import ButtonFile from '../components/button-file.vue'
    export default {
        name: 'GoodsItemsFile',
        components: {
            ButtonFile,
        },
        props: { //пропсы - входные параметры от родительского компонента
                windowW:{
                    type: Number,
                    default() {
                        return 0
                    }
                },
                goods_data:{
                    type: Object,
                    default() {
                        return {}
                }
            }
        },
        data(){
            return {
                news: false,
                hits: false,
                showMoreHide: {
                    opacity: 0
                }
            }
        },
        computed: {
        },
        methods: {
            catalogItemClick() {
                this.$emit('catalogItemClick', this.goods_data)
            },
            nullOpacity() {
                this.showMoreHide.opacity = 1
            },
            fullOpacity() {
                this.showMoreHide.opacity = 0
            },
            ifNews() {
                if (this.goods_data.goodTag.includes("News")) {
                    this.news = true
                }
            },
            ifHits() {
                if (this.goods_data.goodTag.includes("Hits")) {
                    this.hits = true
                }
            }
        },
        mounted() {
            this.ifNews()
            this.ifHits()
        }
    }
</script>

<style lang="scss">
    
</style>