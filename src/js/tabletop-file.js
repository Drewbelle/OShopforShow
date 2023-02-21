import selectFile from '../components/select-file.vue'
import ButtonFile from '../components/button-file.vue'
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'TableTopFile',
  components: {
    ButtonFile,
    selectFile
  },
  data() {
        return {
            renameCategories: '',
            sortedGoods: [],
            openedSelectedCategories: false,
            searchValue: '',
            selectList: [
                {name: 'All Goods', selectedId: 0},
                {name: 'Party Games', selectedId: 1},
                {name: 'Card Games', selectedId: 2},
                {name: 'Classic Games', selectedId: 3},
                {name: 'Cooperative Games', selectedId: 4},
                {name: 'Role Play Games', selectedId: 5},
                {name: 'Detective', selectedId: 6},
                {name: 'Warhammer', selectedId: 7},
                {name: 'Manchikin', selectedId: 8},
                {name: 'Paints', selectedId: 9}
            ],
        }
    },
  methods: {
    showInfo() {
      console.log(this.GETGOODS[0])
    },
    ...mapActions([
      'GETSEARCHVALUETOVUEX', 'GETSEARCHGOODSTOVUEX', 'MAKESEARCHGOODSNULL', 'MAKESEARCHVALUENULL', 'SEARCHBYCATEGORIES', 'DESTROYSEARCHVALUE'
    ]),
    searchGood(value) { 
      this.DESTROYSEARCHVALUE()
      this.MAKESEARCHGOODSNULL()
      this.GETSEARCHVALUETOVUEX(value)
      this.GETGOODS.forEach(el => {
        if (el.goodTag.includes(this.GETSEARCHVALUE)) {
          this.GETSEARCHGOODSTOVUEX(el)
          //поиск в ds.json нужных товаров по категориям
        }
      })
      if (this.GETSEARCHGOODS.length === 0) {
        this.MAKESEARCHVALUENULL()
      }
      this.$emit('goToCatalogAndSearchSelectedItem')
      this.$router.push('Catalog')
      this.searchValue = ''
    },
    goToCatalogAndSearchSelectedItem(selectItem) {
      this.DESTROYSEARCHVALUE()
      this.MAKESEARCHGOODSNULL()
      this.GETGOODS.forEach(el => {
        if (el.goodTag.includes(selectItem.name)) {
          this.GETSEARCHGOODSTOVUEX(el)
          //поиск в ds.json нужных товаров по категориям
        }
        else if (selectItem.name === 'All Goods') {
          this.MAKESEARCHGOODSNULL()
        }
      })
      this.renameCategories = selectItem.name
      this.SEARCHBYCATEGORIES(this.renameCategories)
      this.$emit('goToCatalogAndSearchSelectedItem')
      this.$router.push('Catalog')
    },
  },
  computed: {
    ...mapGetters([
      'GETSEARCHVALUE', 'GETGOODS', 'GETSEARCHGOODS', 'GETSEARCHCATEGORIES', 'GETCART'
    ]),
  },
}