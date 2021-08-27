// 右侧导航内容
<template>
  <header class="navbar">
    <div class="navbar-left">
      <router-link :to="{ path: '/' }"><img src="/src/assets/logo.svg" alt="Vite2.x study" class="logo" />
        <span>Vite2.x study</span>
      </router-link>
    </div>
    <div class="navbar-right">
      <el-dropdown placement="bottom-end">
        <div class="el-dropdown-link">
          <img
            class="avator"
            src="/src/assets/avator.png"
            style="border-radius:50%;border:1px solid #e6e6e6"
          />
          <i class="el-icon-caret-bottom el-icon--right"></i>
        </div>
        <template #dropdown>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>用户信息</el-dropdown-item>
            <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </header>
</template>

<script lang="ts" setup>
import { Store } from 'vuex'
import router from 'router'
import { useStore } from 'store'
import { ActionTypes } from 'store/modules/roles/action-types'


const store: Store<any> = useStore()
const logout = () => {
  store.commit(ActionTypes.LOGIN_OUT)
  console.log('logout')
  router.push('/login')
}
</script>

<style lang="scss" scoped>
.navbar {
  img {
    vertical-align: top;
    display: inline-block;
  }

  .navbar-left {
    position: fixed;
    width: 19rem;
    text-align: left;
    padding-left: 1rem;

    .logo {
      height: 2.2rem;
      min-width: 2.2rem;
      margin-right: 0.5rem;
    }

    span {
      font-weight: 500;
      font-size: 1.5rem;
      color: rgb(59, 59, 59);
      display: inline-block;
    }
  }

  .navbar-right {
    position: fixed;
    top: 0px;
    right: 30px;

    .el-dropdown-link {
      height: 2.2rem;
      line-height: 2.2rem !important;
      vertical-align: top;
      display: inline-block;

      .avator {
        width: 1.8rem;
        height: 1.8rem;
      }
    }
  }
}
</style>