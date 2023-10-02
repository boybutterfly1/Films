import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Catalog from '@/pages/Catalog.vue'
import Main from '@/pages/Main.vue'
import CurrentPage from '@/pages/CurrentPage.vue'
import FilmDetailsPage from "@/pages/FilmDetailsPage.vue";
import UserPage from "@/pages/UserPage.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'main',
    component: Main
  },
  // {
  //   path: '/catalog',
  //   name: 'catalog',
  //   component: Catalog
  // },
  {
    path: '/catalog/page/:currentPage',
    name: 'page',
    component: CurrentPage
  },
  {
    path: '/film/:id',
    name: 'filmDetails',
    component: FilmDetailsPage
  },
  {
    path: '/user/:id',
    name: 'userPage',
    component: UserPage
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router