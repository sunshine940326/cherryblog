const withActions = require('./common-actions.js')

module.exports = app => {
  const model = app.model['article']

  const ArticleController = withActions(model)({})

  ArticleController.create = async ctx => {
    const req = ctx.request.body
    const result = await model.create({...req, createAt: new Date()})
    ctx.body = result
    return ctx.body
  }

  ArticleController.deleteArticle = async ctx => {
    const req = ctx.request.body
    model.findOne({
      '_id': req._id
    },async function (err, doc) {
      if (err) {
        console.log("remove err:",err)
        return
      }
      if (doc) {
        const result = await doc.remove()
        console.log("remove successful")
        ctx.body = { result }
        return 123
      }
    })
    const resule = await model.deleteOne({
      '_id': req._id
    })
    ctx.body = resule
    return ctx.body
  }
  ArticleController.queryList = async ctx => {
    const req = ctx.request.body
    let queryParams = []

    if (req.title) {
      queryParams = []
      queryParams.push({
        'title': {'$regex': req.title, $options: '$i'}
      })
    }
    if (req.id) {
      queryParams = []
      queryParams.push({
        '_id': req.id
      })
    }
    const conditions = queryParams.length === 0 
      ? {}
      : { $or: queryParams } 
    const articleList = 
      await model
              .find(conditions)
              .skip(req.offset)
              .limit(req.limit)
              .sort({'_id': -1})
    const total = await model.find(conditions).countDocuments()          
    ctx.body = {articleList, total}
    return ctx.body
  }
  return ArticleController 
}