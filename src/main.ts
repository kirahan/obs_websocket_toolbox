import { createApp } from 'vue'
import './style.scss'
import App from './App.vue'
import router from './router'
import VueI18n from './locales'
import 'ant-design-vue/dist/reset.css';


createApp(App).use(router).use(VueI18n).mount('#app')
