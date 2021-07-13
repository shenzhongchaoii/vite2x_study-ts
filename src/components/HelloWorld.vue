<template>
  <h1>中间propsID----{{ props.id }}</h1>

  <Test v-model:id="props.id" @updateID="$emit('update:id', $event)" />
</template>

<script lang="ts" setup>
import { defineProps, defineEmits, watch } from 'vue'

const props = defineProps({
  id: {
    type: Number,
    default: 0
  }
})
const emit = defineEmits(['update:id'])

watch(() => props.id, val => {
  console.log('helloworld val', val)
})

</script>

<style scoped>

</style>
