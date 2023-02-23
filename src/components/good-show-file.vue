<template>
    <TabletopFile />
    <div class="GoodShowFile">
        <div class="fakeTableTop"></div>
        <div class="contentAndRecomended">
            <div class="GoodShowContent">
                <div class="GoodShowImageCont">
                    <img class="GoodShowImage" :src=" require('@/assets/css/gameShopContent/' + findGood.url) " alt="https://google.com">
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
    import calcWindowMixin from './mixinsForComponents/calcWindow-mixin'
    import { mapGetters, mapActions} from 'vuex'
    export default {
        name: 'GoodShowFile',
        mixins: [calcWindowMixin],
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
            this.GETGOODSSFROMAPI()
        },
        unmounted() {
            this.MAKEGOODSNULL()
        }
        // СНАЧАЛА ОТРАБАТЫВАЕТ COMPUTED,ПОТОМ ОТРАБАТЫВАЕТ MOUNTED, ИЗЗА ЭТОГО ЕСЛИ ЕСТЬ COMPUTED СВЙОСТВО, В КОТОРОМ ЕСТЬ ЗАВИСИМСОСТЬ ОТ MOUNTED , ТО ОНО БУДЕТ СРАБАТЫВАТЬ СТОЛЬКО РАЗ ПОКА MOUNTED НЕ ОТРАБОТАЕТ ВСЕ ФУНКЦИИ
    }
</script>

<style lang="scss">
    
</style>