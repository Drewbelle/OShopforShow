<template>
    <div class="BannersFile" @click="bannerClick()">
        <img class="bannerImg" :src=" require('../assets/gameShopContent/banners/' + banner_data.url) " alt="">
    </div>
</template>

<script>
    export default {
    name: 'BannersFile',
    components: {
    },
    props: { //пропсы - входные параметры от родительского компонента
            banner_data:{
                type: Object,
                default() {
                    return {}
            }
        }
    },
    data(){
        return {
            btnName: 'Buy'
        }
    },
    methods: {
        bannerClick() {
            this.$emit('bannerClick', this.banner_data)
        }
    }
}
</script>

<style>
    .BannersFile {
        cursor: pointer;
        max-width: 620px;
        height: 340px;
        margin: 0 10px 0 10px;
        box-shadow: 2px 2px 3px black;
    }
    .BannersFile:hover {
        opacity: 0.9;
        box-shadow: 0px 0px 0px black;
    }
    .bannerImg {
        width: 620px;
        height: 340px;
        background-image: url(../assets/gameShopContent/banners/Agricola_banner.jpg);
    }
    @media (max-width: 1919px) {
        .BannersFile {
            max-width: 700px;
        }
        .bannerImg {
        width: 700px;
        }
    }
    @media (max-width: 1439px) {
        .BannersFile {
            max-width: 492px;
        }
        .bannerImg {
            width: 492px;
        }
    }
    @media (max-width: 1023px) {
    .BannersFile {
        cursor: pointer;
        max-width: 245px;
        height: 170px;
        margin: 0 5px 0 5px;
        box-shadow: 1px 1px 3px black;
    }
    .BannersFile:hover {
        opacity: 1;
        box-shadow: none;
    }
    .bannerImg {
        max-width: 245px;
        height: 170px;
        background-image: url(../assets/gameShopContent/banners/Agricola_banner.jpg);
    }
}
</style>
