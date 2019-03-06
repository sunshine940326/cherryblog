const Koa = require('koa')
const app = new Koa()
const withConnect = require('./connection')
const withRouter = require('./router')
const withMiddlewares = require('./middlewares')

app.config = require('./config')
app.model = require('./models')
app.controller = require('./controller')(app)

withConnect(app)('mongodb')
withMiddlewares(app)
withRouter(app)

app.listen(app.config.port, () => {
  console.log(`Server is running at http://localhost:${app.config.port}`)
})