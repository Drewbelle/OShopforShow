    import RandomRecomendedGoodShowFile from '../components/rand-rec-good-show-file.vue'
    import TabletopFile from '../components/tabletop-file.vue'
    import ButtonFile from '../components/button-file.vue'
    import { mapGetters, mapActions} from 'vuex'
    export default {
        name: 'GoodShowFile',
        components: {
            ButtonFile,
            TabletopFile,
            RandomRecomendedGoodShowFile
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
                'ADDTOCART', 'GETGOODSSFROMAPI', 'MAKEGOODSNULL'
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
                'GOODSFORGOODSHOW', 'GETGOODS', 'GETCART'// получаем массив из store
            ]),
            findGood() {
                let result = {}
                let vm = this
                this.GOODSFORGOODSHOW.forEach(element => {
                    if ( element.art == vm.$route.query.Good) {
                        result = element
                    }
                    else if ( element.bannerart == vm.$route.query.Good ) {
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
        },
        unmounted() {
        }
        // СНАЧАЛА ОТРАБАТЫВАЕТ COMPUTED,ПОТОМ ОТРАБАТЫВАЕТ MOUNTED, ИЗЗА ЭТОГО ЕСЛИ ЕСТЬ COMPUTED СВЙОСТВО, В КОТОРОМ ЕСТЬ ЗАВИСИМСОСТЬ ОТ MOUNTED , ТО ОНО БУДЕТ СРАБАТЫВАТЬ СТОЛЬКО РАЗ ПОКА MOUNTED НЕ ОТРАБОТАЕТ ВСЕ ФУНКЦИИ
    }