const WorkPosition = require('../models/WorkPosition')

const all = async (req, res) => {
  const allWorksPositions = await WorkPosition.find()
  res.json(allWorksPositions)
}

const create = ({ body: data }, res) => {
  const { description } = data

  const newWorkPosition = new WorkPosition({
    description
  })

  WorkPosition
    .create(newWorkPosition)
    .then(() => {
      res.status(201).json({ message: 'Employee created' })
    })
}

module.exports = {
  all,
  create
}
