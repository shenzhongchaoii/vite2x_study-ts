import { createRouter, createWebHashHistory, Router } from 'vue-router'
import { useStore } from 'store'

const store = useStore()

export const routes = [
  {
    path: '/login',
    component: () => import('../login.vue')
  }
]

const router: Router = createRouter({
  history: createWebHashHistory(),
  routes: [ ...routes, ...store.state.roles.menus ]
})
export default router
