const Koa = require('koa')
const mongoose = require('mongoose')
const app = new Koa()
const router = require('koa-router')()
const cors = require('koa2-cors')
// 加载模块
const Schema = mongoose.Schema
const bodyParser = require('koa-bodyparser')

app.use(cors({
  origin: "*",
  exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
  maxAge: 5,
  credentials: true,
  allowMethods: ['GET', 'POST', 'DELETE'],
  allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}))

// Schema
const articleSchema = new Schema({
  id: Number,
  title: {                             // 标题
    type: String,
  },
  desc: String,                        // 描述
  cover: String,                       // 封面
  content: {                           // 内容
    type: String,
  },
  html: String,                        // HTML内容
  toc: Array,                          // TOC
  state: {                             // 状态（‘草稿‘或者’发布‘）
    type: String,
    default: 'draft'
  },
  readingQuantity: {                   // 阅读量
    type: Number,
    default: 0,
  },
  createAt: {                          // 创建日期
    type: Date,
    default: Date.now()
  },
  updateAt: {                          // 更新日期
    type: Date,
    default: Date.now()
  },
  author: {                            // 作者
    type: String,
    ref: 'User',
  }
})

//Model
const articleModel = mongoose.model('article',articleSchema)
articleModelCreate = async ctx => {
  const req = ctx.request.body
  const result = await articleModel.create({...req, createAt: new Date()})
  return ctx.body = result
}
router.post('/article', articleModelCreate)

// 进行requestbody解析
app.use(bodyParser())
app.use(router.routes()).use(router.allowedMethods())

app.use(cors())

mongoose.connect('mongodb://localhost:27017/cherryblog', { useNewUrlParser: true }, function (err) {
  if (err) {
    console.log("数据库连接失败")
  } else {
    console.log("数据库连接成功")
    app.listen(3030) //监听http请求
  }
})