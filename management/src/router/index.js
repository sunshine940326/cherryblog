import Vue from 'vue'
import Router from 'vue-router'
const _import = require('./_import_' + process.env.NODE_ENV)

Vue.use(Router)

export const constantRouterMap = [
  {
    path: '/login',
    component: _import('login/index'),
    hidden: false,
    meta: { title: '一级目录', icon: 'el-icon-menu' },
    children: [
      {
        path: 'login2',
        name: 'login2',
        hidden: false,
        component: _import('dashboard/index'),
        meta: { title: '二级目录-0', icon: 'el-icon-menu' }
      },
      {
        path: 'login3',
        name: 'login3',
        hidden: true,
        component: _import('dashboard/index'),
        meta: { title: '二级目录-1', icon: 'el-icon-menu' }
      },
      {
        path: 'login4',
        name: 'login4',
        hidden: false,
        component: _import('dashboard/index'),
        meta: { title: '二级目录-2', icon: 'el-icon-menu' }
      }
    ]
  },
  {
    path: '/404',
    component: _import('404/index'),
    hidden: false,
    meta: { title: '404', icon: 'el-icon-edit' }
  },
  {
    path: '/',
    name: 'dashboard',
    component: _import('dashboard/index'),
    hidden: false,
    meta: { title: '首页', icon: 'el-icon-share' }
  },
  {
    path: '/icon',
    component: _import('icon/index'),
    hidden: false,
    meta: { title: 'icons', icon: 'el-icon-delete' }
  }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
