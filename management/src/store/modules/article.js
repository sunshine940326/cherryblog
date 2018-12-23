import Vue from 'vue'
import axios from 'axios'

const state = {}

const mutations = {}

const actions = {
  async _queryArticle ({ commit }, { queryCondition }) {
    let result
    console.log('queryCondition', queryCondition)
    const req = {
      url: 'http://localhost:3030/getArticleList',
      method: 'POST',
      data: queryCondition
    }
    try {
      result = await axios(req)
    } catch (e) {
      Vue.$notify.error({
        title: '查询文章错误',
        message: e.message
      })
      throw e
    }
    return result
  }
}

const getters = {}

export default {
  state,
  mutations,
  actions,
  getters
}
