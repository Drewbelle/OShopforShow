<template>
    <div data-aos="fade" class="testFile">
        <div class="testFileBG">
            <TestFileAnimatedBackgroundAnimBlock
                v-for="testBanner in GETTESTBANNERS"
                v-bind:key="testBanner.testbannerid"
                v-bind:testbannersbg_data="testBanner"
                v-bind:variable="2"
                v-bind:style="{transform: 'translateY(' + this.positionY + 'px)'}"
            />
            <TestFileAnimatedBackgroundAnimBlock
                v-for="testBanner in GETTESTBANNERS"
                v-bind:key="testBanner.testbannerid"
                v-bind:testbannersbg_data="testBanner"
                v-bind:variable="2"
                v-bind:style="{transform: 'translateY(' + this.positionY + 'px)'}"
            />
            <TestFileAnimatedBackgroundAnimBlock
                v-for="testBanner in GETTESTBANNERS"
                v-bind:key="testBanner.testbannerid"
                v-bind:testbannersbg_data="testBanner"
                v-bind:variable="2"
                v-bind:style="{transform: 'translateY(' + this.positionY + 'px)'}"
            />
        </div>
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
    import TestFileAnimatedBackgroundAnimBlock from '@/components/test-file-animated-background-anim-block.vue'
    import { mapGetters, mapActions } from 'vuex';
    export default {
        components: {
            TestFileBanners,
            TestFileAnimatedBackgroundAnimBlock
        },
        data() {
            return {
                positionY: 0
            }
        },
        computed: {
            ...mapGetters([ 'GETBANNERS', 'GETTESTBANNERS' ])
        },
        methods: {
            ...mapActions([ 'GETBANNERSFROMAPI', 'GETTESTBANNERSFROMAPI' ]),        
            changePositionBG() {
                let yPage = window.scrollY
                this.positionY = -yPage/4
            }
        },
        mounted() {
            this.GETBANNERSFROMAPI(), this.GETTESTBANNERSFROMAPI(), window.onscroll = this.changePositionBG

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
        display: flex;
        background: url(@/assets/css/gameShopContent/bgtest.jpg);
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        flex-direction: column;
        align-items: center;
        position: relative;
        overflow: hidden;

        &BG {
            width: 100%;
            height: 100%;
            background: url(@/assets/css/gameShopContent/bgtest.jpg);
            background-position: center;
            background-repeat: no-repeat;
            background-size: cover;
            position: absolute;
            top: 0;
            left: 0;
            display: flex;
            flex-wrap: wrap;
        }
    }
</style>