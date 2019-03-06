import baseURL from './index'
import Vue from 'vue'

const _updateArticle = async ({queryParams}) => {
  let result
  const req = {
    url: `${baseURL}/update`,
    method: 'POST',
    data: queryParams
  }
  try {
    result = await Vue.prototype.$http(req)
  } catch (err) {
    Vue.prototype.$notify.error({
      title: '错误',
      message: '更新文章错误'
    })
    console.error(err)
  }
  return result
}

const _createArticleItem = async ({queryParams}) => {
  let result
  const req = {
    url: `${baseURL}/createArticleItem`,
    method: 'POST',
    data: queryParams
  }
  try {
    result = await Vue.prototype.$http(req)
  } catch (err) {
    Vue.prototype.$notify.error({
      title: '错误',
      message: '创建文章错误'
    })
    console.error(err)
  }
  return result
}

const _getArticleList = async ({queryParams}) => {
  let result
  const req = {
    url: `${baseURL}/getArticleList`,
    method: 'POST',
    data: queryParams
  }
  try {
    result = await Vue.prototype.$http(req)
  } catch (err) {
    Vue.prototype.$notify.error({
      title: '错误',
      message: '获取文章列表错误'
    })
    console.error(err)
  }
  return result
}

const _deleteArticle = async ({queryParams}) => {
  let result
  const req = {
    url: `${baseURL}/deleteArticle`,
    method: 'POST',
    data: queryParams
  }
  try {
    result = await Vue.prototype.$http(req)
  } catch (err) {
    Vue.prototype.$notify.error({
      title: '错误',
      message: '删除文章错误'
    })
    console.error(err)
  }
  return result
}
export { _updateArticle, _createArticleItem, _getArticleList, _deleteArticle }
