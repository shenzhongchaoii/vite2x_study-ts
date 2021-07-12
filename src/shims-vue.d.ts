/* eslint-disable */
declare module '*.vue' {
  import { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module 'apis'
declare module 'components'
declare module 'layouts'
declare module 'mixins'
declare module 'plugins'
declare module 'router'
declare module 'store'
declare module 'styles'
declare module 'utils'
declare module 'views'
