module.exports = (app, router) => {
  const controller = app.controller.article

  router.post('/getArticleList', controller.queryList)
  router.post('/createArticleItem', controller.createArticle)
  router.post('/deleteArticle', controller.deleteArticle)
  router.post('/update', controller.update)
}