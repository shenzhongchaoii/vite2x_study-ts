// 侧边内容
<template>
  <aside>
    <el-menu
      :default-active="defaultActive"
      unique-opened
      router
      @open="handleOpen"
      @close="handleClose"
    >
      <MenuItem :menu-list="menus" />
    </el-menu>
  </aside>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import type { Ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'store'
import { ActionTypes }  from 'store/modules/views/action-types'
import MenuItem from './MenuItem.vue'
import type { Menus } from '../../../store/modules/roles/state'

const route = useRoute()

const store = useStore()
const menus: Ref<Menus>  = ref(store.state.roles.menus)
console.log('useRouter', useRouter())

let defaultActive = ref(route.path.includes('/home') ? '/' : route.path)
// store.dispatch(ActionTypes.ADD_CACHED_VIEWS, 'home')

function handleOpen(key: string, keyPath: string) {
  console.log('active menu')
  console.log(key, keyPath)
}
function handleClose(key: string, keyPath: string) {
  console.log(key, keyPath)
}

watch(route, val => {
  defaultActive.value = val.path.includes('/home') ? '/' : val.path
  // store.dispatch(ActionTypes.ADD_CACHED_VIEWS, val.name)
})
</script>

<style lang="scss" scoped>
.el-menu {
  height: 100%;
}
</style>