import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/sheet',
    name: 'Hoja de personaje',
    component: () => import('../views/Sheet.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
