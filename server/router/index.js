const router = require('koa-router')()
const article = require('./article')
const tag = require('./tag')
// 加载模块
const bodyParser = require('koa-bodyparser')
const cors = require('koa2-cors')

module.exports = function withRouter(app){
  article(app, router)
  tag(app, router)
  app.use(cors({
    origin: "*",
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    maxAge: 5,
    credentials: true,
    allowMethods: ['GET', 'POST', 'DELETE'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
  }))
  // 进行requestbody解析
  app.use(bodyParser())
  app.use(router.routes()).use(router.allowedMethods())
}