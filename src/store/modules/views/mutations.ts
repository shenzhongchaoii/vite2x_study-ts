import { MutationTree } from 'vuex'
import { ViewsState, CurrentVisitedView } from './state'
import { MutationTypes } from './mutation-types'


export type Mutations<S= ViewsState> =  {
  [MutationTypes.ADD_VISITED_VIEWS](state: S, currentView: CurrentVisitedView): void;
  [MutationTypes.ADD_VISITED_VIEW](state: S, currentView: CurrentVisitedView): void;
}

export const mutations: MutationTree<ViewsState> &  Mutations= {
  [MutationTypes.ADD_VISITED_VIEWS](state, currentView) {
    const index = state.allVisitedViews.indexOf(currentView)
    if (index > -1) {
      state.allVisitedViews.splice(index, 1)
    }
    state.allVisitedViews.push(currentView)
  },

  [MutationTypes.ADD_VISITED_VIEW](state, currentView) {
    state.currentVisitedView = currentView
  }
}

