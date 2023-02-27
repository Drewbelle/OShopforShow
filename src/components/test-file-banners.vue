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
        z-index: 2;
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
        box-shadow: 3px 3px 5px black;
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        transform-style: preserve-3d !important;
        transition-property: all !important;
        transition: 1s !important;

        &:hover {
            box-shadow: 1px 1px 30px gold;
            transform: rotateX(2deg) rotateY(25deg) rotateZ(2deg) !important;
            opacity: .85 !important;
        }
    }
    .TestFileBannersInfo {
        margin-left: 50px;
        background-color: rgb(223, 223, 223);
        border: 1px solid black;
        border-radius: 5px;
        box-shadow: 1px 1px 7px black;
        padding: 10px;
        font-size: 12px;
        max-width: 1000px;
        max-height: 250px;
        display: flex;
    }
</style>
