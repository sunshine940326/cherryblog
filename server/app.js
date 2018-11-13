// 加载模块
const mongoose = require('mongoose')
const Schema = mongoose.Schema

mongoose.connect('mongodb://127.0.0.1:27017/cherryblog')

const db = mongoose.connection
//如果连接成功会执行error回调
db.on("error", function (error) {
  console.log("数据库连接失败：" + error)
})
//如果连接成功会执行open回调
db.on("open", function () {
  console.log("数据库连接成功")
})
db.on('close', () => {
  console.log('数据库连接断开，重新连接...')
  mongoose.connect(url, options)
})

// Schema
const articleSchema = new Schema({
  id: Number,
  title: {                             // 标题
    type: String,
    required: true,
  },
  desc: String,                        // 描述
  cover: String,                       // 封面
  content: {                           // 内容
    type: String,
    required: true
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
    required: true
  }
})

//Model
const articleModel = mongoose.model('article',articleSchema)

// Entity
const articleEntity = new articleModel({
  title: '测试', //唯一不可重复
  desc: '测试 desc',
  content: '测试 content',
  author: 'cherry'
})

const articleEntity2 = new articleModel({
  title: '测试2', //唯一不可重复
  desc: '测试 desc2',
  content: '测试 content2',
  author: 'cherry2'
})

const articleEntity3 = new articleModel({
  title: '测试3', //唯一不可重复
  desc: '测试 desc2',
  content: '测试 content2',
  author: 'cherry2'
})

// 增 [Model.create(doc(s), [callback])]
articleEntity.save(function(error,doc){
  if(error){
     console.log("error :" + error)
  }else{
     console.log(doc)
  }
})

articleEntity2.save()

articleEntity3.save()
// 删 [Model.remove(conditions, [callback])] 
// 删除 title 为 测试2 的数据
articleModel.remove({title: '测试2'},function(err,docs){})

// 查 [Model.find(conditions, [projection], [options], [callback])]
// 
const result = articleModel.find({title: '测试'},function(err,docs){
})

console.log(result)