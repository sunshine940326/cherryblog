const mongodb = require('./mongodb')
const connect = { mongodb }

module.exports = app => type => connect[type](app)
module.exports = ( app ) => {
  return (type) => {
    return connect[type](app)}
}