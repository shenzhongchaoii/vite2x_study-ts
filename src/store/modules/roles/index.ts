import { Store, CommitOptions, DispatchOptions, Module } from 'vuex'
import { RootState } from '../..'

import { state } from './state'
import type { RolesState } from './state'
import { mutations, Mutations } from './mutations'
import { actions, Actions } from './actions'

export { RolesState }

export type RolesStore<S = RolesState> = Omit<Store<S>, 'getters' | 'commit' | 'dispatch'>
& {
  commit<K extends keyof Mutations, P extends Parameters<Mutations[K]>[1]>(
    key: K,
    payload: P,
    options?: CommitOptions
  ): ReturnType<Mutations[K]>
} & {
  dispatch<K extends keyof Actions>(
    key: K,
    payload: Parameters<Actions[K]>[1],
    options?: DispatchOptions
  ): ReturnType<Actions[K]>
}

export const store: Module<RolesState, RootState> = {
  state,
  mutations,
  actions
}