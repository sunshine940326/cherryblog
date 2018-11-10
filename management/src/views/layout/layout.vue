<template>
  <div>
    <div class="app-wrapper" >
      <side-bar class="sidebar-container"></side-bar>
      <div class="main-container">
        <nav-bar class="navbar-container"></nav-bar>
        <app-main class="app-main-container"></app-main>
      </div>
    </div>
  </div>
</template>
<script>
import { sideBar, navBar, appMain } from './components/index'
export default{
  name: 'dashboard',
  components: {
    navBar,
    sideBar,
    appMain
  }
}
</script>
<style lang="sass" scoped>
.app-wrapper
  display: flex
  height: 100%
  .sidebar-container
    width: 180px !important
    height: 100%
    // background: #333
    transition: width 0.28s
    .el-menu
      height: 100%
  .main-container
    flex-grow: 1
    .navbar-container
      display: flex
      align-items: center
      padding-left: 20px
      // background: pink
      height: 50px
      line-height: 50px
      border-bottom: solid 1px #e6e6e6
    .app-main-container
      // background: blue
      height: calc(100% - 50px)
</style>
