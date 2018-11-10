<template>
  <el-menu mode="vertical" :default-active="$route.path" background-color="#304156" text-color="#bfcbd9" active-text-color="#409EFF">
    <sidebar-item v-for="route in permission_routers" :key="route.name" :item="route" :base-path="route.path"></sidebar-item>
  </el-menu>
</template>
<script>
import sidebarItem from './sidebar-item/sidebar-item'
import { mapGetters } from 'vuex'

export default {
  name: 'sidebar',
  components: { sidebarItem },
  methods: {
    handleNodeClick (data) {
      console.log(data)
    }
  },
  computed: {
    ...mapGetters([
      'permission_routers'
    ])
  },
  created () {
    console.log('this.permission_routers', this.permission_routers)
  }
}
</script>
<style lang="sass" scoped>
.el-menu
  height: 100%
  overflow: hidden
</style>
