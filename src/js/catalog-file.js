    import TabletopFile from '../components/tabletop-file.vue'
    import GoodsItemsFile from '../components/GoodsItemsFile'
    import { mapActions, mapGetters } from 'vuex'
    export default {
        name: 'CatalogFile',
        components: {
            GoodsItemsFile,
            TabletopFile
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
                this.$router.push({name: 'goodpage', query: {'Good': Good.art}})
            },
            r543() {
                console.log(this.GETSEARCHVALUE)
            },
        },
        mounted() {
            this.GETGOODSSFROMAPI(), this.changeR543() //получаем список  из db.json и заносим в массив в store
        },
        unmounted() {
            this.GETGOODSFORGOODSHOW(this.GETGOODS), this.MAKEGOODSNULL(), this.DESTROYSEARCHVALUE(), this.MAKESEARCHGOODSNULL(), this.DESTROYSEARCHBYCATEGORIES()
        }
    }