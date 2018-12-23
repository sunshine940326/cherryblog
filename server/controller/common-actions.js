module.exports = model => (controller = {}) => {
  const action = {
    create: async ctx => {
      const result = await model.create(ctx.request.body)
      ctx.status = 201
      return ctx.body = result
    }
  }

  Object.keys(action).forEach(key => controller[key] = action[key])

  return controller
}