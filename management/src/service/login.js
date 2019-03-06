import baseURL from './index'
import Vue from 'vue'

const _login = async ({queryParams}) => {
  let result
  const req = {
    url: `${baseURL}/login`,
    method: 'POST',
    data: queryParams
  }
  try {
    result = await Vue.prototype.$http(req)
  } catch (err) {
    Vue.prototype.$notify.error({
      title: '错误',
      message: err.message
    })
    console.error(err)
  }
  return result
}

export { _login }
