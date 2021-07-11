import { createRouter, createWebHashHistory, Router } from 'vue-router'
// import { useStore } from 'store'

// const store = useStore()

// export const routes = [
//   {
//     path: '/login',
//     component: () => import('../login.vue')
//   }
// ]
const router: Router = createRouter({
  history: createWebHashHistory(),
  // routes: [ ...routes, ...store.state.roles.menus ]
  routes: [
    {
      path: '/',
      redirect: '/home',
      component: () => import('views/home.vue'),
      name: '/',
      meta: { title: '导航', icon: 'el-icon-guide' },
      children: [
        {
          path: '/home',
          component: () => import('views/home.vue'),
          name: 'home',
          meta: { title: '首页', icon: 'el-icon-s-home' }
        }
      ]
    }
  ]
})
export default router