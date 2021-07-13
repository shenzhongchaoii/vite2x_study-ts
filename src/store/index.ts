import { createStore, createLogger, Store } from 'vuex'
import { store as roles, RolesState } from './modules/roles'
import { store as views,  ViewsState} from './modules/views'

const debug: boolean = import.meta.env.VITE_BASE_API !== 'production'

export interface RootState {
  roles: RolesState,
  views: ViewsState
}

export const store: Store<any> = createStore({
  plugins: debug ? [createLogger()] : [],
  modules: {
    roles,
    views,
  }
})

export function useStore(): Store<any> {
  return store
}