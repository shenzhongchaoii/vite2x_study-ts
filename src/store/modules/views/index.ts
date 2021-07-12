import { Store, CommitOptions, DispatchOptions, Module } from 'vuex'
import type { RootState } from '../..'
import { state } from './state'
import type{ ViewsState } from './state'
import { mutations, Mutations } from './mutations'
import { actions, Actions } from './actions'

export { ViewsState }

export type ViewsStore<S = ViewsState> = Omit<Store<S>, 'getters' | 'commit' | 'dispatch'>
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

export const store: Module<ViewsState, RootState> = {
  state,
  mutations,
  actions
}