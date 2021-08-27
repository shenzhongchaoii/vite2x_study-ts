<!-- 右侧主要内容  -->
<template>
  <section>
    <div>
      <!-- 内部应该显示子路由页面信息 -->
      <router-view  v-slot="{ Component }">
        <!-- router-view中嵌套一个动画路由组件 -->
        <transition 
          name="fade-transform"
          mode="out-in"
        >
          <!-- 缓存 -->
          <!-- <keep-alive :include="cachedViews"> -->
            <component :is="Component" />
          <!-- </keep-alive> -->
        </transition>
      </router-view>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { ref, computed, watch } from 'vue'
import { useStore } from 'store'

const store = useStore()
let cachedViews = computed(() => store.state.views.allVisitedViews)
</script>

<style lang="scss" scoped>
section div {
  padding: 2rem 1.5rem 2rem 1rem;
}
</style>