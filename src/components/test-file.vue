<template>
    <div data-aos="fade" class="testFile">
        <TestFileBanners
            v-for="Banner in GETBANNERS"
            v-bind:key="Banner.bannerid"
            v-bind:testbanner_data="Banner"
            v-on:bannerClick="bannerClick(Banner)"
        />
    </div>
</template>

<script>
    import TestFileBanners from '@/components/test-file-banners.vue'
    import { mapGetters, mapActions } from 'vuex';
    export default {
        components: {
            TestFileBanners,
        },
        computed: {
            ...mapGetters([ 'GETBANNERS' ])
        },
        methods: {
            ...mapActions([ 'GETBANNERSFROMAPI' ])
        },
        mounted() {
            this.GETBANNERSFROMAPI()
        }
    }
</script>

<style lang="scss">
    [data-aos="custom-flip-left"] {
        position: relative;
        transform: perspective(2500px) rotateY(-100deg);
        left: -100%;
        &.aos-animate {
            transform: perspective(2500px) rotateY(0);
            left: 5%;
        }
    }

    [data-aos="custom-flip-right"] {
        position: relative;
        transform: perspective(2500px) rotateY(-100deg);
        right: -100%;
        &.aos-animate {
            transform: perspective(2500px) rotateY(0);
            right: 5%;
        }
    }

    .testFile {
        width: 100%;
        height: 100%;
        background: url(@/assets/css/gameShopContent/bgtest.jpg);
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        display: flex;
        flex-direction: column;
        align-items: center;
        position: relative;
    }
</style>