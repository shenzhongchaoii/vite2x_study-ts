import { ActionTree, ActionContext } from 'vuex'
import { ActionTypes } from './action-types'
import { RootState } from '../..'
import { ViewsState, CurrentVisitedView } from './state'
import { Mutations } from './mutations'
import { MutationTypes } from './mutation-types'

type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1],
  ): ReturnType<Mutations[K]>
} & Omit<ActionContext<ViewsState, RootState>, 'commit'>

type NoAugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
  ): ReturnType<Mutations[K]>
} & Omit<ActionContext<ViewsState, RootState>, 'commit'>

export interface Actions {
  [ActionTypes.ADD_CACHED_VIEWS](
    { commit }: AugmentedActionContext,
    currentView: CurrentVisitedView
  ): void
}


export const actions: ActionTree<ViewsState, RootState> & Actions = {
  [ActionTypes.ADD_CACHED_VIEWS]({ commit }: AugmentedActionContext, currentView: CurrentVisitedView) {
    commit(MutationTypes.ADD_VISITED_VIEWS, currentView)
    commit(MutationTypes.ADD_VISITED_VIEW, currentView)
  }
}

