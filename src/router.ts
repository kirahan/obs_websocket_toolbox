
import { createRouter, createWebHistory,createWebHashHistory, RouteRecordRaw } from 'vue-router';
import Main from './pages/Main/index.vue'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: "Index",
        component: Main
    },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
