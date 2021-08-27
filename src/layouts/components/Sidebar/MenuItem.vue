<template>
  <template v-for="item in menuList" :key="item.name">
    <el-menu-item
      v-if="!item.children && !item.hidden || (item.children && allChildrenHidden(item.children))"
      :index="'home'"
    >
      <Item :icon="item.meta.icon" :title="item.meta.title"/>
    </el-menu-item>
    <el-submenu v-else-if="item.children && !item.hidden" :index="resolvePath(item.path)">
      <template #title>
        <Item :icon="item.meta.icon" :title="item.meta.title"/>
      </template>
      <MenuItem :menu-list="item.children" :base-path="item.path" />
    </el-submenu>
  </template>
</template>

<script lang="ts" setup>
import { defineProps, ref } from 'vue'
import Item from './Item.vue'

const props = defineProps({
  menuList: {
    type: Array,
    default: () => []
  },
  basePath: {
    type: String,
    default: ''
  }
})
const menuList: any = ref(props.menuList)

const resolvePath = (itemPath: string) => {
  return props.basePath && props.basePath != '/' ? `${props.basePath}/${itemPath}` : itemPath
}

const allChildrenHidden = (children: any[]) => {
  const hiddenChildren = children.filter((item: { hidden: any }) => item.hidden)
  return hiddenChildren.length == children.length
}
</script>

<style lang="scss" scoped>
.el-menu-item, .el-submenu {
  text-align: left;
}
</style>