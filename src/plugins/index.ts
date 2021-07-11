import { App } from 'vue'

// 加载插件
export default function (app: App): void {
  const plugins = import.meta.globEager('./*.ts')
  for (const path in plugins) {
    plugins[path].default(app)
  }
}