<template>
    <TabletopFile/>
    <div class="AdminPannelFile">
        <div class="fakeTableTop"></div>
        <div class="addedNewGoodBG">
            <div class="adminPannelFileAddNewGood">
            <div class="inputUrl">
                <span class="spanInputUrl" v-bind:style="{color: newGood.url!='' ? 'green' : 'red'}">Enter Url</span>
                <input required type="text" class="inputUrlText" v-model="newGood.url">
            </div>
            <div class="miniInputs">
                <div class="inputMiniBlock inputPrice">
                    <input required type="text" class="inputText inputPriceText" v-model="newGood.price">
                    <span class="inputSpan spanInputPrice" v-bind:style="{color: newGood.price!='' ? 'green' : 'red'}">Enter Price</span>
                </div>
                <div class="inputMiniBlock inputId">
                    <input required type="text" class="inputText inputIdText" v-model="newGood.id">
                    <span class="inputSpan spanInputId" v-bind:style="{color: newGood.id!='' ? 'green' : 'red'}">Enter Id</span>
                </div>
                <div class="inputMiniBlock inputName">
                    <input required type="text" class="inputText inputNameText" v-model="newGood.name">
                    <span class="inputSpan spanInputName" v-bind:style="{color: newGood.name!='' ? 'green' : 'red'}">Enter Name</span>
                </div>
                <div class="inputMiniBlock inputSales">
                    <input type="text" class="inputText inputSalesText" v-model="newGood.sales">
                    <span class="coloredSpanVariably inputSpan spanInputSales" v-bind:style="{color: newGood.sales!='' ? 'green' : 'orange'}">Enter Sales</span>
                </div>
                <div class="inputMiniBlock inputPlayers">
                    <input type="text" class="inputText inputPlayersText" v-model="newGood.players">
                    <span class="inputSpan spanInputPlayers" v-bind:style="{color: newGood.players!='' ? 'green' : 'orange'}">Enter Players</span>
                </div>
                <div class="inputMiniBlock inputTime">
                    <input type="text" class="inputText inputTimeText" v-model="newGood.time">
                    <span class="inputSpan spanInputTime" v-bind:style="{color: newGood.time!='' ? 'green' : 'orange'}">Enter Time</span>
                </div>
                <div class="inputMiniBlock inputAge">
                    <input required type="text" class="inputText inputAgeText" v-model="newGood.age">
                    <span class="coloredSpanVariably inputSpan spanInputAge" v-bind:style="{color: newGood.age!='' ? 'green' : 'red'}">Enter Age</span>
                </div>
            </div>
            <div class="maxiInputs">
                <div class="inputMaxiBlockInfo inputInfo">
                    <span class="inputSpan spanInputInfo" v-bind:style="{color: newGood.info!='' ? 'green' : 'red'}">Enter Info</span>
                    <textarea required maxlength="9999999" class="inputTextArea inputInfoText" v-model="newGood.info"></textarea>
                </div>
                <div class="inputMaxiBlockTags inputGoodTag">
                    <div class="spnAndBtns">
                        <span class="inputSpan spanInputGoodTag" v-bind:style="{color: newGood.goodTag.length === 0 ? 'red' : 'green'}">Enter Tag</span>
                        <div class="addTags">
                            <ButtonFile class="inputBtn" @click="addTag(goodTags)">Add Tag</ButtonFile>
                            <ButtonFile class="inputBtn" @click="deleteAllTags()">Delete Tags</ButtonFile>
                        </div>
                    </div>
                    <input type="text" class="inputGoodTagText" v-model="goodTags">
                </div>
            </div> 
        </div>
        </div>
        <div class="choisePostPutDel">
            <ButtonFile class="actionBtn postBtn" @click="showAcceptedBlock(), this.postGood = true">Post new Good</ButtonFile>
            <ButtonFile class="actionBtn putBtn" @click="showAcceptedBlock(), this.putGood = true">Edit Good</ButtonFile>
            <ButtonFile class="actionBtn delBtn" @click="showAcceptedBlock(), this.delGood = true">Delete Good</ButtonFile>
        </div>
    </div>
    <div class="choiseBG" v-bind:class="{'showAcceptBlock': showAcceptBlock}">
            <div class="choiseBlock" v-if="postGood">
                <span class="choiseBlockName">Confirm the addition of a new good</span>
                <div class="choiseInfoBlock">
                    <p class="choiseInfo">
                        Are you sure you want to add a new good, with name: <span class="choiseInfoColoredSpan">{{ newGood.name }}</span> , price: <span class="choiseInfoColoredSpan">{{ newGood.price }}</span> ₽.<br>
                        Characteristics: for children: over <span class="choiseInfoColoredSpan">{{ newGood.age }}</span> years old, playing time: from <span class="choiseInfoColoredSpan">{{ newGood.time }}</span> minutes, maximum number of players: <span class="choiseInfoColoredSpan">{{ newGood.players }}</span> people.<br>
                        Good image placement address: <span class="choiseInfoColoredSpan">{{ newGood.url }}</span>.<br>
                        Unique good identifier: <span class="choiseInfoColoredSpan">{{ newGood.id }}</span>.<br>
                        Good tags: <span class="choiseInfoColoredSpan">{{ transofmTags }}</span>.<br>
                        Good discount: <span class="choiseInfoColoredSpan">{{ newGood.sales }}</span>%.<br>
                        Good information: <span class="choiseInfoColoredSpan">{{ newGood.info }}</span><br>
                    </p>
                </div>
                <div class="choiseBtns">
                    <ButtonFile class="choiseBtn acceptBtn" @click="postNewGood()">Accept</ButtonFile>
                    <ButtonFile class="choiseBtn cancelBtn" @click="cancelPost()">Cancel</ButtonFile>    
                </div>
            </div>
            <div class="choiseBlock" v-if="putGood">
                <div class="choiseIdForEditBlock">
                    <span class="choiseBlockName">You want to change an existing good. Choose id</span>
                    <input type="text" required class="spanInputChoiseId" v-model="editId">
                </div>
                <span class="notFindedInfo" v-if="idFind === false">Good with identifier {{ editId }} not find.</span>
                <span class="findedInfo" v-else-if="idFind">Good with identifier {{ editId }} finded.</span>
                <div class="choiseProperty">
                    <span class="choisePropertyNameCB" id="cPNName" @click="showChoiseInfoBlock($event)" v-bind:style="{color: choisePropertyNameCB === 'Name' ? 'green' : 'red'}">Name</span>
                    <span class="choisePropertyNameCB" id="cPNPrice" @click="showChoiseInfoBlock($event)" v-bind:style="{color: choisePropertyNameCB === 'Price' ? 'green' : 'red'}">Price</span>
                    <span class="choisePropertyNameCB" id="cPNUrl" @click="showChoiseInfoBlock($event)" v-bind:style="{color: choisePropertyNameCB === 'Url' ? 'green' : 'red'}">Url</span>
                    <span class="choisePropertyNameCB" id="cPNPlayers" @click="showChoiseInfoBlock($event)" v-bind:style="{color: choisePropertyNameCB === 'Players' ? 'green' : 'red'}">Players</span>
                    <span class="choisePropertyNameCB" id="cPNTime" @click="showChoiseInfoBlock($event)" v-bind:style="{color: choisePropertyNameCB === 'Time' ? 'green' : 'red'}">Time</span>
                    <span class="choisePropertyNameCB" id="cPNAge" @click="showChoiseInfoBlock($event)" v-bind:style="{color: choisePropertyNameCB === 'Age' ? 'green' : 'red'}">Age</span>
                    <span class="choisePropertyNameCB" id="cPNSales" @click="showChoiseInfoBlock($event)" v-bind:style="{color: choisePropertyNameCB === 'Sales' ? 'green' : 'red'}">Sales</span>
                    <span class="choisePropertyNameCB" id="cPNTags" @click="showChoiseInfoBlock($event)" v-bind:style="{color: choisePropertyNameCB === 'GoodTag' ? 'green' : 'red'}">GoodTag</span>
                    <span class="choisePropertyNameCB" id="cPNInfo" @click="showChoiseInfoBlock($event)" v-bind:style="{color: choisePropertyNameCB === 'Info' ? 'green' : 'red'}">Info</span>
                </div>
                <div class="choiseInfoBlock" v-if="choisePropertyNameCB === 'Name'">
                    <input type="text" class="changeProperty" v-model="findedGood.name">
                </div>
                <div class="choiseInfoBlock" v-if="choisePropertyNameCB === 'Price'">
                    <input type="text" class="changeProperty" v-model="findedGood.price">
                </div>
                <div class="choiseInfoBlock" v-if="choisePropertyNameCB === 'Url'">
                    <input type="text" class="changeProperty" v-model="findedGood.url">
                </div>
                <div class="choiseInfoBlock" v-if="choisePropertyNameCB === 'Players'">
                    <input type="text" class="changeProperty" v-model="findedGood.players">
                </div>
                <div class="choiseInfoBlock" v-if="choisePropertyNameCB === 'Time'">
                    <input type="text" class="changeProperty" v-model="findedGood.time">
                </div>
                <div class="choiseInfoBlock" v-if="choisePropertyNameCB === 'Age'">
                    <input type="text" class="changeProperty" v-model="findedGood.age">
                </div>
                <div class="choiseInfoBlock" v-if="choisePropertyNameCB === 'Sales'">
                    <input type="text" class="changeProperty" v-model="findedGood.sales">
                </div>
                <div class="choiseInfoBlock" v-if="choisePropertyNameCB === 'GoodTag'">
                    <input type="text" class="changeProperty" v-model="findedGoodTags">
                </div>
                <div class="choiseInfoBlock" v-if="choisePropertyNameCB === 'Info'">
                    <textarea class="changePropertyTA" v-model="findedGood.info"></textarea>
                </div>
                <div class="choiseBtns">
                    <ButtonFile class="choiseBtn acceptBtn" @click="putOldGood()">Accept</ButtonFile>
                    <ButtonFile class="choiseBtn cancelBtn" @click="cancelPost()">Cancel</ButtonFile>    
                </div>
            </div>
            <div class="choiseBlock" v-if="delGood">
                <div class="choiseIdForEditBlock">
                    <span class="choiseBlockName">You want to delete an existing good. Choose id</span>
                    <input type="text" required class="spanInputChoiseId" v-model="editId">
                </div>
                <span class="notFindedInfo" v-if="idFind === false">Good with identifier {{ editId }} not find.</span>
                <span class="findedInfo" v-else-if="idFind">Good with identifier {{ editId }} finded.</span>
                <div class="choiseInfoBlock">
                    <p class="choiseInfo">
                        Are you sure you want to add a new good, with name: <span class="choiseInfoColoredSpan">{{ findedGood.name }}</span> , price: <span class="choiseInfoColoredSpan">{{ findedGood.price }}</span> ₽.<br>
                        Characteristics: for children: over <span class="choiseInfoColoredSpan">{{ findedGood.age }}</span> years old, playing time: from <span class="choiseInfoColoredSpan">{{ findedGood.time }}</span> minutes, maximum number of players: <span class="choiseInfoColoredSpan">{{ findedGood.players }}</span> people.<br>
                        Good image placement address: <span class="choiseInfoColoredSpan">{{ findedGood.url }}</span>.<br>
                    </p>
                </div>
                <div class="choiseBtns">
                    <ButtonFile class="choiseBtn acceptBtn" @click="delOldGood()">Accept</ButtonFile>
                    <ButtonFile class="choiseBtn cancelBtn" @click="cancelPost()">Cancel</ButtonFile>    
                </div>
            </div>
        </div> 
</template>

<script>
    import ButtonFile from '../components/button-file.vue'
    import { mapActions, mapGetters } from 'vuex'
    import axios from 'axios'
    import TabletopFile from "../components/tabletop-file.vue";
    export default {
    name: 'AdminPannelFile',
    components: {
        ButtonFile,
        TabletopFile
    },
    data() {
        return {
            choisePropertyNameCB: '',
            findedGoodTags: [],
            findedGood: {},
            idFind: false,
            editId: '',
            postGood: false,
            putGood: false,
            delGood: false,
            showAcceptBlock: false,
            goodTags: '',
            newGood: {
                url: '',
                price: '',
                id: '',
                name: '',
                goodTag: [],
                players: '',
                time: '',
                age: '',
                sales: '',
                info: '',
            },
            transofmTags: ''
        }
    },
    computed: {
        ...mapGetters([
                'GETGOODS'
            ]),
    },
    methods: {
        ...mapActions (['POSTNEWGOOD', 'GETGOODSSFROMAPI']),
        showAcceptedBlock() {
            this.transofmTags = this.newGood.goodTag.join()
            this.showAcceptBlock = !this.showAcceptBlock
        },
        addTag(goodTags) {
            if (goodTags === '') {
                alert('Enter tag name')
            }
            else {
                this.newGood.goodTag.push(goodTags)
                this.goodTags = ''
            }
        },
        deleteAllTags() {
            this.newGood.goodTag = []
        },
        postNewGood() {
            if (this.newGood.players === '') {
                delete this.newGood.players
            }
            if (this.newGood.time === '') {
                delete this.newGood.time
            }
            if (this.newGood.sales === '') {
                delete this.newGood.sales
            }
            axios('http://localhost:3000/Goods' , {
                method: "POST",
                data: {
                    url: this.newGood.url,
                    price: Number(this.newGood.price),
                    id: Number(this.newGood.id),
                    name: this.newGood.name,
                    goodTag: this.newGood.goodTag,
                    players: Number(this.newGood.players),
                    time: Number(this.newGood.time),
                    age: Number(this.newGood.age),
                    sales: Number(this.newGood.sales),
                    info: this.newGood.info
                }
            })
            this.showAcceptBlock = !this.showAcceptBlock
            this.postGood = false
            this.putGood = false
            this.delGood = false
            this.idFind = false
            .then((response) =>{
                console.log(response)
            })
            .catch((error) => {
                console.log(error)
            })
        },
        putOldGood() {
            let gid = null
            gid = Number(this.editId)
            if (this.findedGood.sales === '') {
                this.findedGood.price = this.findedGood.oldPrice
                delete this.findedGood.sales
                delete this.findedGood.oldPrice
            }
            if (this.findedGood.players) {
                this.findedGood.players = Number(this.findedGood.players)
            }
            if (this.findedGood.time) {
                this.findedGood.time = Number(this.findedGood.time)
            }
            if (this.findedGood.sales) {
                this.findedGood.sales = Number(this.findedGood.sales)
            }
            this.findedGood.age = Number(this.findedGood.age)
            this.findedGood.price = Number(this.findedGood.price)
            this.findedGood.goodTag = this.findedGoodTags.split(" ")
            axios('http://localhost:3000/Goods/' + gid, {
                method: "PUT",
                data: this.findedGood
            })
            this.showAcceptBlock = !this.showAcceptBlock
            this.postGood = false
            this.putGood = false
            this.delGood = false
            this.idFind = false
        },
        delOldGood() {
            let gid = null
            gid = Number(this.editId)
            axios('http://localhost:3000/Goods/' + gid, {
                method: "DELETE"
            })
            this.showAcceptBlock = !this.showAcceptBlock
            this.postGood = false
            this.putGood = false
            this.delGood = false
            this.idFind = false
        },
        cancelPost() {
            this.showAcceptBlock = !this.showAcceptBlock
            this.postGood = false
            this.putGood = false
            this.delGood = false
            this.idFind = false
        },
        showChoiseInfoBlock($event) {
            this.choisePropertyNameCB = $event.target.innerText
        }
    },
    watch: {
        editId() {
            this.idFind = false
            this.findedGood = {}
            this.GETGOODS.find(element => {
                if (element.id == Number(this.editId)) {
                    this.idFind = true
                    this.findedGood = element
                    this.findedGoodTags = this.findedGood.goodTag.join(' ')
                }
            })
        },
    },
    mounted() {
        this.GETGOODSSFROMAPI()
    }
}
</script>

<style lang="scss">
    $apf-inp-h: 30px;
    $apf-inp-lh: 30px;
    $apf-inp-fz: 16px;

    .AdminPannelFile {
    width: 100vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    }
    .fakeTableTop {
    width: 100vw;
    height: 80px;
    background-color: black;
    }   
    .addedNewGoodBG {
        width: 820px;
        height: 360px;
        margin-top: 30px;
        background-color: white;
        display: flex;
        justify-content: center;
        align-items: center;
        box-shadow: 0px 3px 5px black;
    }
    .adminPannelFileAddNewGood {
        width: 800px;
        height: 340px;
        display: flex;
        flex-wrap: wrap;
        background-color: white;
    }
    .inputUrl {
        width: 800px;
        display: flex;
        height: $apf-inp-h;
        line-height: $apf-inp-lh;
        font-size: $apf-inp-fz;
    }
    .spanInputUrl {
        width: 100px;
        height: $apf-inp-h;
        font-size: $apf-inp-fz;
    }
    .inputUrlText {
        width: 700px;
        height: $apf-inp-h;
    }
    .miniInputs {
        width: 270px;
        margin-top: 30px;
        display: flex;
        flex-direction: column;
    }
    .inputMiniBlock {
        width: 250px;
        display: flex;
        margin-top: 10px;
        height: $apf-inp-h;
        line-height: $apf-inp-lh;
        font-size: $apf-inp-fz;
    }
    .inputText {
        width: 100px;
    }
    .inputSpan {
        width: 150px;
        height: $apf-inp-h;
        line-height: $apf-inp-lh;
        font-size: $apf-inp-fz;
        margin-left: 20px;
    }
    .maxiInputs {
        width: 500px;
        margin-top: 30px;
        margin-left: 30px;
        display: flex;
        flex-direction: column;
    }
    .inputMaxiBlockInfo {
        display: flex;
        flex-direction: column;
        height: 210px;
        width: 500px;
    }
    .inputTextArea {
        width: 500px;
        height: 180px;
        font-size: 10px;
        line-height: 18px;
        resize: both;
    }
    .inputMaxiBlockTags {
        width: 500px;
        height: 60px;
        margin-top: 10px;
        display: flex;
        flex-direction: column;
    }
    .spnAndBtns {
        display: flex;
    }
    .addTags {
        width: 350px;
        height: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
    }
    .inputGoodTagText {
        width: 500px;
        height: $apf-inp-h;
        line-height: $apf-inp-lh;
        font-size: $apf-inp-fz;
    }
    .choisePostPutDel {
        display: flex;
        justify-content: center;
        margin-top: 30px;
    }
    .actionBtn {
        margin: 0px 10px 0px 10px;
        transition-property: none;
    }
    .postBtn {
        background-color: green;
        box-shadow: 2px 2px 5px 0 solid black;
    }
    .putBtn {
        background-color: orange;
        box-shadow: 2px 2px 5px 0 solid black;
    }
    .delBtn {
        background-color: red;
        box-shadow: 2px 2px 5px 0 solid black;
    }
    .postBtn:hover {
        background-color: rgb(0, 167, 0);
        box-shadow: 4px 4px 8px 0 solid black;
    }
    .putBtn:hover {
        background-color: rgb(255, 181, 45);
        box-shadow: 4px 4px 8px 0 solid black;
    }
    .delBtn:hover {
        background-color: rgb(255, 39, 39);
        box-shadow: 4px 4px 8px 0 solid black;
    }
    .choiseBG {
        width: 100vw;
        height: 100vh;
        display: flex;
        position: absolute;
        justify-content: center;
        align-items: center;
        position: absolute;
        left: 0;
        top: 0;
        background-color: rgba(0, 0, 0, 0.5);
        visibility: hidden;
    }
    .showAcceptBlock {
        visibility: visible;
    }
    .choiseBlock {
        width: 800px;
        background-color: white;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .choiseBlockName {
        height: 50px;
        line-height: 50px;
        width: 600px;
        font-size: 24px;
        margin-top: 30px;
        display: flex;
        justify-content: center;
    }
    .choiseInfoBlock {
        margin-top: 10px;
        width: 800px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .choiseInfo {
        width: 700px;
        height: 90%;
        font-size: 16px;
    }
    .choiseInfoColoredSpan {
        color: red;
        font-size: 16px;
    }
    .choiseBtns {
        margin-bottom: 30px;
    }
    .choiseBtn {
        transition-property: none;
        margin: 0 10px 0 10px;
    }
    .acceptBtn {
        background-color: green;
    }
    .cancelBtn {
        background-color: red;
    }
    .acceptBtn:hover {
        background-color: rgb(0, 167, 0);
    }
    .cancelBtn:hover {
        background-color: rgb(255, 39, 39);
    }


    .choiseIdForEditBlock {
        display: flex;
        justify-content: center;
        height: 80px;
    }
    .spanInputChoiseId {
        height: 50px;
        line-height: 50px;
        width: 100px;
        font-size: 24px;
        margin-top: 30px;
    }
    .notFindedInfo {
        color: red;
    }
    .findedInfo {
        color: green;
    }
    .choiseProperty {
        display: flex;
        width: 800px;
        height: 30px;
        justify-content: space-around;
    }
    .choisePropertyNameCB {
        width: 100px;
        height: 30px;
        line-height: 30px;
        font-size: 16px;
        text-align: center;
        cursor: pointer;
        color: red;
    }
    .changeProperty {
        height: $apf-inp-h;
        line-height: $apf-inp-lh;
        font-size: $apf-inp-fz;
        width: 700px;
    }
    .changePropertyTA {
        width: 500px;
        height: 180px;
        font-size: 10px;
        line-height: 18px;
        resize: both;
    }










    .inputBtn {
        margin-left: 5px;
        transition-property: all;
        transition: 0.15s;
    }
    .inputBtn:hover {
        background-color: whitesmoke;
        box-shadow: 1px 1px 3px 0 black;
    }
    .inputBtn:active {
        background-color: rgba(130, 125, 209);
        box-shadow: 0px 0px 5px 0 black;
    }
</style>