const Order = require('../../models/Order')
const { validateStart, validateFinish } = require('../../utils/process')

async function startProcess (orderId, userId, processName) {
  const order = await Order.findById(orderId)
  validateStart(order, processName)

  await Order.findOneAndUpdate(
    { _id: orderId, 'process.name': processName },
    {
      $set: {
        'process.$.startDate': new Date(),
        'process.$.user': userId,
        finished: processName === 'Transporting'
      }
    }
  )
}

async function finishProcess (orderId, userId, processName) {
  const order = await Order.findById(orderId)
  validateFinish(order, processName)

  await Order.findOneAndUpdate(
    { _id: orderId, 'process.name': processName },
    {
      $set: {
        'process.$.finishDate': new Date(),
        'process.$.user': userId,
        finished: processName === 'Transporting'
      }
    }
  )
}

module.exports = { startProcess, finishProcess }
