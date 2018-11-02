const Koa = require('koa');
const mongoose = require('mongoose')
const app = new Koa()
const route = require('koa-route')
const cors = require('koa2-cors')

app.use(cors({
  origin: function (ctx) {
    if (ctx.url === '/api') {
      return "*"
    }
    return 'http://localhost:8080'
  },
  exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
  maxAge: 5,
  credentials: true,
  allowMethods: ['GET', 'POST', 'DELETE'],
  allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}))

const main = ctx => {
  ctx.response.body = 'Hello World'
}

const about = ctx => {
  ctx.response.type = 'html'
  ctx.response.body = '<a href="/">Index Page</a>'
}

app.use(route.get('/api', main))
app.use(route.get('/api/about', about))
app.use(cors())

mongoose.connect('mongodb://localhost:27017/blog', { useNewUrlParser: true }, function (err) {
  if (err) {
    console.log("数据库连接失败")
  } else {
    console.log("数据库连接成功")
    app.listen(3030) //监听http请求
  }
})

