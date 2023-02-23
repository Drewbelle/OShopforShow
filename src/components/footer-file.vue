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
import calcWindowMixin from './mixinsForComponents/calcWindow-mixin';
import { mapGetters } from 'vuex'
export default {
    name: 'FooterFile',
    mixins: [calcWindowMixin],
    data() {
        return {}
    },
    methods: {},
    computed : {
        ...mapGetters ([
            'GETCART'
        ])
    },
}
</script>


<style lang="scss">

</style>