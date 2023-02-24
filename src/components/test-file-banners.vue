<template>
        <div data-aos="custom-flip-right" class="TestFileBanners">
            <img data-aos="zoom-in" data-aos-delay="200" class="TestFileBannersImg" :src=" require('@/assets/css/gameShopContent/banners/' + testbanner_data.url) ">
            <div class="TestFileBannersInfo">{{ testbanner_data.info }}</div>
        </div>
</template>

<script>
    export default {
    name: 'TestFileBanners',
    components: {
    },
    props: { //пропсы - входные параметры от родительского компонента
            testbanner_data:{
                type: Object,
                default() {
                    return {}
            }
        }
    },
    data(){
        return {}
    },
    methods: {
        //Эметим вверх(в мейн) инфу о нажатом баннере, в мейне подписываемся на эту функцию//
        bannerClick() {
            this.$emit('bannerClick', this.banner_data)
        }
    },
}
</script>

<style lang="scss">
    .TestFileBanners {
        display: flex;
        align-items: center;
        margin-top: 50px;
        margin-bottom: 50px;
    }
    .TestFileBannersImg {
        position: relative;
        width: 400px;
        height: 250px;
        border: 1px solid black;
        border-radius: 5px;
        box-shadow: 1px 1px 4px black;
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
    }
    .TestFileBannersInfo {
        margin-left: 50px;
        background-color: rgb(223, 223, 223);
        border: 1px solid black;
        border-radius: 5px;
        box-shadow: 1px 1px 4px black;
        padding: 10px;
        font-size: 16px;
        max-height: 250px;
    }
</style>
