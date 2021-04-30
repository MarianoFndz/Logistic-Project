const JobTitleModel = require('../models/JobTitleModel')
const checkPermissions = require('../utils/checkPermisionsExists')

const createJobTitle = async (data) => {
  const { description, permissions } = data

  checkPermissions(permissions)

  const newWorkPosition = new JobTitleModel({
    description,
    permissions
  })

  await newWorkPosition.save()
}

module.exports = {
  createJobTitle
}
