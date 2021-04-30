const { startProcess, finishProcess } = require('../../services/orderProcess/processStatus')

const PROCESS_NAME = 'Packaging'

const start = async ({ body: data, params, id }, res, next) => {
  try {
    await startProcess(params.orderId, id, PROCESS_NAME)
    res.status(201).json({ message: 'The packaging has been finished' })
  } catch (e) {
    if (e.name === 'CastError') {
      next(new Error('Order not found'))
    }
    next(e)
  }
}

const finish = async ({ body: data, params, id }, res, next) => {
  try {
    await finishProcess(params.orderId, id, PROCESS_NAME)
    res.status(201).json({ message: 'The packaging has been finished' })
  } catch (e) {
    if (e.name === 'CastError') {
      next(new Error('Order not found'))
    }
    next(e)
  }
}

module.exports = {
  start,
  finish
}
