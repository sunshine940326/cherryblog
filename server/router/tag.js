module.exports = (app, router) => {
  const controller = app.controller.tag
  
  router.post('/createTagItem', controller.createTag)
  router.post('/getTagList', controller.queryList)
  router.post('/deleteTag', controller.deleteTag)
}