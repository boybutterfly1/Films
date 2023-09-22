import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Catalog from '@/pages/Catalog.vue'

const routes: Array<RouteRecordRaw> = [
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
