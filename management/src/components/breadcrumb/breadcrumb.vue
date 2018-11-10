<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item,index) in levelList" :key="index" v-if="item.meta.title">
        <span v-if="item.redirect==='noredirect'||index==levelList.length-1" class="no-redirect">{{item.meta.title}}</span>
        <router-link v-else :to="item.redirect||item.path">{{item.meta.title}}</router-link>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>
<script>
export default {
  name: 'breadcrumb',
  data () {
    return {
      levelList: []
    }
  },
  watch: {
    $route  () {
      this.getBreadcrumb()
    }
  },
  methods: {
    getBreadcrumb () {
      let matched = this.$route.matched.filter(item => item.meta.title)
      const first = matched[0]
      if (first && first.meta.title !== '首页') {
        matched = [{ path: '/dashboard', meta: { title: '首页' } }].concat(
          matched
        )
      }
      return (this.levelList = matched)
    }
  },
  created () {
    this.getBreadcrumb()
  }
}
</script>
<style lang="sass" scoped>
.breadcrumb-enter-active,
.breadcrumb-leave-active 
  transition: all .5s
.breadcrumb-enter,
.breadcrumb-leave-active 
  opacity: 0
  transform: translateX(20px)
.breadcrumb-move 
  transition: all .5s
.breadcrumb-leave-active 
  position: absolute
</style>
