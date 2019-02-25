const mongoose = require('mongoose')

module.exports = app => {
  let url
  const config = app.config.mongodb
  
  if (process.env.NODE_ENV === 'develop'){
    url = `mongodb://${config.host}:${config.port}/${config.name}`
  }else{
    url = `mongodb://${your.password}:${your.pwd}@${config.host}:${config.port}/${config.name}`
  }
  // { useNewUrlParser: true }

  console.log('url', url)
  mongoose.connect(url, (err) => {
    if (err) {
      console.log(err)
      console.log("数据库连接失败")
    } else {
      console.log("数据库连接成功")
    }
  })
}
