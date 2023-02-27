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
    
</style>
