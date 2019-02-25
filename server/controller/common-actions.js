module.exports = model => (controller = {}) => {
  const action = {
    create: async ctx => {
      const req = ctx.request.body
      const result = await model.create({...req, createAt: new Date()})
      ctx.body = result
      return ctx.body
    },

    updateById: async ctx => {
      const conditions = {
        ...ctx.request.body,
        _id: ctx.request.body.id,
        updateAt: new Date()
      }
      delete conditions.id
      await model.update({_id: ctx.request.body.id}, conditions)
      const result = await model.findById(ctx.request.body.id)
      return ctx.body = result
    },

    queryAll: async ctx => {
      let req = ctx.request.body
      let conditions = {}
      req && (conditions = req)
      let { limit = 10, offset = 0, title = '' } = req
      delete conditions.limit
      delete conditions.offset

      if (req.id) {
         conditions = ({
          '_id': req.id
        })
      }
      if (conditions.title) {
        title = conditions.title
        delete conditions.title
      }

      if (!!title) {
        const reg = new RegExp(title, 'i')
        conditions.$or = [
          { 'title': { $regex: reg }}
        ]
      }

      const list = 
        await model
                .find(conditions)
                .skip(offset)
                .limit(limit)
                .sort({'_id': -1})
      const total = await model.find(conditions).countDocuments()          
      ctx.body = {list, total}  
      return ctx.body
    },

    delete: async ctx => {
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
          ctx.body = { result }
        }
      })
      const resule = await model.deleteOne({
        '_id': req._id
      })
      ctx.body = resule
      return ctx.body
    }
  }

  Object.keys(action).forEach(key => controller[key] = action[key])

  return controller
}