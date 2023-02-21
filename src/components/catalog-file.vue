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
    import { mapActions, mapGetters } from 'vuex'
    export default {
        name: 'CatalogFile',
        components: {
            GoodsItemsFile,
            TabletopFile,
            FooterFile,
        },
        props: {

        },
        data() {
            return {
                windowW: 0,
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
            calcWindowW() {
            this.windowW = window.innerWidth
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
            this.GETGOODSSFROMAPI(), this.changeR543(), this.calcWindowW()  //получаем список  из db.json и заносим в массив в store
        },
        unmounted() {
            this.GETGOODSFORGOODSHOW(this.GETGOODS), this.MAKEGOODSNULL(), this.DESTROYSEARCHVALUE(), this.MAKESEARCHGOODSNULL(), this.DESTROYSEARCHBYCATEGORIES()
        }
    }
</script>

<style scoped>
    .calatogFile{
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        min-height: 100vh;
        margin-bottom: 30px;
    }
    .fakeTableTop {
        width: 100vw;
        height: 80px;
        background-color: black;
    }
    .searchInfo {
        width: 600px;
        height: 50px;
        margin-top: 50px;
        line-height: 50px;
        text-align: center;
        font-size: 20px;
        background-color: rgba(130, 125, 209);
        border: 1px solid black;
        box-shadow: 3px 3px 5px black;
    }
    .searchInfoColored {
        height: 50px;
        font-size: 20px;
        line-height: 50px;
        color: orange
    }
    .allGoodsCatalogBlock {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 30px;
        height: 100%;
    }
    .catalogField{
        display: flex;
        flex-wrap: wrap;
        min-height: 100%;
        width: 600px;
        justify-content: space-around;
    }
    .catalogFieldSlim{
        display: flex;
        flex-wrap: wrap;
        min-height: 100%;
        width: 450px;
        justify-content: space-around;
    }
    .pagination {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        height: 35px;
        margin-top: 40px;
        margin-bottom: 20px;
    }
    .page {
        box-shadow: 3px 3px 15px black;
        background-color: rgba(130, 125, 209);
        border: 1px solid black;
        padding: 8px;
        transition-property: all;
        transition: 1.5s;
        margin: 0 5px 0 5px;
    }
    .page:hover {
        box-shadow: 3px 3px 15px orange;
        border: 1px solid rgb(143, 93, 0);
        background-color: orange;
        cursor: pointer;
    }
    .pageSelected {
        box-shadow: 3px 3px 15px orange;
        border: 1px solid rgb(143, 93, 0);
        background-color: orange;
        cursor: pointer;
    }
    .r543{
        border-radius: 99px;
        border: 3px;
        background-color: rgba(130, 125, 209);
        border-color: orange;
        position: fixed;
        bottom: calc(7vh - 25px);  
        left: calc(95vw - 25px);
        transition-property: all;
        transition: 1s;
        box-shadow: 3px 3px 15px black;
    }



    @media (max-width: 1023px) {
        .fakeTableTop {
            height: 60px;
        }
    }
    @media (max-width: 320px) {
        .searchInfo {
            width: 100%;
            height: 25px;
            margin-top:10px;
            line-height: 25px;
            text-align: center;
            font-size: 10px;
            background-color: rgba(130, 125, 209);
            border: 1px solid black;
            box-shadow: 3px 3px 5px black;
        }
        .searchInfoColored {
            height: 25px;
            font-size: 10px;
            line-height: 25px;
            color: orange
        }
        .catalogField{
            display: flex;
            flex-wrap: wrap;
            margin-top: 1px;
            min-height: 100%;
            width: 100%;
        }
        .catalogFieldSlim{
            display: flex;
            flex-wrap: wrap;
            margin-top: 1px;
            min-height: 100%;
            width: 100%;
        }
        .page {
            box-shadow: none;
            height: 30px;
            line-height: 30px;
            font-size: 10px;
            display: flex;
            align-items: center;
            background-color: rgba(130, 125, 209);
            border: 1px solid black;
            padding: 8px;
            transition-property: all;
            transition: 1.5s;
            margin: 1px;
        }
        .fakeTableTop {
            height: 60px;
        }
    }
</style>