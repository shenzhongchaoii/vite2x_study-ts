// 全局引入element3

// 完整加载
import { App } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'

// 按需加载
// import { ElButton, ElInput } from 'element-plus'
// import 'element-plus/lib/theme-chalk/el-button.css'
// import 'element-plus/lib/theme-chalk/el-input.css'

export default function (app: App) {
  // 完整引入
  app.use(ElementPlus)

  // 按需引入
  // app.use(ElButton).use(ElInput).use(ElIcon)
}