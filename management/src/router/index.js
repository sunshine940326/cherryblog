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
    // 对于只有一级的菜单不设置 meta 信息，面包屑会读取 meta 中的信息生成
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
    meta: { title: '登录', icon: 'el-icon-menu' },
    children: [
      {
        path: '/login',
        component: _import('login/index'),
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
        path: '/404',
        component: _import('404/index'),
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
        path: '/icon',
        component: _import('icon/index'),
        hidden: false,
      }
    ]
  },
  {
    path: '/article',
    component: layout,
    hidden: false,
    name: 'articleList',
    meta: { title: '文章管理', icon: 'el-icon-document' },
    children: [
      {
        path: '/article',
        component: _import('article/index'),
        hidden: false,
        name: 'articleList',
      }
    ]
  },
  {
    path: '/article/edit/:articleId',
    component: layout,
    hidden: true,
    name: 'articleEdit',
    meta: { title: '文章管理', icon: 'el-icon-document' },
    children: [
      {
        path: '/article/edit/:articleId',
        name: 'articleEdit',
        component: _import('article/index'),
        hidden: true,
        meta: { title: '文章编辑' }
      }
    ]
  },
  {
    path: '/article/detail/:articleId',
    component: layout,
    hidden: true,
    name: 'articleDetail',
    meta: { title: '文章管理', icon: 'el-icon-document' },
    children: [
      {
        path: '/article/edit/:articleId',
        name: 'articleDetail',
        component: _import('article/index'),
        hidden: true,
        meta: { title: '文章详情' }
      }
    ]
  },
  {
    path: '/article/create',
    component: layout,
    name: 'articleCreate',
    hidden: true,
    meta: { title: '文章管理', icon: 'el-icon-document' },
    children: [
      {
        path: '/article/create',
        name: 'articleCreate',
        component: _import('article/article-form/article-form'),
        hidden: true,
        meta: { title: '新建文章' }
      }
    ]
  },
  {
    path: '/tag/:tagId',
    component: layout,
    hidden: false,
    meta: { title: '标签管理', icon: 'el-icon-info' },
    children: [
      {
        path: '/tag/:tagId',
        component: _import('tag/index'),
        hidden: false,
      }
    ]
  },
  {
    path: '/classify/:classifiesId',
    component: layout,
    hidden: false,
    meta: { title: '分类管理', icon: 'el-icon-star-on' },
    children: [
      {
        path: '/classify/:classifiesId',
        component: _import('classify/index'),
        hidden: false,
      }
    ]
  }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
