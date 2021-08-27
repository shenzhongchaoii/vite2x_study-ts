import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
import { Store } from 'vuex'
import router from './router'
import { useStore } from './store'
import { ActionTypes } from './store/modules/roles/action-types'

const store: Store<any> = useStore()
console.log(router)
router.beforeEach((to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
  const localUser: any = localStorage.getItem('user')
  const user = JSON.parse(localUser)

  if (!localUser || (localUser && !user.authorization)) {
    if (to.path == '/login') {
      next()
    } else {
      next({
        path: '/login'
      })
    }
  } else {
    if (store.state.roles.menus.length === 0) {
      store.dispatch(ActionTypes.SET_MENUS).then(() => {
        console.log('to', to)
        next({ path: to.path })
      })
    } else {
      next()
    }
  }
})