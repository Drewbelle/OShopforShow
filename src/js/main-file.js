    import ButtonFile from '../components/button-file.vue'
    import TabletopFile from '../components/tabletop-file.vue'
    import BannersFile from '../components/banners-file.vue'
    import { mapGetters, mapActions } from 'vuex';
    export default {
        name: 'MainFile',
        components: {
            ButtonFile,
            BannersFile,
            TabletopFile,
        },
        props: {},
        data() {
            return {
                minPrice: null,
                maxPrice: null,
                maxPlayers: null,
                minAge: null,
                minTime: null,
                checkBoxTopHeight: {
                    top: null
                },
                renameCategories: '',
                couruselAuto: null,
                couruselNums: 0,
                leftBorder: 1,
                rightBorder: 0,
                couruselContentDynamicStyle: {
                    height: '340px',
                    marginLeft: '0px',
                    display: 'flex',
                    transition: '2s',
                    zIndex: '0',
                }
            }
        },
        computed: {
            ...mapGetters([
                'GOODSFORGOODSHOW', 'GETBANNERS', 'GETGOODS', 'GETSEARCHGOODS'// получаем массив banners из store
            ]),
        },
        methods: {
            setRangeSlider() {
                if (this.minPrice > this.maxPrice)  {
                    let tmp = this.maxPrice
                    this.maxPrice = this.minPrice
                    this.minPrice = tmp
                    console.log("min" + this.minPrice)
                    console.log("max" + this.maxPrice)
                }
            },
            calcSliders() {
                var sortArr = []
                this.GOODSFORGOODSHOW.forEach(element => {
                    if (element.players != undefined) {
                        sortArr.push(element.players)
                    }
                })
                sortArr.sort((a, b) => b - a)
                this.maxPlayers = sortArr[0]
                sortArr = []
                this.GOODSFORGOODSHOW.forEach(element => {
                    if (element.age != undefined) {
                        sortArr.push(element.age)
                    }
                })
                sortArr.sort((a, b) => b - a)
                this.minAge = sortArr[0]
                sortArr = []
                this.GOODSFORGOODSHOW.forEach(element => {
                    if (element.time != undefined) {
                        sortArr.push(element.time)
                    }
                })
                sortArr.sort((a, b) => b - a)
                this.minTime = sortArr[0]
                sortArr = []
                this.GOODSFORGOODSHOW.forEach(element => {
                    if (element.price != undefined) {
                        sortArr.push(element.price)
                    }
                })
                sortArr.sort((a, b) => a - b)
                this.minPrice = sortArr[0]
                sortArr.sort((a, b) => b - a)
                this.maxPrice = sortArr[0]
            },
            doTopForCheckBox() {
                this.checkBoxTopHeight.top = document.querySelector('.secondBlockSearchContent').getBoundingClientRect().top + "px"
            },
            ...mapActions([
                'GETBANNERSFROMAPI', 'GETGOODSSFROMAPI', 'MAKEGOODSNULL', 'DESTROYSEARCHVALUE', 'MAKESEARCHGOODSNULL', 'GETSEARCHGOODSTOVUEX', 'SEARCHBYCATEGORIES', 'GETGOODSFORGOODSHOW'
            ]),
            couruselLeft() {
                this.couruselNums ++ 
                if (this.couruselNums > 0) {
                    this.couruselNums = 0
                    this.leftBorder =  1
                    this.rightBorder =  0
                    this.couruselContentDynamicStyle.marginLeft = (640 * this.couruselNums) + 'px'
                }
                else this.couruselContentDynamicStyle.marginLeft = (640 * this.couruselNums) + 'px'
            },
            couruselRight() {
                this.couruselNums --
                if (this.couruselNums < -(this.GETBANNERS.length - 3)) {
                    this.couruselNums = -(this.GETBANNERS.length - 3)
                    this.leftBorder =  0
                    this.rightBorder =  1
                    this.couruselContentDynamicStyle.marginLeft = (640 * this.couruselNums) + 'px'
                }
                else this.couruselContentDynamicStyle.marginLeft = (640 * this.couruselNums) + 'px'
            },
            couruselAutoFunc() {
                if (this.leftBorder === 1 && this.rightBorder === 0) {
                    this.couruselRight()
                }
                else if (this.leftBorder === 0 && this.rightBorder === 1) {
                    this.couruselLeft()
                }
            },
            startCouruselAuto() {
                this.couruselAuto = setInterval(this.couruselAutoFunc, 5000)
            },
            stopCouruselAuto() {
                clearInterval(this.couruselAuto)
            },
            showMoreCatalog() {
                document.querySelector('.catalogShowMore').style.visibility = 'visible'
            },
            closeMoreCatalog() {
                document.querySelector('.catalogShowMore').style.visibility = 'hidden'
            },
            showMoreTableGames() {
                document.querySelector('.tableGamesShowMore').style.visibility = 'visible'
            },
            closeMoreTableGames() {
                document.querySelector('.tableGamesShowMore').style.visibility = 'hidden'
            },
            showMoreWarhammer() {
                document.querySelector('.warhammerShowMore').style.visibility = 'visible'
            },
            closeMoreWarhammer() {
                document.querySelector('.warhammerShowMore').style.visibility = 'hidden'
            },
            showMoreManchikin() {
                document.querySelector('.manchikinShowMore').style.visibility = 'visible'
            },
            closeMoreManchikin() {
                document.querySelector('.manchikinShowMore').style.visibility = 'hidden'
            },
            showMorePaints() {
                document.querySelector('.paintsShowMore').style.visibility = 'visible'
            },
            closeMorePaints() {
                document.querySelector('.paintsShowMore').style.visibility = 'hidden'
            },
            bannerClick(Banner) {
                this.$router.push({name: 'goodpage', query: {'Good': Banner.bannerart}})
            },
            findForLinks($event) {
                this.DESTROYSEARCHVALUE()
                this.MAKESEARCHGOODSNULL()
                this.GETGOODS.forEach(el => {
                    if (el.goodTag.includes($event.target.innerText)) {
                    this.GETSEARCHGOODSTOVUEX(el)
                    //поиск в ds.json нужных товаров по категориям
                    }
                })
                this.renameCategories = $event.target.innerText
                this.SEARCHBYCATEGORIES(this.renameCategories)
                this.$router.push('Catalog')
            },
        },
        watch: {
            GETGOODS() {
                this.GETGOODSFORGOODSHOW(this.GETGOODS)
                this.calcSliders()
            }
        },
        mounted() {
            this.GETGOODSSFROMAPI(), this.GETBANNERSFROMAPI(), this.startCouruselAuto(), this.doTopForCheckBox()
            //получаем список  из db.json и заносим в массив chars в store
        },
        unmounted() {
            this.MAKEGOODSNULL()
        }
    }





    