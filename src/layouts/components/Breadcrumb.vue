<template>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-scrollbar>
      <el-breadcrumb-item
        v-for="(item,index) in levelList"
        :key="item.path"
        :to="{ path: item.path }"
      >
        <span :class="index==levelList.length-1?'active':''">{{ item.meta.title }}</span>
      </el-breadcrumb-item>
    </el-scrollbar>
  </el-breadcrumb>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import type { _RouteLocationBase } from 'vue-router'

const route: _RouteLocationBase = useRoute()

const levelList = computed(() => {
  let matched: Array<{ path: string, meta: { title?: string, name?: string, icon?: string }, [key:string]: any }> = route.matched
  const currentRouteFullPath = route.fullPath

  const topLevel = matched[0]
  if (topLevel.path != '/') {
    matched.unshift({ path: '/home', meta: {title: "首页", name: 'home', icon: "el-icon-s-home"} })
  }
  return matched
})

</script>

<style lang="scss" scoped>
.el-breadcrumb {
  width: 100%;
  position: fixed;
  z-index: 10;
  background: #fff;
  border-bottom: 1px solid #f1f1f1;
  line-height: 3rem;
  text-align: left;

  white-space: nowrap;

  .el-scrollbar {
    padding: 0 1.5rem;

    .el-breadcrumb__item {
      float: none !important;

      span {
        font-weight: normal !important;
      }
      .active {
        color: #409EFF;
        font-weight: 600 !important;
      }
    }
  }
}
</style>