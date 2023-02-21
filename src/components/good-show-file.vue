<template>
    <TabletopFile />
    <div class="GoodShowFile">
        <div class="fakeTableTop"></div>
        <div class="contentAndRecomended">
            <div class="GoodShowContent">
                <div class="GoodShowImageCont">
                    <img class="GoodShowImage" :src=" require('../assets/gameShopContent/' + findGood.url) " alt="https://google.com">
                </div>
                <div class="GoodShowInfo">
                    <div class="GoodShowName"> {{ findGood.name }} </div>
                    <div class="priceButArtGoodShow">
                        <div class="priceAndArtGoodShow">
                            <div class="GoodShowPriceOld" v-if="findGood.oldPrice">
                                {{ findGood.oldPrice }} ₽
                            </div>
                            <div class="GoodShowPriceSales" v-if="findGood.oldPrice">
                                {{ findGood.price }} ₽
                            </div>
                            <div class="GoodShowPrice" v-else>
                                {{ findGood.price }} ₽
                            </div>
                            <div class="GoodShowArticle">Good article: {{ findGood.id }}</div>
                        </div>
                        <ButtonFile class="addToCartGoodShow" @click="addToCart">
                                Add to cart
                        </ButtonFile>
                    </div>
                    <div class="GoodShowMoreInfo">
                        <div class="propertyMoreInfo">
                            <span class="moreInfoAge">Age</span>
                            <span class="moreInfoPlayers">Players</span>
                            <span class="moreInfoTime">Time</span>
                        </div>
                        <div class="valueMoreInfo">
                            <span class="valueAge">{{ findGood.age }}+ years</span>
                            <span class="valuePlayers" v-if="findGood.players">min {{ findGood.players }} players</span>
                            <span class="valuePlayers" v-else-if="!findGood.players">No limits</span>
                            <span class="valueTime" v-if="findGood.time">from {{ findGood.time }} minutes</span>
                            <span class="valueTime" v-else-if="!findGood.time">No limits</span>
                        </div>
                    </div>
                    <div class="GoodShowTags"><span class="coloredSpan">Good tags</span> <br>{{ showTags }}</div>
                </div>
            </div>
            <div class="recomended" v-if="windowW > 1023">
                <div class="recomendedName">Recomended for You</div>
                <div class="recomendedContent">
                    <RandomRecomendedGoodShowFile
                        v-for="randRecomendedGood in findRecomendedGood"
                        v-bind:key="randRecomendedGood.id"
                        v-bind:rand_rec_good_data="randRecomendedGood"
                        v-on:addRandGoodToCart="addToCartRandGood(randRecomendedGood)"
                    />
                </div>
            </div>
        </div>
        <div class="GoodShowDescription">
            <div class="GoodShowDescriptionName">Description</div>
            <div class="GoodShowDescriptionContent">{{ findGood.info }}</div>
        </div>
        <div class="GoodAdded" v-bind:style="GoodAddedSlide" v-if="windowW > 1023">Good added to cart</div>
    </div>
    <div class="fakeFooter" v-if="windowW <= 768"></div>
    <FooterFile/>
</template>

<script>
    import FooterFile from '../components/footer-file.vue'
    import RandomRecomendedGoodShowFile from '../components/rand-rec-good-show-file.vue'
    import TabletopFile from '../components/tabletop-file.vue'
    import ButtonFile from '../components/button-file.vue'
    import { mapGetters, mapActions} from 'vuex'
    export default {
        name: 'GoodShowFile',
        components: {
            ButtonFile,
            TabletopFile,
            RandomRecomendedGoodShowFile,
            FooterFile,
        },
        props: {
        },
        data(){
            return {
                windowW: '',
                newGood: {},
                IntervalGoodSlide: null,
                GoodAddedSlide: {
                    right: '-200px'
                }
            }
        },
        methods: {
            ...mapActions([
                'ADDTOCART', 'GETGOODSSFROMAPI', 'MAKEGOODSNULL', 'GETGOODSSFROMAPI', 'MAKEGOODSNUL'
            ]),
            calcWindowW() {
            this.windowW = window.innerWidth
            },
            addToCartRandGood(randRecomendedGood) {
                this.ADDTOCART(randRecomendedGood)
                this.GoodAddedSlide.right = '-10px'
                this.slideGood()
            },
            addToCart() {
                this.ADDTOCART(this.findGood)
                this.GoodAddedSlide.right = '-10px'
                this.slideGood()
            },
            slideGood() {
                this.IntervalGoodSlide = setTimeout(this.closeSlideGood, 1500)
            },
            closeSlideGood() {
                this.GoodAddedSlide.right = '-200px'
            }
        },
        computed: {
            ...mapGetters([
                'GOODSFORGOODSHOW', 'GETCART'// получаем массив из store
            ]),
            findGood() {
                let result = {}
                let vm = this
                this.GOODSFORGOODSHOW.forEach(element => {
                    if ( element.id == vm.$route.query.Good) {
                        result = element
                    }
                }); 
                return result
            },
            showTags() {
                var tags = undefined
                tags = this.findGood.goodTag.join(', ')
                return tags
            },
            findRecomendedGood() {
                var recomendedGood = []
                this.GOODSFORGOODSHOW.forEach(element => {
                    if (element.goodTag[0] === this.findGood.goodTag[0]) {
                        recomendedGood.push(element)
                    }
                })
                recomendedGood.splice(recomendedGood.indexOf(this.findGood) ,1)
                recomendedGood.sort(()=>Math.random()-0.5)
                return recomendedGood
            }
        },
        mounted() {
            this.GETGOODSSFROMAPI(), this.calcWindowW()
        },
        unmounted() {
            this.MAKEGOODSNULL()
        }
        // СНАЧАЛА ОТРАБАТЫВАЕТ COMPUTED,ПОТОМ ОТРАБАТЫВАЕТ MOUNTED, ИЗЗА ЭТОГО ЕСЛИ ЕСТЬ COMPUTED СВЙОСТВО, В КОТОРОМ ЕСТЬ ЗАВИСИМСОСТЬ ОТ MOUNTED , ТО ОНО БУДЕТ СРАБАТЫВАТЬ СТОЛЬКО РАЗ ПОКА MOUNTED НЕ ОТРАБОТАЕТ ВСЕ ФУНКЦИИ
    }
</script>

<style>
    .GoodShowFile {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100vw;
        margin-bottom: 20px;
        cursor: default;
        position: relative;
    }
    .fakeTableTop {
        width: 100vw;
        height: 80px;
        background-color: black;
    }
    .contentAndRecomended {
        display: flex;
    }
    .GoodShowContent {
        height: 450px;
        width: 700px;
        display: flex;
        align-items: center;
        background-color: white;
        box-shadow: 1px 1px 10px black;
        margin-top: 10px;
        margin-right: 5px;
        cursor: default;
    }
    .GoodShowImageCont {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 390px;
        width: 340px;
    }
    .GoodShowImage {
        height: 180px;
        width: 150px;
    }
    .GoodShowInfo {
        height: 390px;
        width: 360px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
    }
    .GoodShowName {
        height: 70px;
        width: 300px;
        line-height: 35px;
        font-size: 24px;
        text-align: center;
    }
    .priceButArtGoodShow {
        height: 150px;
        width: 300px;
        border: 2px solid orange;
        border-style: dashed;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background-color: rgb(236, 236, 236);
        box-shadow: 1px 1px 10px black;
    }
    .priceAndArtGoodShow {
        height: 70px;
        width: 280px;
        display: flex;
        position: relative;
    }
    .GoodShowPrice {
        height: 65px;
        width: 190px;
        line-height: 65px;
        font-size: 24px;
        text-align: center;
        color: orange;
    }
    .GoodShowPriceSales {
        height: 65px;
        width: 190px;
        line-height: 65px;
        font-size: 24px;
        text-align: center;
        color: green;
    }
    .GoodShowPriceOld {
        height: 25px;
        width: 190px;
        line-height: 25px;
        font-size: 12px;
        text-align: center;
        color: rgb(255, 121, 121);
        text-decoration: line-through;
        position: absolute;
        top: 0px;
        left: -35px;
    }
    .GoodShowArticle {
        height: 40px;
        width: 90px;
        line-height: 40px;
        font-size: 10px;
        text-align: center;
        flex-wrap: wrap;
    }
    .addToCartGoodShow {
        height: 35px;
        width: 250px;
        line-height: 35px;
        font-size: 24px;
        text-align: center;
        color: orange;
        cursor: pointer;
        transition-property: all;
        transition: 0.15s;
        background-color: rgba(131, 125, 209, 0.5);
        box-shadow: 3px 3px 8px black;
        border: 1px solid black;
    }
    .addToCartGoodShow:active {
        color: rgba(130, 125, 209);
        background-color: orange;
        box-shadow: 0px 0px 5px black;
    }
    .GoodShowMoreInfo {
        width: 300px;
        height: 120px;
        display: flex;
        border-left: 2px solid orange;
        border-right: 2px solid orange;
        border-right-style: double;
        border-left-style: double;
        box-shadow: 1px 1px 10px black;
    }
    .propertyMoreInfo {
        display: flex;
        flex-direction: column;
        width: 50%;
    }
    .valueMoreInfo {
        display: flex;
        flex-direction: column;
        width: 50%;
        align-items: flex-end;
    }
    .moreInfoAge, .moreInfoPlayers, .moreInfoTime, .valueAge, .valuePlayers, .valueTime {
        width: 150px;
        height: 30px;
        line-height: 30px;
        font-size: 10px;
        justify-content: center;
    }
    .moreInfoAge, .moreInfoPlayers, .moreInfoTime {
        padding-left: 10px;
        color: orange;
    }
    .valueAge, .valuePlayers, .valueTime {
        text-align: end;
        padding-right: 10px;
    }
    .moreInfoPlayers, .valuePlayers {
        background-color: rgb(236, 236, 236);
    }
    .GoodShowTags {
        text-align: center;
        font-size: 10px;
        width: 300px;
        height: 150px;
        border: 2px solid orange;
        border-style: dashed;
        background-color: rgb(236, 236, 236);
        box-shadow: 1px 1px 10px black;
    }
    .coloredSpan {
        color: rgba(130, 125, 209);
        font-size: 15px;
    }
    .recomended {
        width: 290px;
        height: 450px;
        display: flex;
        flex-direction: column;
        align-items: center;
        background-color: white;
        box-shadow: 1px 1px 10px black;
        margin-top: 10px;
        margin-left: 5px;
        cursor: default;
    }
    .recomendedName {
        margin-top: 10px;
        height: 70px;
        width: 230px;
        line-height: 70px;
        font-size: 24px;
        text-align: center;
    }
    .recomendedContent {
        display: flex;
        flex-direction: column;
        align-items: center;
        overflow: hidden;
        margin-top: 10px;
        margin-bottom: 10px;
        height: 350px;
        width: 280px;
        line-height: 35px;
        font-size: 24px;
        text-align: center;
        border: 2px solid orange;
        border-style: dashed;
        background-color: rgb(236, 236, 236);
        box-shadow: 1px 1px 10px black;
    }
    .GoodAdded {
        position: absolute;
        bottom: 50%;
        width: 200px;
        height: 75px;
        font-size: 18px;
        color: rgba(130, 125, 209);
        text-align: center;
        line-height: 75px;
        background-color: rgba(125, 209, 167, 0.747);
        border: 1px solid black;
        transition-property: all;
        transition: 0.3s;
        border-top-left-radius: 99px;
        border-bottom-left-radius: 99px;
        box-shadow: 3px 3px 8px black;
    }
    .GoodShowDescription {
        width: 1000px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background-color: white;
        box-shadow: 1px 1px 10px black;
        margin-top: 10px;
        cursor: default;
    }
    .GoodShowDescriptionName{
        white-space: pre-wrap;
        font-size: 32px;
        padding: 20px;
        margin: 20px;
        text-align: left;
        width: 900px;
        margin-top: 10px;
        cursor: default;
        border-bottom: 2px solid orange;
        border-bottom-style: dashed;
        color: orange;
    }
    .GoodShowDescriptionContent {
        white-space: pre-wrap;
        font-size: 16px;
        padding: 20px;
        margin: 20px;
        text-align: left;
        width: 900px;
        background-color: rgb(236, 236, 236);
        box-shadow: 1px 1px 10px black;
        margin-top: 10px;
        cursor: default;
        border: 2px solid orange;
        border-style: dashed;
    }

    @media (max-width: 1023px) {
        .contentAndRecomended {
            width: 700px;
            margin-top: 30px;
        }
        .GoodShowContent {
            width: 100%;
            min-height: 640px;
            margin-top: 10px;
            margin-right: 0;
        }
        .GoodShowInfo {
            height: 390px;
            width: 50%;
            flex-direction: column;
            align-items: center;
        }
        .GoodShowImageCont {
            width: 50%;
        }
        .GoodShowName {
            height: 70px;
            width: 90%;
        }
        .priceButArtGoodShow {
            height: 150px;
            width: 90%;
        }
        .priceAndArtGoodShow {
            height: 70px;
            width: 90%;
        }
        .GoodShowDescription {
            width: 700px;
            margin-bottom: 30px;
        }
        .GoodShowDescriptionName{
            width: 90%;
        }
        .GoodShowDescriptionContent {
            width: 90%;
        }
    }   


    @media (max-width: 320px) {
        .fakeTableTop {
            height: 60px;
        }
        .contentAndRecomended {
            width: 100%;
            margin-top: 0;
        }
        .GoodShowFile {
            margin: 0;
        }
        .GoodShowContent {
            width: 100%;
            height: 100vh;
            margin-top: 10px;
            margin-right: 0;
            flex-direction: column;
        }
        .GoodShowInfo {
            width: 100%;
            flex-direction: column;
            align-items: center;
        }
        .GoodShowImageCont {
            margin-top: 20px;
            width: 300px;
            height: 300px;
        }
        .GoodShowImage {
            height: 250px;
            width: 300px;
        }
        .GoodShowName {
            height: 45px;
            width: 90%;
        }
        .priceButArtGoodShow {
            height: 150px;
            width: 100%;
            border-style: none;
            box-shadow: none;
        }
        .GoodShowTags {
            width: 100%;
            border-style: none;
            box-shadow: none;
            background-color: rgb(236, 236, 236);
        }
        .priceAndArtGoodShow {
            height: 70px;
            width: 90%;
        }
        .GoodShowDescription {
            width: 100%;
            margin-bottom: 0px;
            box-shadow: none;
            background-color: white;
        }
        .GoodShowDescriptionName{
            width: 90%;
        }
        .GoodShowDescriptionContent {
            width: 90%;
        }
        .GoodShowMoreInfo {
            width: 100%;
            height: 120px;
            display: flex;
        }
        .propertyMoreInfo {
            display: flex;
            flex-direction: column;
            width: 50%;
            margin-left: 15px;
        }
        .valueMoreInfo {
            display: flex;
            flex-direction: column;
            width: 50%;
            align-items: flex-end;
            margin-right: 15px;
        }
        .moreInfoAge, .moreInfoPlayers, .moreInfoTime, .valueAge, .valuePlayers, .valueTime {
            height: 30px;
            line-height: 30px;
            font-size: 10px;
        }
    }
</style>