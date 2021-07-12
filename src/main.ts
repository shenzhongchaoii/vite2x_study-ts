import { createApp } from 'vue'
import App from './App.vue'

import router from 'router'

// 引入插件
import plugins from 'plugins'

import './permission.ts'


createApp(App).use(router).use(plugins).mount('#app')
