function validateStart (order, processName) {
  const isStarted = order.process.find(element => element.name === processName && element.startDate)
  if (isStarted) throw new Error(`The ${processName} has already been started previously`)
}

function validateFinish (order, processName) {
  const isFinished = order.process.find(element => element.name === processName && element.finishDate)
  if (isFinished) throw new Error(`The ${processName} has already been finished previously`)
}

module.exports = {
  validateStart,
  validateFinish
}
