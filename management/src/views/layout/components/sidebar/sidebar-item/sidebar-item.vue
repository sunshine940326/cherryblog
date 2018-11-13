<template>
  <div>
    <router-link v-show="!item.hidden" v-if="item.children.length === 1" :to="resolvePath(item.path)">
      <el-menu-item :index="item.path">
        <i v-if="item.meta && item.meta.icon" :class="item.meta.icon"></i>
        <span v-if="item.meta && item.meta.title" slot="title">{{item.meta.title}}</span>
      </el-menu-item>
    </router-link>
    <el-submenu v-else :index="item.name||item.path">
      <template slot="title">
        <i v-if="item.meta && item.meta.icon" :class="item.meta.icon"></i>
        <span v-if="item.meta && item.meta.title" slot="title">{{item.meta.title}}</span>
      </template>

      <template v-for="child in item.children" v-if="!child.hidden">
        <sidebar-item class="nest-menu" v-if="child.children&&child.children.length>0" :item="child" :key="child.path" :base-path="resolvePath(child.path)"></sidebar-item>
        <router-link v-else :to="resolvePath(child.path)" :key="child.name">
          <el-menu-item :index="child.path">
            <span v-if="child.meta&&child.meta.title" slot="title">{{child.meta.title}}</span>
          </el-menu-item>
        </router-link>
      </template>
    </el-submenu>
  </div>
</template>
<script>
import path from 'path'

export default {
  name: 'sidebarItem',
  data () {
    return {
      onlyOneChild: null
    }
  },
  props: {
    // route object
    item: {
      type: Object,
      required: true
    },
    isNest: {
      type: Boolean,
      default: false
    },
    basePath: {
      type: String,
      default: ''
    }
  },
  methods: {
    // hasOneShowingChild (children) {
    //   const showingChildren = children.filter(item => {
    //     if (item.hidden) {
    //       return false
    //     } else {
    //       // temp set(will be used if only has one showing child )
    //       this.onlyOneChild = item
    //       return true
    //     }
    //   })
    //   if (showingChildren.length === 1) {
    //     return true
    //   }
    //   return false
    // },
    resolvePath (...paths) {
      return path.resolve(this.basePath, ...paths)
    }
  },
  created () {
    console.log('item', this.basePath)
  }
}
</script>
