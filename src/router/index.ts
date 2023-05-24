import Vue from 'vue'
import type { Route, RouteConfig } from 'vue-router'
import VueRouter from 'vue-router'
import NotFound from '@/views/NotFound.vue'
// import Tour from '@/views/Tour.vue'
Vue.use(VueRouter)

export const routes: RouteConfig[] = [
  {
    path: '/',
    name: 'VTourLayout',
    component: () => import('@/views/Home.vue'),
  },
  {
    path: '/:path(.*)',
    name: 'NotFound',
    component: NotFound,
  },
]

const router = new VueRouter({
  base: '/',
  mode: 'history',
  routes,
})

export default router
