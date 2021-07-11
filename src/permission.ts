import router from './router'
import { useStore } from './store'
import { ActionTypes } from './store/modules/roles/action-types'

const store = useStore()

router.beforeEach((to: {}, from, next) => {
  const localUser = localStorage.getItem('user')
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
      store.dispatch(ActionTypes.SET_MENUS).then((res) => {
        next({ path: to.path })
      })
    } else {
      next()
    }
  }
})