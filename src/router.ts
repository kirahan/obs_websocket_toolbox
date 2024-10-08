import { createRouter, createWebHistory } from 'vue-router'
import Main from './pages/Main/index.vue'
import Debug from './pages/Debug/index.vue'
// 导入其他模块组件（当它们被创建时）
import Controller from './pages/Controller/index.vue'
// import Simulator from './pages/Simulator/index.vue'

const routes = [
    { path: '/', component: Main },
    { path: '/debug', component: Debug },
    // 添加其他模块的路由（当它们被创建时）
    { path: '/controller', component: Controller },
    // { path: '/simulator', component: Simulator },
]

const router = createRouter({
    history: createWebHistory('/obs_websocket_toolbox/'),
    routes
})

export default router
