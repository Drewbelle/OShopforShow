export default {
    data() {
        return {
            windowW: ''
        }
    },
    methods: {
        calcWindowW() {
        this.windowW = window.innerWidth
        },
    },
    mounted() {
        this.calcWindowW()
    }
}