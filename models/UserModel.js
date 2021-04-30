const { Schema, model } = require('mongoose')

const UserSchema = Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  jobTitle: {
    type: Schema.Types.ObjectId,
    ref: 'JobTitle'
  },
  verificationCode: {
    type: String
    // required: true
  },
  dateExpirationCode: {
    type: Date
    // required: true
  },
  tsCreate: {
    type: Date,
    default: Date.now
  },
  admin: {
    type: Boolean,
    default: false
  },
  enable: {
    type: Boolean,
    default: false
  }
})

module.exports = model('users', UserSchema)
