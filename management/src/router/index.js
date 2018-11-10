import Vue from 'vue'
import Router from 'vue-router'
import layout from './../views/layout/layout.vue'
const _import = require('./_import_' + process.env.NODE_ENV)

Vue.use(Router)

export const constantRouterMap = [
  {
    path: '/', // path 为路由地址
    name: 'dashboard', // name 为在面包屑中显示的名称
    redirect: '/dashboard', // 在面包屑中是否能直接跳转
    component: layout, // 最外层组件都为 layout，使得可以在主页面 layout 中替换 router-view
    hidden: false,
    meta: { title: '首页', icon: 'el-icon-share' }, // 在左侧 menuTree 中显示的名字和 icon
    // 根据 children 的数量判断当前 menu 是叶子节点还是根节点，
    // 不将所有的 children 都放在 / 下面是因为方便面包屑
    children: [
      {
        path: 'dashboard',
        component: _import('dashboard/dashboard')
      }
    ]
  },
  {
    path: '/login',
    component: layout,
    hidden: false,
    // redirect: 'noredirect',
    meta: { title: '一级目录', icon: 'el-icon-menu' },
    children: [
      {
        path: 'login',
        component: _import('login/index'),
        meta: { title: 'login', icon: 'icon' }
      }
    ]
  },
  {
    path: '/404',
    name: '404',
    component: layout,
    hidden: false,
    meta: { title: '404', icon: 'el-icon-edit' },
    children: [
      {
        path: 'article',
        component: _import('article/index'),
        hidden: false,
        meta: { title: '404article', icon: 'el-icon-edit' }
      },
      {
        path: 'article2',
        component: _import('article2/index'),
        hidden: false,
        meta: { title: '404article2', icon: 'el-icon-delete' }
      }
    ]
  },
  {
    path: '/icon',
    component: layout,
    hidden: false,
    meta: { title: 'icons', icon: 'el-icon-delete' },
    children: [
      {
        path: 'icon',
        component: _import('icon/index'),
        hidden: false,
        meta: { title: 'iconindex', icon: 'el-icon-edit' }
      }
    ]
  }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
