const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate')
const Schema = mongoose.Schema

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
  tag: {
    type: String
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

articleSchema.plugin(mongoosePaginate)
const Article = mongoose.model('Article', articleSchema)

module.exports = Article