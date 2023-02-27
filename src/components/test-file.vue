<template>
    <div data-aos="fade" class="testFile">
        <div data-aos="fade-up" data-aos-duration="1500" class="testFileWelcomeBlock">
            <span data-aos="zoom-in" data-aos-delay="200" class="testFileWelcomeBlockText">WELCOME</span>
        </div>
        <div class="testFileSiteLogo">
            <div data-aos-duration="1000" data-aos="custom-flip-left-logo" class="testFileSiteLogoLogo"></div>
            <div data-aos-duration="1000" data-aos="custom-flip-right-logo-name" class="testFileSiteLogoName">GAME SHOP</div>
        </div>
        <div data-aos="fade" class="testFileBG">
            <TestFileAnimatedBackgroundAnimBlock
                v-for="testBanner in GETTESTBANNERS"
                v-bind:key="testBanner.testbannerid"
                v-bind:testbannersbg_data="testBanner"
                v-bind:variable="2"
                v-bind:style="{transform: 'translateX(' + this.positionX + 'px) translateY(' + this.positionY + 'px)'}"
            />
            <TestFileAnimatedBackgroundAnimBlock
                v-for="testBanner in GETTESTBANNERS"
                v-bind:key="testBanner.testbannerid"
                v-bind:testbannersbg_data="testBanner"
                v-bind:variable="2"
                v-bind:style="{transform: 'translateX(' + this.positionX + 'px) translateY(' + this.positionY + 'px)'}"
            />
        </div>
        <TestFileBanners
            v-for="Banner in GETBANNERS"
            v-bind:key="Banner.bannerid"
            v-bind:testbanner_data="Banner"
            v-on:bannerClick="bannerClick(Banner)"
        />
        <div class="testFileGoToShop">
            <div class="testFileGoToShopPict">
                <div class="testFileGoToShopPictImg" v-bind:style="{rotate: this.rotateMan + 'deg'}">
                    <div class="testFileGoToShopPictImgQuest" v-bind:style="{rotate: questRotate + 'deg', transform: 'translateX(' + this.questX + 'px) translateY(' + this.questY + 'px)'}"></div>
                </div>
            </div>
            <div class="testFileGoToShopContent">
                <div data-aos="zoom-in" data-aos-delay="600" class="testFileGoToShopContentPhrase">Now you can move to</div>
                <div data-aos="zoom-in" data-aos-delay="600" class="testFileGoToShopContentLinkToShop" @click="toShop">To shop</div>
            </div>
        </div>
    </div>
    <div class="rollLoad" v-bind:style="loadRoll" @click="asas">
        <div class="rollLoadText" v-bind:style="loadRollText">GAME SHOP</div>
        <div class="rollLoadLogo" v-bind:style="loadRollLogo"></div>
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
                positionX: 0,
                positionY: 0,
                rotateMan: 1,
                questX: 0,
                questY: 0,
                questRotate: 0,
                oldValueY: 0,
                loadRoll: {
                    display: 'none',
                },
                loadRollText: {
                    letterSpacing: '100px',
                },
                loadRollLogo: {
                    rotate: '0deg'
                }
            }
        },
        computed: {
            ...mapGetters([ 'GETBANNERS', 'GETTESTBANNERS' ])
        },
        methods: {
            ...mapActions([ 'GETBANNERSFROMAPI', 'GETTESTBANNERSFROMAPI' ]),        
            changePositionBG() {
                this.positionX = + this.positionY / 10
                let yPage = window.scrollY
                this.positionY = -yPage/2
                let findBlock = document.querySelector('.testFileGoToShop')
                let calcY =  document.body.scrollHeight - 2 * (window.getComputedStyle(findBlock).height.slice(0, -2)) + 100
                if ( window.pageYOffset >= calcY ) {
                    let valueY = window.pageYOffset
                    if ( this.oldValueY < valueY) {
                        this.rotateMan = ((findBlock.getBoundingClientRect().y + findBlock.getBoundingClientRect().height / 2) / 45)   
                        console.log('down')
                    }
                    else if ( this.oldValueY > valueY ) {
                        this.rotateMan = -(findBlock.getBoundingClientRect().y  / 45)
                        console.log('up')
                    }
                    this.oldValueY = valueY
                }
            },
            startQuestAnimation() {
                setInterval(this.questAnimation, 500)
            },
            questAnimation() {
                this.questX = Math.floor(Math.random() * (15 - 1) + 1)
                this.questY = Math.floor(Math.random() * (15 - 1) + 1)
                this.questRotate = Math.floor(Math.random() * (15 - 1) + 1)
            },
            toShop() {
                this.loadRoll.display = 'block'
                setTimeout(check => {
                    this.loadRollLogo.rotate = '360deg'
                    this.loadRollText.letterSpacing = '5px'
                    setTimeout(this.jumpToShop, 3000)
                    return check
                }, 0.1)
            },
            jumpToShop() {
                this.$router.push({name: 'mainpage'})
            }
        },
        mounted() {
            this.GETBANNERSFROMAPI(), this.GETTESTBANNERSFROMAPI(), window.addEventListener('scroll', this.changePositionBG), this.startQuestAnimation()
        },
        unmounted() {
            window.removeEventListener('scroll', this.changePositionBG)
        }
    }
</script>

<style lang="scss">
    
</style>