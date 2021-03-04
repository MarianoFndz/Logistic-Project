const schema = require('../schema/users')

const validateCreate = (req, res, next) => {
  const { error } = schema.create.validate(req.body)
  error ? res.status(422).json({ message: error.details[0].message }) : next()
}

const validateUpdate = (req, res, next) => {
  const { error } = schema.update.validate(req.body)
  error ? res.status(422).json({ message: error.details[0].message }) : next()
}

const validateAuth = (req, res, next) => {
  const { error } = schema.auth.validate(req.body)
  error ? res.status(422).json({ message: error.details[0].message }) : next()
}

const validates = {
  validateCreate,
  validateUpdate,
  validateAuth
}

module.exports = validates
