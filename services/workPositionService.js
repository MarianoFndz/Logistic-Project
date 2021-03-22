const WorkPosition = require('../models/WorkPositionModel')
const checkPermissions = require('../utils/checkPermisionsExists')

const createWorkPosition = async (data) => {
  const { description, permissions } = data

  checkPermissions(permissions)

  const newWorkPosition = new WorkPosition({
    description,
    permissions
  })

  await WorkPosition.create(newWorkPosition)
}

module.exports = {
  createWorkPosition
}
