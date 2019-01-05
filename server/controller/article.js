const withActions = require('./common-actions.js')

module.exports = app => {
  const model = app.model['article']

  const ArticleController = withActions(model)({})
  
  ArticleController.createArticle = async ctx => {
    return result = await ArticleController.create(ctx) 
  }

  ArticleController.update = async ctx => {
    return result = await ArticleController.updateById(ctx)
  }

  ArticleController.deleteArticle = async ctx => {
    return result = await ArticleController.delete(ctx)
  }
  
  ArticleController.queryList = async ctx => {
    return result = await ArticleController.queryAll(ctx)
  }
  return ArticleController 
}