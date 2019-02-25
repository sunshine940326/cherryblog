const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate')
const Schema = mongoose.Schema

// Schema
const UserSchema = new Schema({
  id: Number,
  user: String,
  password: String,
  createAt: {                          // 创建日期
    type: Date,
    default: Date.now()
  },
  lastLoginAt: {                          // 更新日期
    type: Date,
    default: Date.now()
  },
})

UserSchema.plugin(mongoosePaginate)
const User = mongoose.model('User', UserSchema)

module.exports = User