const mongoose = require('mongoose')

module.exports = app => {
  let url
  const config = app.config.mongodb
  url = `mongodb://${config.host}:${config.port}/${config.name}`
  console.log(url)
  mongoose.connect(url, { useNewUrlParser: true }, (err) => {
    if (err) {
      console.log("数据库连接失败")
    } else {
      console.log("数据库连接成功")
    }
  })
}