const cors = require('koa2-cors')
const bodyParser = require('koa-bodyparser')
const koaJwt = require('koa-jwt')
const error = require('./error.js')
// const gzip = require('./gzip')

module.exports = app => {
  const secret = app.config.token.secret
  const unlesses = app.config.token.unlesses || []

  app.use(error())
  // app.use(gzip())
  app.use(cors())
  app.use(koaJwt({secret}).unless({path: unlesses}))
  app.use(bodyParser())
}
