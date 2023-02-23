<template>
    <div class="BannersFile" @click="bannerClick()">
        <img class="bannerImg" :src=" require('@/assets/css/gameShopContent/banners/' + banner_data.url) " alt="">
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
