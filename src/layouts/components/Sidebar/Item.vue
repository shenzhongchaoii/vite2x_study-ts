<template>
  <i v-if="icon" class="sub-el-icon" :class="icon"></i>
  <span v-if="title">{{ title }}</span>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'

defineProps({
  icon: {
    type: String,
    default: ''
  },
  title: {
    type: String,
    default: ''
  }
})

</script>

<style lang="scss" scoped>
.sub-el-icon {
  width: 1rem;
  height: 1rem;
  padding: 0 0.5rem;
}
</style>