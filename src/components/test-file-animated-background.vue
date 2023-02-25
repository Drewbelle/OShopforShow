<template>
    <div class="TestFileAnimatedBackground">
        <div class="TestFileAnimatedBackgroundAnimBlock AnimBlock1" v-bind:style="{transform: 'translateY(' + asas + 'px) rotateX(2deg) rotateY(25deg) rotateZ(2deg)'}"></div>
        <div class="TestFileAnimatedBackgroundAnimBlock AnimBlock2" v-bind:style="{transform: 'translateY(' + asas + 'px) rotateX(2deg) rotateY(25deg) rotateZ(12deg)'}"></div>
        <div class="TestFileAnimatedBackgroundAnimBlock AnimBlock3" v-bind:style="{transform: 'translateY(' + asas + 'px) rotateX(2deg) rotateY(25deg) rotateZ(-12deg)'}"></div>
        <div class="TestFileAnimatedBackgroundAnimBlock AnimBlock4" v-bind:style="{transform: 'translateY(' + asas + 'px) rotateX(2deg) rotateY(25deg) rotateZ(-20deg)'}"></div>
        <div class="TestFileAnimatedBackgroundAnimBlock AnimBlock5" v-bind:style="{transform: 'translateY(' + asas + 'px) rotateX(2deg) rotateY(25deg) rotateZ(-7deg)'}"></div>
        <div class="TestFileAnimatedBackgroundAnimBlock AnimBlock6" v-bind:style="{transform: 'translateY(' + asas + 'px) rotateX(2deg) rotateY(25deg) rotateZ(3deg)'}"></div>
        <div class="TestFileAnimatedBackgroundAnimBlock AnimBlock7" v-bind:style="{transform: 'translateY(' + asas + 'px) rotateX(2deg) rotateY(25deg) rotateZ(5deg)'}"></div>
        <div class="TestFileAnimatedBackgroundAnimBlock AnimBlock8" v-bind:style="{transform: 'translateY(' + asas + 'px) rotateX(2deg) rotateY(25deg) rotateZ(-22deg)'}"></div>
        <div class="TestFileAnimatedBackgroundAnimBlock AnimBlock9" v-bind:style="{transform: 'translateY(' + asas + 'px) rotateX(2deg) rotateY(25deg) rotateZ(6deg)'}"></div>
        <div class="TestFileAnimatedBackgroundAnimBlock AnimBlock10" v-bind:style="{transform: 'translateY(' + asas + 'px) rotateX(2deg) rotateY(25deg) rotateZ(-12deg)'}"></div>
        <div class="TestFileAnimatedBackgroundAnimBlock AnimBlock11" v-bind:style="{transform: 'translateY(' + asas + 'px) rotateX(2deg) rotateY(25deg) rotateZ(-2deg)'}"></div>
        <div class="TestFileAnimatedBackgroundAnimBlock AnimBlock12" v-bind:style="{transform: 'translateY(' + asas + 'px) rotateX(2deg) rotateY(25deg) rotateZ(-10deg)'}"></div>
        <div class="TestFileAnimatedBackgroundAnimBlock AnimBlock13" v-bind:style="{transform: 'translateY(' + asas + 'px) rotateX(2deg) rotateY(25deg) rotateZ(4deg)'}"></div>
        <div class="TestFileAnimatedBackgroundAnimBlock AnimBlock14" v-bind:style="{transform: 'translateY(' + asas + 'px) rotateX(2deg) rotateY(25deg) rotateZ(-6deg)'}"></div>
        <div class="TestFileAnimatedBackgroundAnimBlock AnimBlock15" v-bind:style="{transform: 'translateY(' + asas + 'px) rotateX(2deg) rotateY(25deg) rotateZ(8deg)'}"></div>
        <div class="TestFileAnimatedBackgroundAnimBlock AnimBlock16" v-bind:style="{transform: 'translateY(' + asas + 'px) rotateX(2deg) rotateY(25deg) rotateZ(16deg)'}"></div>
        <div class="TestFileAnimatedBackgroundAnimBlock AnimBlock17" v-bind:style="{transform: 'translateY(' + asas + 'px) rotateX(2deg) rotateY(25deg) rotateZ(-22deg)'}"></div>
    </div>
</template>

<script>

    export default {
    name: 'TestFileAnimatedBackground',
    components: {
    },
    data(){
        return {
            asas: 0,
            counter: 0,
            // caclTranslate: -(this.counter * window.innerHeight / 100) + 'px',
            // dynamicAnimBlock: {
            //     transform: 'translateY({{caclTranslate}})',
            // }
        }
    },
    methods: {
        changePositionBG() {
            let yPage = window.pageYOffset
            let a = document.querySelector('.AnimBlock12')
            console.log(a.getBoundingClientRect().y)
            console.log(yPage)
            this.asas = -yPage/3
        }
    },
    mounted() {
        window.onscroll = this.changePositionBG
    }
}
</script>

<style lang="scss">
    .TestFileAnimatedBackground {
        z-index: 1;
        width: 100%;
        height: 100%;
        display: flex;
        position: absolute;
        top: 0;
        left: 0;
        flex-wrap: wrap;

        .AnimBlock1 {
            width: 500px;
            height: 200px;
            background: url(@/assets/css/gameShopContent/banners/Agricola_banner.jpg);
            margin-left: 150px;
        }
        .AnimBlock2 {
            width: 600px;
            height: 250px;
            background: url(@/assets/css/gameShopContent/banners/Dedukcio_banner.jpg);
            margin-left: 300px;
            margin-top: 200px;
        }
        .AnimBlock3 {
            width: 300px;
            height: 120px;
            background: url(@/assets/css/gameShopContent/banners/Zames_banner.jpg);
            margin-left: 10px;
            margin-top: 50px;
        }
        .AnimBlock4 {
            width: 400px;
            height: 160px;
            background: url(@/assets/css/gameShopContent/banners/Golosa_banner.png);
            margin-left: 140px;
            margin-top: 140px;
        }
        .AnimBlock5 {
            width: 500px;
            height: 200px;
            background: url(@/assets/css/gameShopContent/banners/Mans_Hope_banner.jpg);
            margin-left: 420px;
            margin-top: 120px;
        }
        .AnimBlock6 {
            width: 400px;
            height: 180px;
            background: url(@/assets/css/gameShopContent/banners/LOTR_banner.jpg);
            margin-left: 30px;
            margin-top: 500px;
        }
        .AnimBlock7 {
            width: 700px;
            height: 320px;
            background: url(@/assets/css/gameShopContent/banners/Bitoku_banner.jpg);
            margin-left: 100px;
            margin-bottom: 100px;
        }
        .AnimBlock8 {
            width: 400px;
            height: 150px;
            background: url(@/assets/css/gameShopContent/banners/Smert_na_balu_banner.jpg);
            margin-left: 220px;
            margin-top: 150px;
        }
        .AnimBlock9 {
            width: 300px;
            height: 120px;
            background: url(@/assets/css/gameShopContent/banners/Path_Finder_banner.jpg);
            margin-left: 400px;
            margin-top: 100px;
        }
        .AnimBlock10 {
            width: 500px;
            height: 240px;
            background: url(@/assets/css/gameShopContent/banners/Libertation_banner.jpg);
            margin-left: 300px;
            margin-top: 250px;
        }
        .AnimBlock11 {
            width: 400px;
            height: 160px;
            background: url(@/assets/css/gameShopContent/banners/The_Gardens_banner.jpg);
            margin-left: 300px;
            margin-top: 10px;
        }
        .AnimBlock12 {
            width: 200px;
            height: 80px;
            background: url(@/assets/css/gameShopContent/banners/Scarlet_Keys_banner.jpg);
            margin-left: 300px;
            margin-top: 150px;

        }
        .AnimBlock13 {
            width: 300px;
            height: 140px;
            background: url(@/assets/css/gameShopContent/banners/Everdell_Pearlbrook_banner.jpg);
            margin-left: 300px;
            margin-top: 150px;
        }
        .AnimBlock14 {
            width: 500px;
            height: 200px;
            background: url(@/assets/css/gameShopContent/banners/Everdell_Spirecrest_banner.jpg);
            margin-left: 300px;
            margin-top: 150px;
        }
        .AnimBlock15 {
            width: 600px;
            height: 250px;
            background: url(@/assets/css/gameShopContent/banners/Golosa_banner.png);
            margin-left: 300px;
            margin-top: 100px;
        }
        .AnimBlock16 {
            width: 700px;
            height: 320px;
            background: url(@/assets/css/gameShopContent/banners/ENCYCLOPEDIA_banner.jpg);
            margin-left: 120px;
            margin-top: 150px;
        }
        .AnimBlock17 {
            width: 450px;
            height: 200px;
            background: url(@/assets/css/gameShopContent/banners/Everdell_Spirecrest_banner.jpg);
            margin-left: 220px;
            margin-top: 280px;
        }
        .TestFileAnimatedBackgroundAnimBlock {
            background-position: center;
            background-repeat: no-repeat;
            background-size: cover;
            opacity: 1;
            border: 1px solid black;
            border-radius: 5px;
            box-shadow: 3px 3px 5px black;
            transition-property: all;
            transition: 1s;
        }
    }
</style>
