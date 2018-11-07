import Vue from 'vue'
import Router from 'vue-router'
import dashboard from '@/views/dashboard'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: dashboard
    }
  ]
})
