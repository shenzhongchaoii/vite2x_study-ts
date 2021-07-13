<template>
  <div>
    <router-link :to="{ name: 'detail', params: { id: id } }">具体详情</router-link>
    <HelloWorld v-if="id" v-model:id="id" @update:id="update" />
  </div>
</template>

<script lang="ts">
import setComponetName from 'mixins/setComponetName'
export default setComponetName(location.hash)
</script>
<script lang="ts" setup>
import { provide, ref, computed, watch, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

onMounted(() => {
  console.log('onMounted')
})

const router = useRouter()
const route = useRoute()

let id = ref(1008611)

provide('provideID', id)

const update = () => {
  id.value ++
}

watch(id, val => {
  console.log('home val', val)
  router.push({ name: 'detail', params: { id: val }})
})

</script>

<style scoped>

</style>