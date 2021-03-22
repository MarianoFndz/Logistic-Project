const { Schema, model } = require('mongoose')

const ClientSchema = Schema({
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
  address: {
    type: String,
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

module.exports = model('client', ClientSchema)
