import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Catalog from '@/pages/Catalog.vue'
import Main from '@/pages/Main.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'main',
    component: Main
  },
  {
    path: '/catalog',
    name: 'catalog',
    component: Catalog
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
