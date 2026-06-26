import { createRouter, createWebHistory } from 'vue-router'
import Main from './pages/Main/index.vue'
import Debug from './pages/Debug/index.vue'
import Controller from './pages/Controller/index.vue'
import Simulator from './pages/Simulator/index.vue'
import BatchRunner from './pages/BatchRunner/index.vue'
import EventMonitor from './pages/EventMonitor/index.vue'
import CodeGenerator from './pages/CodeGenerator/index.vue'
import VendorExplorer from './pages/VendorExplorer/index.vue'

const routes = [
  { path: '/', component: Main },
  { path: '/debug', component: Debug },
  { path: '/controller', component: Controller },
  { path: '/simulator', component: Simulator },
  { path: '/batch-runner', component: BatchRunner },
  { path: '/event-monitor', component: EventMonitor },
  { path: '/code-generator', component: CodeGenerator },
  { path: '/vendor-explorer', component: VendorExplorer },
]

const router = createRouter({
  history: createWebHistory('/obs_websocket_toolbox/'),
  routes,
})

export default router
