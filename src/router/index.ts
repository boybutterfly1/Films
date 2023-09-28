import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Catalog from '@/pages/Catalog.vue'
import Main from '@/pages/Main.vue'
import CurrentPage from '@/pages/CurrentPage.vue'

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
  {
    path: '/page/:currentPage',
    name: 'page',
    component: CurrentPage
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
