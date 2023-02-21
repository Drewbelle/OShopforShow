<template>
  <div class="tableTop" v-if="windowW > 768">
    <div class="topColorLine">
      <div class="topDeck">
        <div class="userRegion">
          <div class="userRegionPict"></div>
          <span class="userCountry">{{ this.country }}</span>
        </div>
        <router-link to="/" class="logoName">
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
          <router-link to="/Admin" class="butTD ButtonFile butCart">Admin
          </router-link>
          <router-link to="/Cart" class="butTD ButtonFile butCart">Cart
            <div class="cartValue">{{ this.GETCART.length }}</div>
          </router-link>
          <ButtonFile class="butTD butLogin">Login</ButtonFile>
        </div>
      </div>
    </div>
    <div class="botColorLine">
      <div class="burgerMenu" v-bind:class="{'openSelectedCategoriesStyle': openedSelectedCategories}">
        <div class="selectCategories" 
          @click="this.openedSelectedCategories = !this.openedSelectedCategories" 
          @mouseleave="this.openedSelectedCategories = false" 
          >
          All Categories
          <selectFile
            v-for="selectItem in selectList"
            v-bind:key="selectItem.selectedId"
            v-bind:selectItem_data="selectItem"
            v-bind:name="selectItem.name"
            v-on:goToCatalogAndSearchSelectedItem="goToCatalogAndSearchSelectedItem"
            >
          </selectFile>
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
        <router-link to="/" class="logoName">
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
import { mapGetters, mapActions } from 'vuex'
import axios from 'axios'
export default {
  name: 'TableTopFile',
  components: {
    ButtonFile,
    selectFile
  },
  data() {
        return {
            windowW: '',
            country: '',
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
    ...mapActions([
      'GETSEARCHVALUETOVUEX', 'GETSEARCHGOODSTOVUEX', 'MAKESEARCHGOODSNULL', 'MAKESEARCHVALUENULL', 'SEARCHBYCATEGORIES', 'DESTROYSEARCHVALUE'
    ]),
    calcWindowW() {
      this.windowW = window.innerWidth
    },
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
    this.checkUserRegion(), this.calcWindowW()
    // navigator.geolocation.getCurrentPosition(this.success, this.error);
  }
}
</script>
  
<style>
  .tableTop{
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100vw;
      height: 80px; 
      position: fixed;
      top: 0;
      z-index: 100;
  }
  .topColorLine {
      display: flex;
      width: 100%;
      height: 60px;
      position: relative;
      background-color: white;
      flex-direction: column;
      align-items: center;
  }
  .botColorLine {
      display: flex;
      width: 100%;
      height: 20px;
      background-color: rgba(130, 125, 209);
      flex-direction: column;
      align-items: center;
      border-top: 3px solid orange;
  }
  .topDeck{
      width: 70%;
      height: 60px;
      margin: 0;
      padding: 0;
      display: flex;
      justify-content: space-around;
      align-items: center;
      position: relative;
  }
  .burgerMenu {
      width: 60%;
      height: 20px;
      display: flex;
      position: relative;
      overflow: hidden;
  }
  .selectCategories {
      height: 220px;
      width: 10%;
      line-height: 20px;
      text-align: center;
      cursor: pointer;
  }
  .selectCategories:hover {
      background-color: rgba(255, 166, 0, 0.808);
  }
    .openSelectedCategoriesStyle {
      overflow: visible;
  }
  .userRegion {
    color: rgba(130, 125, 209);
    position: absolute;
    display: flex;
    height: 24px;
    bottom: 25%;
    left: -200px;
  }
  .userRegionPict {
    height: 24px;
    width: 24px;
    background-image: url(../assets/gameShopContent/geo.png);
    background-repeat: no-repeat;
    background-size: contain;
  }
  .userCountry {
    height: 24px;
    line-height: 24px;
    font-size: 16px;
  }
  .logoName {
      display: flex;
      align-items: center;
      text-decoration: none;
  }
  .mainlink {
      background-image: url(@/assets/gameShopContent/joystick.png);
      background-size: contain;
      background-repeat: no-repeat;
      width: 50px;
      height: 50px;
  }
  .namesite {
      width: 50px;
      height: 50px;
      line-height: 25px;
      font-size: 18px;
      font-style: normal;
      color: rgba(130, 125, 209);
      letter-spacing: -3px;
  }
  .searchBlock {
      width: 485px;
      height: 35px;
      display: flex;
      align-items: center;
      position: relative;
  }
  .searchInGoods {
      height: 35px;
      width: 450px;
      line-height: 35px;
      font-size: 14px;
      border-top-left-radius: 10px;
      border-bottom-left-radius: 10px;
      border: 1px solid black;
      padding-left: 10px;
      background-color: wheat;
      outline: none;
  }
  .searchInGoods:hover {
      background-color: rgb(248, 210, 139);
  }
  .goSearch {
      height: 35px;
      width: 30px;
      background: url(../assets/gameShopContent/search.png);
      background-repeat: no-repeat;
      background-size: 25px 25px;
      background-position: center;
      position: absolute;
      right: 5px;
      cursor: pointer;
      border-top-right-radius: 10px;
      border-bottom-right-radius: 10px;
      border: 1px solid black;
      border-left: 0px;
      background-color: wheat;
  }
  .goSearch:hover {
      background-color: rgb(248, 210, 139);
  }
  .buttonsInTopDeck {
      display: flex;
  }
  .butTD{
      margin: 0px 15px 0px 15px;
  }
  .cartValue{
    position: absolute;
    right: 2.5px;
    bottom: 2.5px;
    height: 20px;
    width: 20px;
    line-height: 20px;
    text-align: center;
    border-radius: 99px;
    background-color: orange;
  }



  @media (max-width: 1439px) {
    .butTD{
      margin: 0px 5px 0px 5px;
    }
    .searchBlock {
      width: 280px;
    }
    .searchInGoods {
      width: 250px;
    }
    .goSearch {
      height: 35px;
      width: 30px;
    }
    .cartValue{
    height: 10px;
    width: 10px;
    line-height: 10px;
    }
    .userRegion {
    height: 12px;
    bottom: 25%;
    left: -100px;
  }
  .userRegionPict {
    height: 12px;
    width: 12px;
  }
  .userCountry {
    height: 12px;
    line-height: 12px;
    font-size: 8px;
  }
  .selectCategories {
      width: 150px;
  }
  }


  @media (max-width: 1023px) {
    .tableTop {
      height: 60px;
    }
    .searchBlock {
      width: 300px;
      height: 20px;
    }
    .searchInGoods {
      width: 280px;
      height: 20px;
    }
    .goSearch {
      width: 20px;
      height: 20px;
      background-size: 10px 10px;
    }
    .userRegion {
    height: 12px;
    bottom: 25%;
    right: 0;
    }
    .userRegionPict {
      height: 12px;
      width: 12px;
    }
    .userCountry {
      height: 12px;
      line-height: 12px;
      font-size: 8px;
    }
}


@media (max-width: 320px) {
    .tableTop {
      height: 40px;
    }
    .topDeck {
      width: 100%;
    }
    .mainlink {
      width: 25px;
      height: 25px;
  }
  .namesite {
      width: 25px;
      height: 25px;
      line-height: 12px;
      font-size: 10px;
  }
    .searchBlock {
      width: 200px;
      height: 20px;
    }
    .searchInGoods {
      width: 180px;
      height: 20px;
      font-size: 10px;
      background-color: white;
    }
    .searchInGoods:hover {
      background: none;
    }
    .goSearch {
      width: 20px;
      height: 20px;
      background-size: 10px 10px;
      background-color: white;
    }
    .userRegion {
      width: 100px;
      height: 12px;
      line-height: 12px;
      font-size: 10px;
      bottom: 0;
      left: calc(50% - 50px);
      justify-content: center;
    }
    .userRegionPict {
      background: none;
      width: 0;
      height: 0;
    }
    .userCountry {
      height: 12px;
      line-height: 12px;
      font-size: 8px;
    }
  }
  
  </style>
  