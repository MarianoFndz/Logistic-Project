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
  workPosition: {
    type: Schema.Types.ObjectId,
    ref: 'WorkPosition',
    required: true
  },
  verificationCode: {
    type: String,
    required: true
  },
  dateExpirationCode: {
    type: Date,
    required: true
  },
  tsCreate: {
    type: Date,
    default: Date.now
  },
  enable: {
    type: Boolean,
    default: false
  }
})

module.exports = model('users', UserSchema)
