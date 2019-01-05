const article = require('./article')
const tag = require('./tag')
module.exports = app => ({
  article: article(app),
  tag: tag(app)
})