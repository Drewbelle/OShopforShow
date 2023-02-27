<template>
    <div class="TestFileAnimatedBackgroundAnimBlock" @mouseenter="interactive()" v-bind:style="{marginTop: margTopRand + 'px', marginLeft: margLeftRand + 'px', height: heightRand + 'px', width: widthRand + 'px', rotate: rotateZRand + 'deg'}">
        <img class="TestFileAnimatedBackgroundAnimBlockImg" v-bind:style="{filter: 'blur(' + blurRand + 'px)'}" :src=" require('@/assets/css/gameShopContent/banners/' + testbannersbg_data.url) " alt="">
        <div class="TestFileAnimatedBackgroundAnimBlockBubble"></div>
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
            blurRand: 0,
        }
    },
    methods: {
        calcRandSize() {
            let rotateZMax = 15
            let sign = Math.floor(Math.random() * 100)
            let randSign = null
            if (sign > 50) {
                randSign = '+'
            }
            else if (sign <= 50) {
                randSign = '-'
            }
            this.rotateZRand = randSign + Math.floor(Math.random() * rotateZMax)
            let margTopMax = 200
            let margTopMin = 10
            this.margTopRand = Math.floor(Math.random() * (margTopMax - margTopMin) + margTopMin)
            let margLeftMax = 200
            let margLeftMin = 10
            this.margLeftRand = Math.floor(Math.random() * (margLeftMax - margLeftMin) + margLeftMin)
            let heightMax = 420
            let heightMin = 150
            this.heightRand = Math.floor(Math.random() * (heightMax - heightMin) + heightMin)
            this.widthRand = this.heightRand
            let blurMax = 5
            let blurMin = 2
            this.blurRand = Math.floor(Math.random() * (blurMax - blurMin) + blurMin)
        },
        interactive() {
            let randRotate = Math.floor(Math.random() * 10)
            let randSign = Math.floor(Math.random() * 10)
            if ( randSign > 5) {
                this.rotateZRand = (Number(this.rotateZRand) + randRotate) / 2
            }
            else this.rotateZRand = -(Number(this.rotateZRand) + randRotate) / 2
        }
    },
    mounted() {
        this.calcRandSize()
    }
}
</script>

<style lang="scss">
        
</style>
