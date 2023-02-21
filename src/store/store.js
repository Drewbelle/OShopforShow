// eslint-disable-next-line no-unused-vars

import Vuex from 'vuex'
import axios from 'axios'



export let store = new Vuex.Store({
    state: {
        cartLocalStorage: [],
        goodsForShow: [],
        searchCategoiers: '',
        searchValue: '',
        searchGoods: [],
        goods: [],
        banners: [],
        cart: [],
        addedGood: {}
    },


    mutations: {
        SETGOODSFORGOODSHOW: (state, newArrayGoods) => {
            state.goodsForShow = newArrayGoods
        },
        SETDESTROYBYCATEGORIES: (state) => {
            state.searchCategoiers = ''
        },
        SETSEARCHBYCATEGORIES: (state, renameCategories) => {
            if (renameCategories === 'Small') {
                let smallPl = []
                state.goods.forEach(el => {
                    if (el.players <= 3) {
                        smallPl.push(el)
                    }
                })
                state.searchGoods = smallPl    
            }
            else if (renameCategories === 'Medium') {
                let mediumPl = []
                state.goods.forEach(el => {
                    if (el.players > 3 && el.players <= 6) {
                        mediumPl.push(el)
                    }
                })
                state.searchGoods = mediumPl    
            }
            else if (renameCategories === 'Large') {
                let largePl = []
                state.goods.forEach(el => {
                    if (el.players > 6) {
                        largePl.push(el)
                    }
                })
                state.searchGoods = largePl    
            }
            else if (renameCategories === 'New Table Games') {
                let newTG = []
                state.goods.forEach(el => {
                    if (Object.values(el.goodTag).includes("Table Games") && Object.values(el.goodTag).includes("News")) {
                        newTG.push(el)
                    }
                })
                state.searchGoods = newTG    
            }
            else if (renameCategories === 'New Warhammer') {
                let newWh = []
                state.goods.forEach(el => {
                    if (Object.values(el.goodTag).includes("Warhammer") && Object.values(el.goodTag).includes("News")) {
                        newWh.push(el)
                    }
                })
                state.searchGoods = newWh    
            }
            else if (renameCategories === 'New Manchikin') {
                let newMnc = []
                state.goods.forEach(el => {
                    if (Object.values(el.goodTag).includes("Manchikin") && Object.values(el.goodTag).includes("News")) {
                        newMnc.push(el)
                    }
                })
                state.searchGoods = newMnc    
            }
            else if (renameCategories === 'New Paints') {
                let newPnt = []
                state.goods.forEach(el => {
                    if (Object.values(el.goodTag).includes("Paints") && Object.values(el.goodTag).includes("News")) {
                        newPnt.push(el)
                    }
                })
                state.searchGoods = newPnt    
            }
            else if (renameCategories === 'Hits Table Games') {
                let hitTG = []
                state.goods.forEach(el => {
                    if (Object.values(el.goodTag).includes("Table Games") && Object.values(el.goodTag).includes("Hits")) {
                        hitTG.push(el)
                    }
                })
                state.searchGoods = hitTG    
            }
            else if (renameCategories === 'Hits Warhammer') {
                let hitWh = []
                state.goods.forEach(el => {
                    if (Object.values(el.goodTag).includes("Warhammer") && Object.values(el.goodTag).includes("Hits")) {
                        hitWh.push(el)
                    }
                })
                state.searchGoods = hitWh    
            }
            else if (renameCategories === 'Hits Manchikin') {
                let hitMnc = []
                state.goods.forEach(el => {
                    if (Object.values(el.goodTag).includes("Manchikin") && Object.values(el.goodTag).includes("Hits")) {
                        hitMnc.push(el)
                    }
                })
                state.searchGoods = hitMnc    
            }
            else if (renameCategories === 'Hits Paints') {
                let hitPnt = []
                state.goods.forEach(el => {
                    if (Object.values(el.goodTag).includes("Paints") && Object.values(el.goodTag).includes("Hits")) {
                        hitPnt.push(el)
                    }
                })
                state.searchGoods = hitPnt    
            }
            else { state.searchCategoiers = renameCategories }
        },
        SETDESTROYSEARCHVALUE: (state) => {
            state.searchValue = ''
        },
        SETSEARCHVALUENULL: (state) => {
            state.searchValue = 'Nothing'
        },
        SETSEARCHGOODSNULL: (state) => {
            state.searchGoods = []
        },
        SETSEARCHGOODSTOSTATE: (state, el) => {
            // state.searchGoods.push(el)
            if (el.length) {
                state.searchGoods = el
            }
            else {
                state.searchGoods.push(el)
            }
            state.searchCategoiers = 'Goods according to your request'
        },
        SETGOODSNULL: (state) => {
            state.goods = []
        },
        SETSEARCHVALUETOSTATE: (state, value) => {
            state.searchValue = value
        },
        SETBANNERSTOSTATE: (state, Banners) => {
            state.banners = Banners
        },
        SETGOODSTOGOODS: (state, Goods)=> {
            Goods.forEach(element => {
                if ( Object.keys(element).includes("sales")) {
                    element.oldPrice = element.price
                    element.price = Math.round(element.price * ((100 - element.sales)/100))
                }
            });
            state.goods = state.goods.concat(Goods)
        },
        SETTOCART: (state, Good) => {
            if (localStorage.getItem('cartLocalStorage')) {
                try {
                  state.cart = JSON.parse(localStorage.getItem('cartLocalStorage'));
                } catch(e) {
                  localStorage.removeItem('cartLocalStorage');
                }
            }
            state.addedGood = Good
            if (state.cart.length === 0 ) {
                state.addedGood.summGood = 1
                state.cart.push(state.addedGood)
            }
            else if (state.cart.length != 0) {
                var findGood = state.cart.find(el =>
                    el.id === state.addedGood.id
                )
                if (findGood) {
                    findGood.summGood++
                }
                else {
                    state.addedGood.summGood = 1
                    state.cart.push(state.addedGood)
                }
            }
            state.cartLocalStorage = state.cart
            const parsed = JSON.stringify(state.cartLocalStorage);
            localStorage.setItem('cartLocalStorage', parsed);
            state.addedGood = {}
        },
        SETMOREGOOD: (state, index) => {
            state.cart[index].summGood++
            state.cartLocalStorage = state.cart
            const parsed = JSON.stringify(state.cartLocalStorage);
            localStorage.setItem('cartLocalStorage', parsed);
        },
        SETLESSGOOD: (state, index) => {
            if (state.cart[index].summGood == 1) {
                state.cart.splice(index , 1)
                state.cartLocalStorage = state.cart
                const parsed = JSON.stringify(state.cartLocalStorage);
                localStorage.setItem('cartLocalStorage', parsed);
            }
            else {
            state.cart[index].summGood--
            state.cartLocalStorage = state.cart
            const parsed = JSON.stringify(state.cartLocalStorage);
            localStorage.setItem('cartLocalStorage', parsed);
            }
        },
        DELGOOD: (state, index) => {
            state.cart.splice(index, 1)
            state.cartLocalStorage = state.cart
            const parsed = JSON.stringify(state.cartLocalStorage);
            localStorage.setItem('cartLocalStorage', parsed);
        }
    },



    actions: {
        GETGOODSFORGOODSHOW({commit}, newArrayGoods) {
            commit('SETGOODSFORGOODSHOW', newArrayGoods)
        },
        DESTROYSEARCHBYCATEGORIES({commit}) {
            commit('SETDESTROYBYCATEGORIES')
        },
        SEARCHBYCATEGORIES({commit}, renameCategories) {
            commit('SETSEARCHBYCATEGORIES', renameCategories)
        },
        DESTROYSEARCHVALUE({commit}) {
            commit('SETDESTROYSEARCHVALUE')
        },
        MAKESEARCHVALUENULL({commit}) {
            commit('SETSEARCHVALUENULL')
        },
        MAKESEARCHGOODSNULL({commit}) {
            commit('SETSEARCHGOODSNULL')
        },
        GETSEARCHGOODSTOVUEX({commit}, el) {
            commit('SETSEARCHGOODSTOSTATE', el)
        },
        MAKEGOODSNULL({commit}) {
            commit('SETGOODSNULL')
        },
        GETSEARCHVALUETOVUEX({commit}, value) {
            commit('SETSEARCHVALUETOSTATE', value)
        },
        GETBANNERSFROMAPI({commit}) {
            return axios('https://o-shopfor-show.vercel.app/db.json',{
                method: "GET"
            })
                .then((res) =>{
                    commit('SETBANNERSTOSTATE', res)
                    console.log(res.data)
                    return res
                })
                .catch(console.log('error'))
        },
        GETGOODSSFROMAPI({commit}) {
            return axios('https://o-shopfor-show.vercel.app/db.json/Goods',{
                method: "GET"
            })
                .then((Goods) =>{
                    commit('SETGOODSTOGOODS', Goods.data)
                    return Goods
                })
                .catch(console.log('error'))
        },
        ADDTOCART({commit}, Good) {
            commit('SETTOCART', Good)
        },
        ADDMOREGOOD({commit}, index) {
            commit('SETMOREGOOD', index)
        },
        ADDLESSGOOD({commit}, index) {
            commit('SETLESSGOOD', index)
        },
        GETDELGOOD({commit}, index) {
            commit('DELGOOD', index)
        }
    },



    getters: {
        GOODSFORGOODSHOW(state) {
            return state.goodsForShow
        },
        GETSEARCHCATEGORIES(state){
            return state.searchCategoiers
        },
        GETSEARCHGOODS(state){
            return state.searchGoods
        },
        GETSEARCHVALUE(state){
            return state.searchValue
        },
        GETBANNERS(state){
            return state.banners
        },
        GETTABLEGAMES(state){
            return state.tablegames
        },
        GETWARHAMMER(state){
            return state.warhammer
        },
        GETMANCHIKIN(state){
            return state.manchikin
        },
        GETPAINTS(state) {
            return state.paints
        },
        GETGOODS(state) {
            return state.goods
        },
        GETCART(state){
            if (localStorage.getItem('cartLocalStorage')) {
                try {
                  state.cart = JSON.parse(localStorage.getItem('cartLocalStorage'));
                } catch(e) {
                  localStorage.removeItem('cartLocalStorage');
                }
            }
            return state.cart
        }
    }
}
    
)
