import { createApp } from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import { store } from './store/store'
import router from './router/router'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import './assets/css/styles.scss'



const app = createApp(App)
app.use(Antd)
app.use(store)
app.use(Vuex)
app.use(router)
app.mount('#app')
