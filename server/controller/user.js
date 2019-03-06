const withActions = require('./common-actions.js')
const jwt = require('jsonwebtoken')

module.exports = app => {
  const model = app.model['user']
  const UserController = withActions(model)({})
  // create
  UserController.createUser = async ctx => {
    return result = UserController.create(ctx)
  }
  // queryList
  UserController.queryUser = async ctx => {
    return result = UserController.queryAll(ctx)
  }

  UserController.login = async ctx => {
    let { user, password } = ctx.request.body
    !password ? ctx.throw(400, { message: '请输入密码' }) : ''
    const account = await model.find({'user': user})
    if(account.length === 0) return ctx.body = ({ code: 'error', message: `账号或密码错误` })
    isUser = account[0].password === password
    if (!!isUser){
      const token = jwt.sign({ 
        // exp: Math.floor(Date.now() / 1000) + (60),
        id: user._id,
        account,
        lastLoginAt: user.lastLoginAt
      }, 
      app.config.token.secret,
      { expiresIn: app.config.token.expires }
      )
      ctx.body = ({ code: 'success', message: `登录成功`, token: token })
      // 更新最后登录时间
      await model.findByIdAndUpdate(user._id, { lastLoginAt: Date.now() })
    }else{
      ctx.body = ({ code: 'error', message: `账号或密码错误` })
    }
    return ctx.body
  }
  // deleteTag
  UserController.deleteUser = async ctx => {
    return result = UserController.delete(ctx)
  }
  return UserController 
}