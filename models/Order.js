const { Schema, model } = require('mongoose')

const OrderSchema = Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: true
  },
  client: {
    type: Schema.Types.ObjectId,
    ref: 'clients',
    required: true
  },
  process: {
    type: Array,
    default: [
      {
        name: 'Packaging',
        startDate: null,
        finishDate: null

      },
      {
        name: 'Distributing',
        startDate: null,
        finishDate: null

      },
      {
        name: 'Transporting',
        startDate: null,
        finishDate: null

      }
    ]
  },
  finished: {
    type: Boolean,
    default: false
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

module.exports = model('orders', OrderSchema)
