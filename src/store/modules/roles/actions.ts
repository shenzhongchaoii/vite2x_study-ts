import { ActionTree, ActionContext } from 'vuex'

import { RootState } from '../../index'
import { RolesState, Menus, RouteLocationBase } from './state'

import { ActionTypes } from './action-types'
import { MutationTypes } from './mutation-types'

import { Mutations } from './mutations'

import CommonService from 'apis/common'

import router from 'router'


type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1],
  ): ReturnType<Mutations[K]>
} & Omit<ActionContext<RolesState, RootState>, 'commit'>

type NoAugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
  ): ReturnType<Mutations[K]>
} & Omit<ActionContext<RolesState, RootState>, 'commit'>

export interface Actions {
  [ActionTypes.SET_MENUS](
    { commit }: AugmentedActionContext
  ): void
  [ActionTypes.LOGIN_IN](
    { commit }: AugmentedActionContext,
    loginForm: { username: string, password: string }
  ): void
  [ActionTypes.LOGIN_OUT](
    { commit }: NoAugmentedActionContext
  ): void
}

const  handleMenus = (list: Menus) => {
  list.forEach((listItem: RouteLocationBase) => {
    listItem.component = () => import( /* @vite-ignore */ listItem.url)
    if (listItem.children) {
      handleMenus(listItem.children)
    }
  })
}

export const actions: ActionTree<RolesState, RootState> & Actions = {
  async [ActionTypes.SET_MENUS]({ commit }) {
    // 获取后台给的权限菜单数组
    const res = await CommonService.get('/getMenus')
    const menus = res.data
    handleMenus(menus)
    menus.forEach((item: { [key: string]: any }) => {
      router.addRoute(item)
    })
    commit(MutationTypes.SET_MENUS, menus)
  },

  async [ActionTypes.LOGIN_IN]({ commit }, loginForm) {
    const localUser = localStorage.getItem('user')
    let user = null
    if (localUser) {
      user = JSON.parse(localUser)
    } else {
      const res = await CommonService.post('login', loginForm)
      user = res.data
      localStorage.setItem('user', JSON.stringify(user))
    }

    commit(MutationTypes.LOGIN_IN, user)
  },

  async [ActionTypes.LOGIN_OUT]({ commit }) {
    commit(MutationTypes.LOGIN_OUT)
  }
}

