<template>
    <div class="TestFileAnimatedBackgroundAnimBlock" v-bind:style="{marginTop: margTopRand + 'px', marginLeft: margLeftRand + 'px', height: heightRand + 'px', width: widthRand + 'px', rotate: rotateZRand + 'deg'}">
        <img class="bannerImg" :src=" require('@/assets/css/gameShopContent/banners/' + testbannersbg_data.url) " alt="">
    </div>
</template>

<script>

    export default {
    name: 'TestFileAnimatedBackgroundAnimBlock',
    components: {
    },
    props: {
        variable:{
            type: Number,
            default() {
                return 0
            }
        },
        testbannersbg_data:{
            type: Object,
            default() {
                return {}
            }
        }
    },
    data(){
        return {
            widthRand: 0,
            heightRand: 0,
            margLeftRand: 0,
            margTopRand: 0, 
            rotateZRand: 0,
        }
    },
    methods: {
        calcRandSize() {
            let rotateZMax = 15
            let sign = Math.floor(Math.random() * 100)
            console.log(sign)
            let randSign = null
            if (sign > 50) {
                randSign = '+'
            }
            else if (sign <= 50) {
                randSign = '-'
            }
            this.rotateZRand = randSign + Math.floor(Math.random() * rotateZMax)
            let margTopMax = 150
            let margTopMin = 50
            this.margTopRand = Math.floor(Math.random() * (margTopMax - margTopMin) + margTopMin)
            let margLeftMax = 300
            let margLeftMin = 100
            this.margLeftRand = Math.floor(Math.random() * (margLeftMax - margLeftMin) + margLeftMin)
            let heightMax = 320
            let heightMin = 100
            let widthMax = heightMax * 1.8
            let widthMin = heightMin * 1.8
            this.heightRand = Math.floor(Math.random() * (heightMax - heightMin) + heightMin)
            this.widthRand = Math.floor(Math.random() * (widthMax - widthMin) + widthMin)
        },
    },
    mounted() {
        this.calcRandSize()
    }
}
</script>

<style lang="scss">
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
</style>
