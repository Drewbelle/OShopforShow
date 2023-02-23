<template>
    <TabletopFile 
    />
    <div class="MainFile">
        <div class="newAd" v-bind:style="visibleAd" @click="goToAdGood()">
            <div class="closeAd" @click.stop="closeAd()">X</div>
        </div> 
        <div class="fakeTableTop"></div>
        <div class="mainContent">
            <div class="courusel"
            @mouseover="stopCouruselAuto"
            @mouseleave="startCouruselAuto">
                <div class="couruselLeft" 
                @click="couruselLeft"
                />
                <div class="couruselContent" v-bind:style="couruselContentDynamicStyle">
                    <BannersFile
                        v-for="Banner in GETBANNERS"
                        v-bind:key="Banner.bannerid"
                        v-bind:banner_data="Banner"
                        v-on:bannerClick="bannerClick(Banner)"
                    />
                </div>
                <div class="couruselRight" @click="couruselRight"/>
            </div>
            <div class="secondBlockSearchContent">
                <div class="catalogBlock">

                    <div class="catalog"
                    @mouseenter  ="showMoreFuncOpen($event)"
                    @mouseleave ="showMoreFuncClose($event)">
                        <div class="marginCatalog">
                            <RouterLink to="/Catalog" class="linkCatalog hoverlink">Catalog</RouterLink> 
                            <ul class="linksInCatalog">
                                <li class="linkNews hoverlink"  @click="findForLinks($event)">News</li>
                                <li class="linkHits hoverlink"  @click="findForLinks($event)">Hits</li>
                                <li class="linkSales hoverlink"  @click="findForLinks($event)">%Sales%</li>
                            </ul>
                        </div>
                    </div>

                    <div class="tableGames"
                    @mouseenter  ="showMoreFuncOpen($event)"
                    @mouseleave ="showMoreFuncClose($event)">
                        <div class="marginTableGames">
                            <div class="linkTableGames hoverlink" @click="findForLinks($event)">Table Games</div>
                            <ul class="linksInTableGames">
                                <li class="linkPartyTableGames hoverlink" @click="findForLinks($event)">Party</li>
                                <li class="linkCardsTablesGames hoverlink" @click="findForLinks($event)">Card</li>
                                <li class="linkClassicTablesGames hoverlink" @click="findForLinks($event)">Classic</li>
                                <li class="linkCoopTableGames hoverlink" @click="findForLinks($event)">Cooperative</li>
                                <li class="linkRolePlayTableGames hoverlink" @click="findForLinks($event)">Role Play</li>
                                <li class="linkDetectiveTableGames hoverlink" @click="findForLinks($event)">Detective</li>
                            </ul>
                        </div>
                    </div>

                    <div class="warhammer"
                    @mouseenter  ="showMoreFuncOpen($event)"
                    @mouseleave ="showMoreFuncClose($event)">
                        <div class="marginWarhammer">
                            <div class="linkWarhammer hoverlink" @click="findForLinks($event)">Warhammer</div>
                        </div>
                    </div>

                    <div class="manchikin"
                    @mouseenter  ="showMoreFuncOpen($event)"
                    @mouseleave ="showMoreFuncClose($event)">
                        <div class="marginManchikin">
                            <div class="linkManchikin hoverlink" @click="findForLinks($event)">Manchikin</div>
                        </div>
                    </div>

                    <div class="paints"
                    @mouseenter  ="showMoreFuncOpen($event)"
                    @mouseleave ="showMoreFuncClose($event)">
                        <div class="marginPaints">
                            <div class="linkPaints hoverlink" @click="findForLinks($event)">Paints</div>
                            <ul class="linksInPaints">
                                <li class="linkLayer hoverlink" @click="findForLinks($event)">Layer</li>
                                <li class="linkContrast hoverlink" @click="findForLinks($event)">Contrast</li>
                                <li class="linkBase hoverlink" @click="findForLinks($event)">Base</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div class="catalogShowMore"
                v-if="windowW > 1023"
                @mouseenter  ="showMoreFuncOpen($event)"
                @mouseleave ="showMoreFuncClose($event)">
                    <div class="catalogShowMoreMainLink">
                        <div class="catalogShowMoreNewsLink">News
                            <ul class="newsCatalog">
                                <li class="linkCatalogNews" @click="searchByNonStandardCategories($event)">New Table Games</li>
                                <li class="linkCatalogNews" @click="searchByNonStandardCategories($event)">New Warhammer</li>
                                <li class="linkCatalogNews" @click="searchByNonStandardCategories($event)">New Manchikin</li>
                                <li class="linkCatalogNews" @click="searchByNonStandardCategories($event)">New Paints</li>
                            </ul>
                        </div>
                        <div class="catalogShowMoreHitsLink">Hits
                            <ul class="hitsCatalog">
                                <li class="linkCatalogHits" @click="searchByNonStandardCategories($event)">Hits Table Games</li>
                                <li class="linkCatalogHits" @click="searchByNonStandardCategories($event)">Hits Warhammer</li>
                                <li class="linkCatalogHits" @click="searchByNonStandardCategories($event)">Hits Manchikin</li>
                                <li class="linkCatalogHits" @click="searchByNonStandardCategories($event)">Hits Paints</li>
                            </ul>
                        </div> 
                    </div>
                    <div class="catalogShowMoreBottomPicture"></div>
                </div>

                <div class="tableGamesShowMore"
                v-if="windowW > 1023"
                @mouseenter  ="showMoreFuncOpen($event)"
                @mouseleave ="showMoreFuncClose($event)">
                    <div class="tableGamesShowMoreMainLink">
                        <div class="tableGamesShowMoreGenresLink">Genres
                            <ul class="genresTG">
                                <li class="linkTG" @click="findForLinks($event)">Party</li>
                                <li class="linkTG" @click="findForLinks($event)">Card</li>
                                <li class="linkTG" @click="findForLinks($event)">Classic</li>
                                <li class="linkTG" @click="findForLinks($event)">Cooperative</li>
                                <li class="linkTG" @click="findForLinks($event)">Role Play</li>
                                <li class="linkTG" @click="findForLinks($event)">Detective</li>
                            </ul>
                        </div>
                        <div class="tableGamesShowMoreDifferentCompaniesLink">Companies
                            <ul class="companiesTG">
                                <li class="linkCompTG" @click="searchByNonStandardCategories($event)">Small</li>
                                <li class="linkCompTG" @click="searchByNonStandardCategories($event)">Medium</li>
                                <li class="linkCompTG" @click="searchByNonStandardCategories($event)">Large</li>
                            </ul>
                        </div> 
                    </div>
                    <div class="tableGamesShowMoreBottomPicture"></div>
                </div>

                <div class="warhammerShowMore"
                v-if="windowW > 1023"
                @mouseenter  ="showMoreFuncOpen($event)"
                @mouseleave ="showMoreFuncClose($event)">
                    <div class="warhammerShowMoreMainLink">Warhammer</div>
                    <div class="warhammerShowMoreBottomPicture"></div>
                </div>

                <div class="manchikinShowMore"
                v-if="windowW > 1023"
                @mouseenter  ="showMoreFuncOpen($event)"
                @mouseleave ="showMoreFuncClose($event)">
                    <div class="manchikinShowMoreMainLink">Manchikin</div>
                    <div class="manchikinShowMoreBottomPicture"></div>
                </div>

                <div class="paintsShowMore"
                v-if="windowW > 1023"
                @mouseenter  ="showMoreFuncOpen($event)"
                @mouseleave ="showMoreFuncClose($event)">
                    <div class="paintsShowMoreMainLink">Paints
                        <ul class="linksPnts">
                            <li class="linkSMPnt" @click="findForLinks($event)">Layer</li>
                            <li class="linkSMPnt" @click="findForLinks($event)">Contrast</li>
                            <li class="linkSMPnt" @click="findForLinks($event)">Base</li>
                        </ul>
                    </div>
                    <div class="paintsShowMoreBottomPicture"></div>
                </div>
                <div class="parametrsBlock" v-if="windowW > 1023">
                    <div class="searchBySliders">
                        <div class="sliderPrice" @mouseover="showValue.opacity = 1" @mouseleave="showValue.opacity = 0">
                            <input type="range" id="input-left" min="0" max="21600" step="2400" v-model="minPrice">
                            <input type="range" id="input-right" min="0" max="21600" step="2400" v-model="maxPrice">
                            <div class="slider">
                                <div class="track"></div>
                                <div class="range" v-bind:style="rangeLR"></div>
                                <div class="thumb" v-bind:style="rangeLT">
                                    <div class="leftThumbValue" v-bind:style="showValue">{{ this.minPrice }}</div>
                                </div>
                                <div class="thumb" v-bind:style="rangeRT">
                                    <div class="rightThumbValue" v-bind:style="showValue">{{ this.maxPrice }}</div>
                                </div>
                            </div>
                        </div>
                        <div class="otherSliders">
                            <div class="sliderPlayers" @mouseover="showValuePlayers.opacity = 1" @mouseleave="showValuePlayers.opacity = 0">
                                <input type="range" min="2" max="8" step="1" v-model="maxPlayers">
                                <div class="track"></div>
                                <div class="range" v-bind:style="rangePTrack"></div>
                                <div class="thumb" v-bind:style="rangeP">
                                    <div class="rightThumbValue" v-bind:style="showValuePlayers">{{ this.maxPlayers }}</div>
                                </div>
                            </div>
                            <div class="sliderAge" @mouseover="showValueAge.opacity = 1" @mouseleave="showValueAge.opacity = 0">                        
                                <input type="range" min="10" max="18" step="1" v-model="minAge">
                                <div class="track"></div>
                                <div class="range" v-bind:style="rangeATrack"></div>
                                <div class="thumb" v-bind:style="rangeA">
                                    <div class="rightThumbValue" v-bind:style="showValueAge">{{ this.minAge }}</div>
                                </div>
                            </div>
                            <div class="sliderTime" @mouseover="showValueTime.opacity = 1" @mouseleave="showValueTime.opacity = 0">
                                <input type="range" min="20" max="180" step="20" v-model="minTime">
                                <div class="track"></div>
                                <div class="range" v-bind:style="rangeTTrack"></div>
                                <div class="thumb" v-bind:style="rangeT">
                                    <div class="rightThumbValue" v-bind:style="showValueTime">{{ this.minTime }}</div>
                                </div>
                            </div>
                        </div> 
                    </div> 
                    <div class="searchByCheckBoxes">
                        <div class="hits checkbox">
                            <input type="checkbox" class="cb" name="Hits" id="Hits">
                            <div class="newcb"></div>  
                            <label for="Hits" @click="addToSearchByCBAndS($event)">Hits</label>
                        </div> 
                        <div class="news checkbox">
                            <input type="checkbox" class="cb" name="News" id="News">
                            <div class="newcb"></div>  
                            <label for="News" @click="addToSearchByCBAndS($event)">News</label>
                        </div>
                        <div class="sales checkbox">
                            <input type="checkbox" class="cb" name="%Sales%" id="%Sales%">
                            <div class="newcb"></div>  
                            <label for="%Sales%" @click="addToSearchByCBAndS($event)">%Sales%</label>
                        </div>
                        <div class="party checkbox">
                            <input type="checkbox" class="cb" name="Party Games" id="Party Games">
                            <div class="newcb"></div>  
                            <label for="Party Games" @click="addToSearchByCBAndS($event)">Party Games</label>
                        </div>
                        <div class="card checkbox">
                            <input type="checkbox" class="cb" name="Card Games" id="Card Games">
                            <div class="newcb"></div>  
                            <label for="Card Games" @click="addToSearchByCBAndS($event)">Card Games</label>
                        </div>
                        <div class="classic checkbox">
                            <input type="checkbox" class="cb" name="Classic Games" id="Classic Games">
                            <div class="newcb"></div>  
                            <label for="Classic Games" @click="addToSearchByCBAndS($event)">Classic Games</label>
                        </div>
                        <div class="cooperatice checkbox">
                            <input type="checkbox" class="cb" name="Cooperative Games" id="Cooperative Games">
                            <div class="newcb"></div>  
                            <label for="Cooperative Games" @click="addToSearchByCBAndS($event)">Cooperative Games</label>
                        </div>
                        <div class="roleplay checkbox">
                            <input type="checkbox" class="cb" name="Role Play Games" id="Role Play Games">
                            <div class="newcb"></div>  
                            <label for="Role Play Games" @click="addToSearchByCBAndS($event)">Role Play Games</label>
                        </div>
                        <div class="detective checkbox">
                            <input type="checkbox" class="cb" name="Detective" id="Detective">
                            <div class="newcb"></div>  
                            <label for="Detective" @click="addToSearchByCBAndS($event)">Detective</label>
                        </div>
                        <div class="wh checkbox">
                            <input type="checkbox" class="cb" name="Warhammer" id="Warhammer">
                            <div class="newcb"></div>  
                            <label for="Warhammer" @click="addToSearchByCBAndS($event)">Warhammer</label>
                        </div>
                        <div class="manchukin checkbox">
                            <input type="checkbox" class="cb" name="Manchikin" id="Manchikin">
                            <div class="newcb"></div>  
                            <label for="Manchikin" @click="addToSearchByCBAndS($event)">Manchikin</label>
                        </div>
                        <div class="base checkbox">
                            <input type="checkbox" class="cb" name="Base" id="Base">
                            <div class="newcb"></div>  
                            <label for="Base" @click="addToSearchByCBAndS($event)">Base</label>
                        </div>
                        <div class="contrast checkbox">
                            <input type="checkbox" class="cb" name="Contrast" id="Contrast">
                            <div class="newcb"></div>  
                            <label for="Contrast" @click="addToSearchByCBAndS($event)">Contrast</label>
                        </div>
                        <div class="layer checkbox">
                            <input type="checkbox" class="cb" name="Layer" id="Layer">
                            <div class="newcb"></div>  
                            <label for="Layer" @click="addToSearchByCBAndS($event)">Layer</label>
                        </div>
                        <div class="searchByCBAndSShowResult">
                            Goods search : {{ searchByCBAndSResult.length }}
                            <span class="searchByCBAndSShowGoods" @click="searchByCBAndSShowGoods(searchByCBAndSResult)">Show goods</span>
                        </div> 
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="fakeFooter" v-if="windowW <= 768"></div>
    <FooterFile/>
</template>



<script>
    import TabletopFile from '../components/tabletop-file.vue'
    import BannersFile from '../components/banners-file.vue'
    import FooterFile from '../components/footer-file.vue'
    import calcWindowMixin from './mixinsForComponents/calcWindow-mixin';
    import { mapGetters, mapActions } from 'vuex';
    export default {
        name: 'MainFile',
        mixins: [calcWindowMixin],
        components: {
            BannersFile,
            TabletopFile,
            FooterFile,
        },
        props: {},
        data() {
            return {
                renameCategories: '',
                couruselAuto: null,
                couruselNums: 0,
                leftBorder: 1,
                rightBorder: 0,
                couruselContentDynamicStyle: {
                    marginLeft: '0px',
                },
                searchByCBAndS: {
                    tags: [],
                    minPrice: null,
                    maxPrice: null,
                    Age: null,
                    Time: null,
                    Players: null
                },
                showValue: {
                    opacity: '0'
                },
                showValuePlayers: {
                    opacity: '0'
                },
                showValueAge: {
                    opacity: '0'
                },
                showValueTime: {
                    opacity: '0'
                },
                rangePTrack: {
                    position: 'absolute',
                    zIndex: '2',
                    left: '100%',
                    right: '0%',
                    top: '0',
                    bottom: '0',
                    borderRadius: '5px',
                    backgroundColor: 'rgba(130, 125, 209)',
                },
                rangeP: {
                    left: '0%',
                    transform: 'translate(-8px, -4px)',
                },
                rangeATrack: {
                    position: 'absolute',
                    zIndex: '2',
                    left: '0%',
                    right: '0%',
                    top: '0',
                    bottom: '0',
                    borderRadius: '5px',
                    backgroundColor: 'rgba(130, 125, 209)',
                },
                rangeA: {
                    left: '0%',
                    transform: 'translate(-8px, -4px)',
                },
                rangeTTrack: {
                    position: 'absolute',
                    zIndex: '2',
                    left: '0%',
                    right: '0%',
                    top: '0',
                    bottom: '0',
                    borderRadius: '5px',
                    backgroundColor: 'rgba(130, 125, 209)',
                },
                rangeT: {
                    left: '0%',
                    transform: 'translate(-8px, -4px)',
                },
                rangeLT: {
                    left: '10%',
                    transform: 'translate(-10px, -4px)',
                },
                rangeRT: {
                    right: '0%',
                    transform: 'translate(5px, -4px)',
                },
                rangeLR: {
                    position: 'absolute',
                    zIndex: '2',
                    left: '0%',
                    right: '0%',
                    top: '0',
                    bottom: '0',
                    borderRadius: '5px',
                    backgroundColor: 'rgba(130, 125, 209)',
                },
                visibleAd: {
                    opacity: 1
                },
                minPrice: null,
                maxPrice: null,
                maxPlayers: null,
                minAge: null,
                minTime: null,
                checkBoxTopHeight: {
                    top: null
                },
            }
        },
        computed: {
            ...mapGetters([
                'GOODSFORGOODSHOW', 'GETBANNERS', 'GETGOODS', 'GETSEARCHGOODS'// получаем массив banners из store
            ]),
            //Колличество найденого товара//
            searchByCBAndSResult() {
                let result = [] 
                let finallyResult = []
                let find = undefined
                this.GETGOODS.forEach(element => {
                    find = element.goodTag.filter(tag => this.searchByCBAndS.tags.includes(tag))
                    if ( JSON.stringify(find.sort()) === JSON.stringify(this.searchByCBAndS.tags.sort())) {
                        result.push(element)
                    }
                })
                result.forEach(el => {
                    if (el.age && !el.time && !el.players) {
                        if (el.age >= Number(this.searchByCBAndS.Age) && el.price >= Number(this.searchByCBAndS.minPrice) && el.price <= Number(this.searchByCBAndS.maxPrice)) {
                            finallyResult.push(el)
                        }
                    }
                    else if (el.age && el.players && !el.time) {
                        if (el.age >= Number(this.searchByCBAndS.Age) && el.players <= Number(this.searchByCBAndS.Players) && el.price >= Number(this.searchByCBAndS.minPrice) && el.price <= Number(this.searchByCBAndS.maxPrice)) {
                            finallyResult.push(el)
                        }
                    }
                    else if (el.age && el.players && el.time) {
                        if (el.age >= Number(this.searchByCBAndS.Age) && el.time >= Number(this.searchByCBAndS.Time) && el.players <= Number(this.searchByCBAndS.Players) && el.price >= Number(this.searchByCBAndS.minPrice) && el.price <= Number(this.searchByCBAndS.maxPrice)) {
                            finallyResult.push(el)
                        }
                    }
                })
                return finallyResult
            }
        },
        methods: {
            ...mapActions([
                'GETBANNERSFROMAPI', 'GETGOODSSFROMAPI', 'MAKEGOODSNULL', 'DESTROYSEARCHVALUE', 'MAKESEARCHGOODSNULL', 'GETSEARCHGOODSTOVUEX', 'SEARCHBYCATEGORIES', 'GETGOODSFORGOODSHOW'
            ]),
            //Добавление выбранного тега в поисковой массив//
            addToSearchByCBAndS($event) {
                if ( this.searchByCBAndS.tags.includes($event.target.innerText) ) {
                    var index = this.searchByCBAndS.tags.indexOf($event.target.innerText)
                    this.searchByCBAndS.tags.splice(index, 1)
                }
                else {
                    this.searchByCBAndS.tags.push($event.target.innerText)
                }
            },
            //Подсчёт Цены, игроков, Времени и Возраста//
            calcSliders() {
                var sortArr = []
                this.GETGOODS.forEach(element => {
                    if (element.players != undefined) {
                        sortArr.push(element.players)
                    }
                })
                sortArr.sort((a, b) => b - a)
                this.maxPlayers = sortArr[0]
                sortArr = []
                this.GETGOODS.forEach(element => {
                    if (element.age != undefined) {
                        sortArr.push(element.age)
                    }
                })
                sortArr.sort((a, b) => b - a)
                this.minAge = sortArr[0]
                sortArr = []
                this.GETGOODS.forEach(element => {
                    if (element.time != undefined) {
                        sortArr.push(element.time)
                    }
                })
                sortArr.sort((a, b) => b - a)
                this.minTime = sortArr[0]
                sortArr = []
                this.GETGOODS.forEach(element => {
                    if (element.price != undefined) {
                        sortArr.push(element.price)
                    }
                })
                sortArr.sort((a, b) => a - b)
                this.minPrice = sortArr[0]
                sortArr.sort((a, b) => b - a)
                this.maxPrice = sortArr[0]
            },
            //Движение карусели влево//
            couruselLeft() {
                var banner = document.querySelector('.BannersFile')
                var bannersWidth = window.getComputedStyle(banner).width
                var bwnum = bannersWidth.slice(0, -2)
                var bannersMargin = window.getComputedStyle(banner).marginRight
                var bmnum = bannersMargin.slice(0, -2)
                this.couruselNums ++ 
                if (this.couruselNums > 0) {
                    this.couruselNums = 0
                    this.leftBorder =  1
                    this.rightBorder =  0
                    this.couruselContentDynamicStyle.marginLeft = ((Number(bwnum) + (Number(bmnum) * 2)) * this.couruselNums) + 'px'
                }
                else this.couruselContentDynamicStyle.marginLeft = ((Number(bwnum) + (Number(bmnum) * 2)) * this.couruselNums) + 'px'
            },
            //Движение карусели вправо//
            couruselRight() {
                var banner = document.querySelector('.BannersFile')
                var bannersWidth = window.getComputedStyle(banner).width
                var bwnum = bannersWidth.slice(0, -2)
                var bannersMargin = window.getComputedStyle(banner).marginRight
                var bmnum = bannersMargin.slice(0, -2)
                var windowWidth = Math.round(window.innerWidth / Number(bwnum))
                this.couruselNums --
                if (this.couruselNums < -(this.GETBANNERS.length - windowWidth)) {
                    this.couruselNums = -(this.GETBANNERS.length - windowWidth)
                    this.leftBorder =  0
                    this.rightBorder =  1
                    this.couruselContentDynamicStyle.marginLeft = ((Number(bwnum) + (Number(bmnum) * 2)) * this.couruselNums) + 'px'
                }
                else this.couruselContentDynamicStyle.marginLeft = ((Number(bwnum) + (Number(bmnum) * 2)) * this.couruselNums) + 'px'
            },
            //Запуск автоматического движения карусели//
            startCouruselAuto() {
                if (this.windowW > 321) {
                    this.couruselAuto = setInterval(this.couruselAutoFunc, 5000)
                }
            },
            //Функция изменения направления движения карусели//
            couruselAutoFunc() {
                if (this.leftBorder === 1 && this.rightBorder === 0) {
                    this.couruselRight()
                }
                else if (this.leftBorder === 0 && this.rightBorder === 1) {
                    this.couruselLeft()
                }
            },
            //Остановка карусели при наведении на неё мыши//
            stopCouruselAuto() {
                clearInterval(this.couruselAuto)
            },
            //Открытие/Закрытие второго окна в левой части second block//
            showMoreFuncOpen($event) {
                let eventShowMore = $event.target.className
                if (document.querySelector('.' + eventShowMore + 'ShowMore')) {
                    document.querySelector('.' + eventShowMore + 'ShowMore').style.visibility = 'visible'
                }
                else if (document.querySelector('.' + eventShowMore))
                document.querySelector('.' + eventShowMore).style.visibility = 'visible'
            },
            showMoreFuncClose($event) {
                let eventShowMore = $event.target.className
                if (document.querySelector('.' + eventShowMore + 'ShowMore')) {
                    document.querySelector('.' + eventShowMore + 'ShowMore').style.visibility = 'hidden'
                }
                else if (document.querySelector('.' + eventShowMore))
                document.querySelector('.' + eventShowMore).style.visibility = 'hidden'
            },
            //Поиск товара по клику на элемент в каруселе//
            bannerClick(Banner) {
                this.$router.push({name: 'goodpage', query: {'Good': Banner.bannerid}})
            },
            //Переход к товару по рекламке//
            goToAdGood() {
                this.$router.push({name: 'goodpage', query: {'Good': 16}})
            },
            //Закрыть рекламку//
            closeAd() {
                this.visibleAd.opacity = 0
            },
            //Поиск товара по тегу, по линкам//
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
            //Поиск товара по нескольким тегам, по линкам//
            searchByNonStandardCategories($event) {
                this.DESTROYSEARCHVALUE()
                this.MAKESEARCHGOODSNULL()
                this.renameCategories = $event.target.innerText
                this.SEARCHBYCATEGORIES(this.renameCategories)
                this.$router.push('Catalog')
            },
            //Поиск товара по слайдерам + чекбоксам//
            searchByCBAndSShowGoods(searchByCBAndSResult) {
                this.MAKESEARCHGOODSNULL()
                this.GETSEARCHGOODSTOVUEX(searchByCBAndSResult)
                this.$router.push('Catalog')
            },
        },
        watch: {
            GETGOODS() {
                this.GETGOODSFORGOODSHOW(this.GETGOODS)
                this.calcSliders()
            },
            //Изменение положения тамблера и цветной полосы в зависимости от значения цены/возраста/времени/игроков//
            minPrice() {
                if (Number(this.minPrice) > Number(this.maxPrice)) {
                    let tmp = this.minPrice
                    this.minPrice = this.maxPrice
                    this.maxPrice = tmp
                }
                else {
                    var calcValue = null
                    calcValue = this.minPrice / 21600 * 100 + '%'
                    this.rangeLR.left = calcValue
                    this.rangeLT.left = calcValue
                }
                this.searchByCBAndS.minPrice = this.minPrice
            },
            maxPrice() {
                if (Number(this.minPrice) > Number(this.maxPrice)) {
                    let tmp = this.minPrice
                    this.minPrice = this.maxPrice
                    this.maxPrice = tmp
                }
                else {
                    var calcValue = null
                    calcValue = 100 - (this.maxPrice / 21600 * 100) + '%'
                    this.rangeLR.right = calcValue
                    this.rangeRT.right = calcValue
                }
                this.searchByCBAndS.maxPrice = this.maxPrice
            },
            maxPlayers() {
                var calcValue = null
                calcValue = (this.maxPlayers - 2) * 100 / 6 + '%'
                this.rangeP.left = calcValue
                this.rangePTrack.left = calcValue
                this.searchByCBAndS.Players = this.maxPlayers
            },
            minAge() {
                var calcValue = null
                calcValue = (this.minAge - 10) * 100 / 8 + '%'
                this.rangeA.left = calcValue
                this.rangeATrack.left = calcValue
                this.searchByCBAndS.Age = this.minAge
            },
            minTime() {
                var calcValue = null
                calcValue = (this.minTime - 20) * 100 / 160 + '%'
                this.rangeT.left = calcValue
                this.rangeTTrack.left = calcValue
                this.searchByCBAndS.Time = this.minTime
            }
        },
        mounted() {
            this.GETGOODSSFROMAPI(), this.GETBANNERSFROMAPI(), this.startCouruselAuto()
            //получаем список  из db.json и заносим в массив chars в store
        },
        unmounted() {
            this.MAKEGOODSNULL(), this.stopCouruselAuto()
        }
    }
</script>


<style lang="scss">
    
</style>