<template>
  <div>
    <div class="app-wrapper" >
      <sidebar class="sidebar-container"></sidebar>
      <div class="main-container">
        <navbar class="navbar-container"></navbar>
        <app-main class="app-main-container"></app-main>
      </div>
    </div>
  </div>
</template>
<script>
import { Sidebar, Navbar, AppMain } from './components/index'
export default{
  name: 'dashboard',
  components: {
    Navbar,
    Sidebar,
    AppMain
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
    background: #333
    transition: width 0.28s
  .main-container
    flex-grow: 1
    .navbar-container
      background: pink
      height: 50px
      line-height: 50px
    .app-main-container
      background: blue
      height: calc(100% - 50px)
</style>
