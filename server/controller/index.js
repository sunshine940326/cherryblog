const article = require('./article')
const tag = require('./tag')
const user = require('./user')

module.exports = app => ({
  article: article(app),
  tag: tag(app),
  user: user(app)
}) 