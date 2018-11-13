<template>
  <div>
    <section class="app-main">
      <transition name="fade-transform" mode="out-in">
        <router-view></router-view>
      </transition>
    </section>
  </div>
</template>
<script>
export default {
  name: 'appMain'
}
</script>
<style lang="sass" scoped>
.app-main
  min-height: calc(100vh - 84px)
  position: relative
  overflow: scroll
  padding: 20px
</style>
