<template>
    <div class="FooterFile">
        <div class="footerContent" v-if="windowW <= 768">
            <div class="footerContentCatalog">
                <router-link to="/Catalog" class="footerContentCatalogImage">
                </router-link>
                <span class="footerContentName">Catalog</span>
            </div>
            <div class="footerContentCart">
                <router-link to="/Cart" class="footerContentCartImage">
                    <div class="cartValue">{{ this.GETCART.length }}</div>
                </router-link>
                <span class="footerContentName">Cart</span>
            </div>
            <div class="footerContentLogin">
                <div class="footerContentLoginImage"></div>
                <span class="footerContentName">Profile</span>
            </div>
        </div>
        <div class="bigFooterContent" v-else-if="windowW > 768">
            <div class="logoContainer">
                <div class="footerImage"></div>
                <span class="footerShopName">GAME SHOP</span>
            </div>
            <span class="footerInfo">All data is not used in commerce, only for personal education.</span>
        </div>
    </div>
</template>


<script>
import { mapGetters } from 'vuex'
export default {
    name: 'FooterFile',
    data() {
        return {
            windowW: '',
        }
    },
    methods: {
        calcWindowW() {
            this.windowW = window.innerWidth
        },
    },
    computed : {
        ...mapGetters ([
            'GETCART'
        ])
    },
    mounted() {
        this.calcWindowW()
            //получаем список  из db.json и заносим в массив chars в store
    },
}
</script>


<style>
    .FooterFile {
        height: 150px;
        width: 100vw;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: white;
        border-top: 3px solid orange;
    }
    .bigFooterContent {
        width: 80%;
        display: flex;
        flex-wrap: wrap;
    }
    .logoContainer {
        display: flex;
        justify-content: center;
        width: 100%;
    }
    .footerImage {
        width: 80px;
        height: 80px;
        background-image: url(../assets/gameShopContent/joystick.png);
        background-size: contain;
        background-position: center;
        background-repeat: no-repeat;
    }
    .footerShopName {
        width: 200px;
        height: 80px;
        line-height: 80px;
        font-size: 48px;
        color: rgba(130, 125, 209);
        letter-spacing: -10px;
    }
    .footerInfo {
        height: 50px;
        line-height: 50px;
        font-size: 16px;
        color: rgba(130, 125, 209);
    }
    .footerContent {
        display: flex;
        width: 80%;
        justify-content: space-around;
    }
    .footerContentCatalog, .footerContentCart, .footerContentLogin {
        width: 50px;
        height: 50px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    .footerContentCatalogImage {
        width: 30px;
        height: 30px;
        background-image: url(../assets/gameShopContent/catalog.png);
        background-repeat: no-repeat;
        background-size: contain;
        background-position: center;
    }
    .footerContentCartImage {
        width: 30px;
        height: 30px;
        background-image: url(../assets/gameShopContent/cart1.png);
        background-repeat: no-repeat;
        background-size: contain;
        background-position: center;
    }
    .footerContentLoginImage {
        width: 30px;
        height: 30px;
        background-image: url(../assets/gameShopContent/profile.png);
        background-repeat: no-repeat;
        background-size: contain;
        background-position: center;
    }
    .footerContentName {
        display: block;
        width: 50px;
        height: 20px;
        text-align: center;
    }
    @media (max-width: 1023px) {
        .FooterFile {
            height: 60px;
            background-color: white;
            position: fixed;
            z-index: 12;
        }
        .cartValue {
            width: 15px;
            height: 15px;
            line-height: 15px;
            right: 0;
            bottom: 0;
            color: red;
        }
    }
</style>