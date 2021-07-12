import { MutationTree } from 'vuex'
import { RolesState, User, Menus } from './state'
import { MutationTypes } from './mutation-types'

export type Mutations<S= RolesState> =  {
  [MutationTypes.SET_MENUS](state: S, menus: Menus): void;
  [MutationTypes.LOGIN_IN](state: S, user: User): void;
  [MutationTypes.LOGIN_OUT](state: S, user: User): void;
}

export const mutations: MutationTree<RolesState> & Mutations = {
  [MutationTypes.SET_MENUS](state, menus) {
    state.menus = menus
  },

  [MutationTypes.LOGIN_IN](state, user) {
    state.user = user
  },
  
  [MutationTypes.LOGIN_OUT](state, user) {
    state.user = {}
    state.menus = []

    localStorage.removeItem('user')
    localStorage.removeItem('menus')
  }
}

