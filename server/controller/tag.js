const withActions = require('./common-actions.js')

module.exports = app => {
  const model = app.model['tag']

  const TagController = withActions(model)({})
  // create
  TagController.createTag = async ctx => {
    return result = TagController.create(ctx)
  }
  // queryList
  TagController.queryList = async ctx => {
    return result = TagController.queryAll(ctx)
  }
  // deleteTag
  TagController.deleteTag = async ctx => {
    return result = TagController.delete(ctx)
  }
  return TagController 
}