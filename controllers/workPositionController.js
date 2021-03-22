const WorkPosition = require('../models/WorkPositionModel')
const { createWorkPosition } = require('../services/workPositionService')

const all = async (req, res) => {
  const allWorksPositions = await WorkPosition.find()
  res.json(allWorksPositions)
}

const create = async ({ body: data }, res, next) => {
  try {
    await createWorkPosition(data)
    res.status(201).json({ message: 'Employee created' })
  } catch (e) {
    next(e)
  }
}

module.exports = {
  all,
  create
}
