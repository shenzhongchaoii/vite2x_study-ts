import { App } from 'vue'

// 方法1：正则获取文件路径中文件名，组件同名
function getComponentName1(path: string): string|false  {
  const reg: RegExp = /(?<=\.\.\/components\/).+(?=\.vue)/
  const res: any = path.match(reg)
  if (res.length) {
    return res[0]
  }
  return false
}

// 方法2：正则替换
function getComponentName2(path: string): string {
  return path.replace(/^\.\.\/components\/|\.vue$/g, '')
}

export default function (app: App): void {
  // 直接加载
  // 完整引入
  // const components = import.meta.globEager('../components/*.vue')
  // for (const path in components) {
  //   const name = getComponentName2(path)
  //   const mod = components[path]
  //   app.component(name, mod.default)
  // }
  // 按需引入
  // let components = import.meta.globEager('../components/*.vue')
  // for (const path in components) {
  //   components[getComponentName2(path)] = components[path].default
  //   delete components[path]
  // }
  // const { HelloWorld }  = { ...components }
  // app.component('HelloWorld', HelloWorld)

  
  // 懒加载
  // 完整引入
  const components = import.meta.glob('../components/*.vue')
  for (const path in components) {
    components[path]().then((mod) => {
      const name = getComponentName2(path)
      app.component(name, mod.default)
    })
  }
  // 按需引入
  // let components = import.meta.glob('../components/*.vue')
  
  // for (const path in components) {
  //   components[getComponentName2(path)] = components[path]
  //   delete components[path]
  // }
  // const { HelloWorld, Test }  = { ...components }
  // const loadOnDemand = (name, component) => {
  //   component().then((mod) => {
  //     app.component(name, mod.default)
  //   })
  // }
  // loadOnDemand('HelloWorld', HelloWorld)
  // loadOnDemand('Test', Test)
}