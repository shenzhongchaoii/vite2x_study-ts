import { createApp } from 'vue'
import App from './App.vue'

// 路由
import router from './router'
// vuex
import { store } from './store'

// 全局样式
import 'styles/index.scss'

// 引入插件
import plugins from 'plugins'

import './permission.ts'

const app = createApp(App)
app.use(router).use(store).use(plugins).mount('#app')
