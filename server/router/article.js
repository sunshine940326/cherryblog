module.exports = (app, router) => {
  const controller = app.controller.article

  router.post('/getArticleList', controller.queryList)
  router.post('/createArticleItem', controller.create)
  router.post('/deleteArticle', controller.deleteArticle)
}