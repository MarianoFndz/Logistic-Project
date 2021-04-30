const schema = require('../schema/jobTitleSchema')

const validateCreate = (req, res, next) => {
  const { error } = schema.create.validate(req.body)
  error ? res.status(422).json({ message: error.details[0].message }) : next()
}

const validates = {
  validateCreate
}

module.exports = validates
