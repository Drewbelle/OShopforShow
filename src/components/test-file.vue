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
            this.GETBANNERSFROMAPI(), this.GETTESTBANNERSFROMAPI(), window.onscroll = this.changePositionBG, this.startQuestAnimation()
        }
    }
</script>

<style lang="scss">
    [data-aos="custom-flip-right-logo-name"] {
        position: relative;
        transform: perspective(2500px) rotateY(-100deg);
        letter-spacing: 100px;
        opacity: 0;
        &.aos-animate {
            transition-property: all;
            transition: 5s;
            transform: perspective(2500px) rotateY(0);
            letter-spacing: 10px;
            opacity: 1;
        }
    }
    [data-aos="custom-flip-left-logo"] {
        position: relative;
        transform: perspective(2500px) rotateY(-100deg);
        rotate: 359deg;
        opacity: 0;
        &.aos-animate {
            transition-property: all;
            transition: 5s;
            transform: perspective(2500px) rotateY(0);
            rotate: 0deg;
            opacity: 1;
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

        &WelcomeBlock {
            width: 100vw;
            height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;

            &Text {
                text-align: center;
                font-size: 80px;
                z-index: 100;
                letter-spacing: 5px;
                font-weight: 700;
            }
        }
        &SiteLogo {
            width: 100vw;
            height: 100vh;
            z-index: 100;
            display: flex;
            align-items: center;
            justify-content: center;

            &Logo {
                background-image: url(@/assets/css/gameShopContent/joystick.png);
                background-size: contain;
                background-repeat: no-repeat;
                width: 300px;
                height: 300px;                    
                transition-property: all;
                transition: 0.7s;

                &:hover {
                    rotate: 359deg;
                }
            }
            &Name {
                height: 300px;
                margin-left: 5px;
                line-height: 300px;
                font-size: 50px;
                font-style: normal;
                color: purple;
                letter-spacing: -3px;
                transition-property: all;
                transition: 0.7s;
                text-shadow: 3px 3px 1px #2a2d30;
                    
                &:hover {
                    letter-spacing: 5px;
                }
            }
        }
        &BG {
            width: 100%;
            height: 100%;
            background-position: center;
            background-repeat: no-repeat;
            background-size: cover;
            position: absolute;
            top: 200vh;
            left: 0;
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
        }
        &GoToShop {
            width: 100vw;
            height: 100vh;
            background: linear-gradient(0deg, rgba(255,179,0,1) 0%, rgba(255,179,0,0.9) 50%, rgba(253,45,45,0) 100%);
            z-index: 100;
            display: flex;

            &Pict {
                width: 50%;
                height: 100%;
                display: flex;
                align-items: flex-end;
                position: relative;

                &Img {
                    width: 1000px;
                    height: 500px;
                    background: radial-gradient(circle, blue 0%, rgba(148,187,233,0) 40%);
                    position: absolute;
                    left: 10%;
                    bottom: -30px;
                    transition-property: all;
                    transition: 2s;

                    &::before {
                        content: '';
                        display: block;
                        width: 100%;
                        height: 100%;
                        background: url(@/assets/css/gameShopContent/maxtall.png);
                        background-position: center;
                        background-repeat: no-repeat;
                        background-size: contain;
                    }
                    &Quest {
                        position: absolute;
                        top: -10%;
                        left: 50%;
                        width: 100px;
                        height: 200px;
                        background: url(@/assets/css/gameShopContent/vopros.png);
                        background-position: center;
                        background-repeat: no-repeat;
                        background-size: contain;
                        transition-property: all;
                        transition: 0.5s;
                    }
                }
            }
            &Content {
                width: 50%;
                height: 100%;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: flex-end;
                position: relative;
                color: white;

                &Phrase {
                    width: 50%;
                    height: 100px;
                    line-height: 100px;
                    font-size: 45px;
                    font-weight: 600;
                    text-align: center;
                }
                &LinkToShop {
                    width: 30%;
                    height: 200px;
                    line-height: 200px;
                    font-size: 60px;
                    font-weight: 700;
                    text-align: center;
                    cursor: pointer;

                    &:hover {
                        color: #2a2d30;
                    }
                }
            }
        }
    }
    .rollLoad {
        width: 100%;
        height: 100%;
        background-color: rgb(255, 255, 255);
        position: absolute;
        top: 0%;
        left: 0%;
        z-index: 101;

        &Text {
            width: 100%;
            height: 200px;
            line-height: 200px;
            font-size: 50px;
            position: fixed;
            top: calc(50% - 100px);
            left: 0;
            text-align: center;
            transition-property: all;
            transition: 3s;
        }
        &Logo {
            width: 300px;
            height: 300px;
            position: fixed;
            top: 50px;
            left: calc(50% - 150px);
            background: url(@/assets/css/gameShopContent/joystick.png);
            background-position: center;
            background-repeat: no-repeat;
            background-size: contain;
            transition-property: all;
            transition: 3s;
        }
    }
</style>