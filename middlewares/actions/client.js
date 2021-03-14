const schema = require('../schema/client')

const create = (req, res, next) => {
  const { error } = schema.create.validate(req.body)
  error ? res.status(422).json({ message: error.details[0].message }) : next()
}

const validates = {
  create
}

module.exports = validates
