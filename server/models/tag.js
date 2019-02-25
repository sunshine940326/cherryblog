const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Schema
const tagSchema = new Schema({
  tagName: {                             // 标题
    type: String,
  },
  tagValue: String,                        // 描述
  createAt: {                          // 创建日期
    type: Date,
    default: Date.now()
  },
  updateAt: {                          // 更新日期
    type: Date,
    default: Date.now()
  }
})

const Tag = mongoose.model('Tag', tagSchema)

module.exports = Tag