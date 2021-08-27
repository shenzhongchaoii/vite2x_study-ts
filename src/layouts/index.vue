<template>
  <div class="app-wrapper">
    <Navbar class="app-navbar"/>
    <Sidebar class="app-sidebar" />
    
    <div class="app-main" >
      <Breadcrumb />
      <AppMain/>
    </div>
    
  </div>
</template>

<script lang="ts" setup>
import Navbar from './components/Navbar.vue'
import Sidebar from './components/Sidebar/index.vue'
import Breadcrumb from './components/Breadcrumb.vue'
import AppMain from './components/AppMain/index.vue'

</script>

<style lang="scss" scoped>
@import '../styles/mixin.scss';

.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100vh;
  max-width: 100vw;

  .app-navbar {
    padding: .7rem 1.5rem;
    line-height: 2.2rem;

    position: fixed;
    z-index: 20;
    top: 0;
    left: 0;
    right: 0;
    height: 3.6rem;
    background-color: #fff;
    box-sizing: border-box;
    border-bottom: 1.5px solid #e6e6e6;
  }

  .app-sidebar {
    font-size: 16px;
    background-color: #fff;
    width: 19rem;
    position: fixed;
    z-index: 10;
    margin: 0;
    top: 3.6rem;
    left: 0;
    bottom: 0;
    box-sizing: border-box;
    overflow-y: auto;
  }

  .app-main {
    // height: 100%;
    padding-top: 3.6rem;
    padding-bottom: 2rem;
    padding-left: 19rem;
    position: relative;
  }
}
</style>