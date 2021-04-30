const JobTitleModel = require('../models/JobTitleModel')
const { createJobTitle } = require('../services/jobTitleService')

const all = async (req, res) => {
  const allJobTitles = await JobTitleModel.find()
  res.json(allJobTitles)
}

const create = async ({ body: data }, res, next) => {
  try {
    await createJobTitle(data)
    res.status(201).json({ message: 'Employee created' })
  } catch (e) {
    next(e)
  }
}

module.exports = {
  all,
  create
}
