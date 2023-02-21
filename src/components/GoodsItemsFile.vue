<template>
    <div class="GoodsItemsFile" @click="catalogItemClick()" @mouseover="nullOpacity" @mouseleave="fullOpacity">
        <img class="GoodsItemsImage" :src=" require('../assets/gameShopContent/' + goods_data.url) " alt="">
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
                    console.log(this.windowW)
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

<style>
    .GoodsItemsFile {
        height: 250px;
        width: 190px;
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        position: relative;
        background-color: white;
        box-shadow: 1px 1px 10px black;
        margin-top: 10px;
        cursor: alias;
        border-radius: 10px;
    }
    .GoodsItemsFile::after {
        content:"";
        display:block;
        position: absolute;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        height: 250px;
        width: 190px;
        background-color:white;
        z-index:10;
        transition-property: all;
        transition: 0.2s;
        border: 2px solid rgba(130, 125, 209);
        border-radius: 10px;

    }
    .GoodsItemsFile:hover::after {
        position: absolute;
        top: -10px;
        bottom: 0;
        right: 0;
        left: -10px;
        height: 280px;
        width: 210px;
        z-index:11;
        box-shadow: 1px 1px 10px orange;
        border-radius: 5px;
    }
    .GoodsItemsImage {
        display: block;
        margin-top: 20px;
        height: 180px;
        width: 150px;
        z-index: 12;
    }
    .GoodsItemsInfo {
        height: 80px;
        width: 190px;
        z-index: 12;
        display: flex;
        flex-direction: column;
        align-items: center;
        position: relative;
    }
    .GoodsItemsName {
        height: 20px;
        width: 190px;
        line-height: 20px;
        font-size: 10px;
    }
    .GoodsItemPrice {
        height: 20px;
        width: 190px;
        color: orange;
        line-height: 20px;
    }
    .GoodsItemPriceSales {
        height: 20px;
        width: 100px;
        color: green;
        position: relative;
        line-height: 20px;
    }
    .sale {
        width: 25px;
        height: 25px;
        background-image: url(../assets/gameShopContent/sale.png);
        background-position: center;
        background-size: contain;
        background-repeat: no-repeat;
        position: absolute;
        top: 50%;
        left: 0;
        transform: rotate(-15deg);
    }
    .showMoreBtn {
        width: 75px;
        height: 25px;
        position: absolute;
        right: 0;
        bottom: 15px;
        border-radius: 30px;
    }
    .blockTimeAgePlayers {
        width: 210px;
        height: 25px;
        display: flex;
        justify-content: center;
        position: absolute;
        bottom: -15px;
    }
    .time {
        width: 65px;
        height: 25px;
        line-height: 25px;
        text-align: right;
        background-image: url(../assets/gameShopContent/time.png);
        background-size: contain;
        background-repeat: no-repeat;
        background-position: left;
    }
    .age {
        width: 35px;
        height: 25px;
        line-height: 25px;
        text-align: center;
    }
    .players {
        width: 50px;
        height: 25px;
        line-height: 25px;
        text-align: right;
        background-image: url(../assets/gameShopContent/players.png);
        background-size: contain;
        background-repeat: no-repeat;
        background-position: left;
    }
    .Hits {
        width: 30px;
        height: 30px;
        line-height: 30px;
        color: green;
        background-color: rgba(255, 166, 0, 0.493);
        box-shadow: 0px 0px 10px orange;
        border-radius: 99px;
        position: absolute;
        right: 0px;
        top: 0;
        z-index: 12;
    }
    .News {
        width: 30px;
        height: 30px;
        line-height: 30px;
        color: red;
        background-color: rgba(255, 166, 0, 0.493);
        box-shadow: 0px 0px 10px orange;
        border-radius: 99px;
        position: absolute;
        right: 0px;
        top: 40px;
        z-index: 12;
    }
    @media (max-width: 320px) {
        .GoodsItemsFile {
            height: 160px;
            width: 150px;
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
            position: relative;
            background-color: white;
            box-shadow: 1px 1px 10px black;
            margin-top: 10px;
            cursor: alias;
            border-radius: 5px;
        }
        .GoodsItemsFile::after {
            display: none;
        }
        .GoodsItemsImage {
            display: block;
            margin-top: 10px;
            height: 100px;
            width: 120px;
            z-index: 12;
        }
        .sale {
            width: 25px;
            height: 25px;
            top: 0;
            left: 0;
            transform: rotate(45deg);
        }
    }
</style>