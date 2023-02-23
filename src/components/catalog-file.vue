<template>
    <TabletopFile 
    />
    <div class="calatogFile">
        <div class="fakeTableTop"></div>
            <div class="searchInfo" v-if="GETSEARCHVALUE != 'Nothing' && GETSEARCHVALUE != ''">Search: <span class="searchInfoColored">{{GETSEARCHVALUE}}</span>, found:</div>
            <div class="searchInfo" v-else-if="GETSEARCHVALUE ==='Nothing'">No results were found for your search. Showing all products.</div>
            <div class="searchInfo" v-else-if="GETSEARCHCATEGORIES === 'Goods according to your request'"><span class="searchInfoColored">{{GETSEARCHCATEGORIES}}</span></div>
            <div class="searchInfo" v-else-if="GETSEARCHCATEGORIES !=''">Search by category: <span class="searchInfoColored">{{GETSEARCHCATEGORIES}}</span>, found:</div>
            <div class="searchInfo" v-else>All goods.</div>
            <div class="allGoodsCatalogBlock">
                <div class="catalogField" v-bind:class="{'catalogFieldSlim' : goodsInPages === 8}">
                    <GoodsItemsFile
                    v-for="Good in paginatedGoods"  
                    v-bind:key="Good.id"
                    v-bind:goods_data="Good"
                    v-bind:windowW="windowW"
                    v-on:catalogItemClick="catalogItemClick(Good)">
                    </GoodsItemsFile>
                    <!-- Указываем отдельно взятый элемент 
                    из итеррации (Character) и откуда мы его берём (В данном случае из геттера).
                    Обращаемся к уникальному свойству элемента Key, которое есть только у него
                    Биндим пропс char_data к отдельно взятому элементу,
                    Действие повторяется для каждого элемента из массива,
                    который вызывается геттером GETCHARS -->
                </div>
            </div>
            <div class="pagination">
                <div class="page" 
                    v-bind:class="{'pageSelected': page === pageNumber}"
                    v-for="page in pages"
                    v-bind:key="page"
                    @click="pageClick(page, $event)">
                    {{ page }}
                </div>
            </div>
            <div class="r543" v-bind:style="r543style" @click="r543"  v-if="windowW > 1023"></div>
    </div>
    <div class="fakeFooter" v-if="windowW <= 768"></div>
    <FooterFile/>
</template>

<script>
    import FooterFile from '../components/footer-file.vue'
    import TabletopFile from '../components/tabletop-file.vue'
    import GoodsItemsFile from '../components/GoodsItemsFile'
    import calcWindowMixin from './mixinsForComponents/calcWindow-mixin'
    import { mapActions, mapGetters } from 'vuex'
    export default {
        name: 'CatalogFile',
        mixins: [calcWindowMixin],
        components: {
            GoodsItemsFile,
            TabletopFile,
            FooterFile,
        },
        props: {

        },
        data() {
            return {
                defaultColor: {},
                goodsInPages: 9,
                pageNumber: 1,
                numsArray: [] ,
                r543style: {
                    width: '99px',
                    height: '99px'
                }
            }
        },
        computed: {
            ...mapGetters([
                'GETSEARCHVALUE', 'GETGOODS', 'GETCART', 'GETSEARCHGOODS', 'GETSEARCHCATEGORIES' // получаем массив chars из store
            ]),
            pages() {
                this.returnFirstPage()
                if (this.GETSEARCHGOODS.length === 0) {
                    return Math.ceil(this.GETGOODS.length / this.goodsInPages)
                }
                else return Math.ceil(this.GETSEARCHGOODS.length / this.goodsInPages)
            },
            paginatedGoods() {
                this.calcNumberGoodsInPage()
                var from = (this.pageNumber * this.goodsInPages) - this.goodsInPages
                var to = (this.pageNumber * this.goodsInPages) 
                if (this.GETSEARCHGOODS.length === 0){
                    return this.GETGOODS.slice(from, to)
                }
                else {
                    return this.GETSEARCHGOODS.slice(from, to)
                }
            }
        },
        methods: {
            calcNumberGoodsInPage() {
                if (this.GETSEARCHGOODS.length != 0) {
                    if (this.GETSEARCHGOODS.length % 2 === 0) {
                        this.goodsInPages = 8
                    }
                    else if (this.GETSEARCHGOODS.length % 2 != 0) {
                        this.goodsInPages = 9
                    }
                }
                else if (this.GETGOODS.length != 0) {
                    if (this.GETGOODS.length % 2 === 0) {
                        this.goodsInPages = 8
                    }
                    else if (this.GETGOODS.length % 2 != 0) {
                        this.goodsInPages = 9
                    }
                }
            },
            returnFirstPage() {
                this.pageNumber = 1 
            },
            ...mapActions([
                'GETGOODSFORGOODSHOW', 'GETGOODSSFROMAPI', 'MAKEGOODSNULL', 'DESTROYSEARCHVALUE', 'MAKESEARCHGOODSNULL', 'DESTROYSEARCHBYCATEGORIES'
            ]),
            changeR543() {
                setInterval(this.R543, 1000)
            },
            R543() {
                if (this.r543style.width > "50px") {
                    this.r543style.width = "50px"
                    this.r543style.height = "50px" 
                    this.r543style.left = "95vw"
                    this.r543style.bottom = "7vh"
                    this.r543style.backgroundColor = "rgba(130, 125, 209)"
                    this.r543style.border = "3px solid orange"
                }
                else {
                    this.r543style.backgroundColor = "orange"
                    this.r543style.border = "6px solid rgba(130, 125, 209)"
                    this.r543style.width = "99px"
                    this.r543style.height = "99px"
                    this.r543style.left= "calc(95vw - 25px)"
                    this.r543style.bottom = "calc(7vh - 25px)"
                }
            },
            pageClick(page) {
                this.pageNumber = page
            },
            catalogItemClick(Good) { 
                this.$router.push({name: 'goodpage', query: {'Good': Good.id}})
            },
            r543() {
                console.log(this.GETSEARCHVALUE)
            },
        },
        mounted() {
            this.GETGOODSSFROMAPI(), this.changeR543()  //получаем список  из db.json и заносим в массив в store
        },
        unmounted() {
            this.GETGOODSFORGOODSHOW(this.GETGOODS), this.MAKEGOODSNULL(), this.DESTROYSEARCHVALUE(), this.MAKESEARCHGOODSNULL(), this.DESTROYSEARCHBYCATEGORIES()
        }
    }
</script>

<style lang="scss">
</style>