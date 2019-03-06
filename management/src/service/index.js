import Vue from 'vue'
import axios from 'axios'
import cookie from 'js-cookie'
import router from '@/router'

const baseURL = process.env.NODE_ENV === 'development'
  ? 'http://localhost:3031'
  : 'http://test.cherryblog.site:3030'

Vue.prototype.$http = axios

axios.interceptors.request.use(
  config => {
    const token = cookie.get('token')
    if (config.url !== '/login' || config.url !== '/register') {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  err => {
    throw new Error('发起请求出错', err)
  }
)

axios.interceptors.response.use(
  res => {
    if (/^2/.test(res.status)) {
      return res.data
    } else {
      throw new Error(res.data.message)
    }
  },
  err => {
    if (err.response) {
      if (err.response.status === 401) {
        Vue.prototype.$confirm('您需要重新登录以获取token，是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 将 sessionStorage 清空，一个页面有两个请求的时候，就不会多次出现多次确认
          cookie.remove('isLogin')
          cookie.remove('token')
          router.replace({
            path: '/login',
            query: { redirect: router.currentRoute.fullPath }
          })
        }).catch(() => {
          Vue.prototype.$message({
            type: 'info',
            message: '已取消'
          })
        })
      } else {
        throw new Error(err.response.data.message || '服务器错误')
      }
    } else if (err.request) {
      throw new Error('网络环境太差，请稍后再试')
    }
    throw new Error(err)
  }
)

export default baseURL
