import { createApp } from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import { store } from './store/store'
import router from './router/router'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import './assets/css/styles.scss';
import AOS from "aos";
import "aos/dist/aos.css";



const app = createApp(App)
AOS.init()
app.use(AOS)
app.use(Antd)
app.use(store)
app.use(Vuex)
app.use(router)
app.mount('#app')
