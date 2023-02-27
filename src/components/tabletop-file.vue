<template>
  <div class="tableTop" v-if="windowW > 768">
    <div class="topColorLine">
      <div class="topDeck">
        <div class="userRegion">
          <div class="userRegionPict"></div>
          <span class="userCountry">{{ this.country }}</span>
        </div>
        <router-link to="/Main" class="logoName">
          <div class="mainlink"></div>
          <div class="namesite">Game Shop</div>
        </router-link>
        <div class="searchBlock">
          <input 
            class="searchInGoods" 
            type="text" 
            v-model="searchValue">
          <div class="goSearch" @click="searchGood(searchValue)"></div>
        </div>
        <div class="buttonsInTopDeck">
          <ButtonFile class="butTD ButtonFile butCart">
            <router-link to="/Admin" class="butTDText">Admin</router-link>
          </ButtonFile>
          <ButtonFile class="butTD ButtonFile butCart">
            <router-link to="/Cart" class="butTDText">Cart
              <div class="cartValue">{{ this.GETCART.length }}</div>
            </router-link>
          </ButtonFile>
          <ButtonFile class="butTD ButtonFile butCart">Login</ButtonFile>
          <ButtonFile class="butTD ButtonFile butCart" v-bind:class="{'openSelectedCategoriesStyle': this.openedSelectedCategories}"
            @click="this.openedSelectedCategories = !this.openedSelectedCategories"
            @mouseleave="this.openedSelectedCategories = false" 
          >
            Categories
            <div class="selectCategories">
              <selectFile
                v-for="selectItem in selectList"
                v-bind:key="selectItem.selectedId"
                v-bind:selectItem_data="selectItem"
                v-bind:name="selectItem.name"
                v-on:goToCatalogAndSearchSelectedItem="goToCatalogAndSearchSelectedItem"
                >
              </selectFile>
            </div>
          </ButtonFile>
        </div>
      </div>
    </div>
  </div>
  <div class="tableTop" v-else-if="windowW <= 768">
    <div class="topColorLine">
      <div class="topDeck">
        <div class="userRegion">
          <div class="userRegionPict"></div>
          <span class="userCountry">{{ this.country }}</span>
        </div>
        <router-link to="/Main" class="logoName">
          <div class="mainlink"></div>
          <div class="namesite">Game Shop</div>
        </router-link>
        <div class="searchBlock">
          <input 
            class="searchInGoods" 
            type="text" 
            v-model="searchValue">
          <div class="goSearch" @click="searchGood(searchValue)"></div>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script>
import selectFile from '../components/select-file.vue'
import ButtonFile from '../components/button-file.vue'
import calcWindowMixin from './mixinsForComponents/calcWindow-mixin'
import { mapGetters, mapActions } from 'vuex'
import axios from 'axios'
export default {
  name: 'TableTopFile',
  mixins: [calcWindowMixin],
  components: {
    ButtonFile,
    selectFile
  },
  data() {
        return {
            country: '',
            renameCategories: '',
            sortedGoods: [],
            openedSelectedCategories: false,
            searchValue: '',
            selectList: [
                {name: 'All Goods', selectedId: 0},
                {name: 'Party', selectedId: 1},
                {name: 'Card', selectedId: 2},
                {name: 'Classic', selectedId: 3},
                {name: 'Cooperative', selectedId: 4},
                {name: 'Role Play', selectedId: 5},
                {name: 'Detective', selectedId: 6},
                {name: 'Warhammer', selectedId: 7},
                {name: 'Manchikin', selectedId: 8},
                {name: 'Paints', selectedId: 9}
            ],
        }
    },
  methods: {
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
    checkUserRegion() {
      axios('https://ipinfo.io/',{
      method: "GET"
    })
      .then((data) =>{
        this.country = data.data.region
      })
      .catch(console.log('error'))
    }
  },
  computed: {
    ...mapGetters([
      'GETSEARCHVALUE', 'GETGOODS', 'GETSEARCHGOODS', 'GETSEARCHCATEGORIES', 'GETCART'
    ]),
  },
  mounted() {
    this.checkUserRegion()
    // navigator.geolocation.getCurrentPosition(this.success, this.error);
  }
}
</script>
  
<style lang="scss">

</style>
  