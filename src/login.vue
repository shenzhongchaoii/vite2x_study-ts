<template>
  <div class="app">
    <h1>login页面</h1>
    <div>
      <el-button @click="login">登录</el-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Store } from 'vuex'
import router from 'router'
import { useStore } from 'store'
import { ActionTypes } from 'store/modules/roles/action-types'
import { ElMessage } from 'element-plus'


const store: Store<any> = useStore()

store.commit(ActionTypes.LOGIN_OUT)

const loginForm: { username: string, password: string } = {
  username: 'username',
  password: 'password'
}
const login = () => {
  store.dispatch(ActionTypes.LOGIN_IN, loginForm).then(() => {
    ElMessage({
      type: 'success',
      message: '登录成功',
      duration: 1500,
      onClose: () => {
        router.replace('/')
      }
    })
  })
}
</script>

<style lang="scss" scoped>
.app {
  padding-top: 25vh;
}
</style>