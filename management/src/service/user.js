import baseURL from './index'
import Vue from 'vue'

const _getUserList = async () => {
  let result
  const req = {
    url: `${baseURL}/getUserList`,
    method: 'POST',
    data: {}
  }
  try {
    result = await Vue.prototype.$http(req)
  } catch (err) {
    Vue.prototype.$notify.error({
      title: '错误',
      message: '获取用户列表错误'
    })
    console.error(err)
  }
  return result
}

const _deleteUser = async ({quertParams}) => {
  let result
  const req = {
    url: `${baseURL}/deleteUser`,
    method: 'POST',
    data: quertParams
  }
  try {
    result = await Vue.prototype.$http(req)
  } catch (err) {
    Vue.prototype.$notify.error({
      title: '错误',
      message: '删除用户错误'
    })
    console.error(err)
  }
  return result
}

const _createUser = async ({queryParams}) => {
  let result
  console.log('quertParams', queryParams)
  const req = {
    url: `${baseURL}/createUser`,
    method: 'POST',
    data: queryParams
  }
  try {
    result = await Vue.prototype.$http(req)
  } catch (err) {
    Vue.prototype.$notify.error({
      title: '错误',
      message: '删除用户错误'
    })
    console.error(err)
  }
  return result
}
export { _getUserList, _deleteUser, _createUser }
