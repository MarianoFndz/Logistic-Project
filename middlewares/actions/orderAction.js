const schema = require('../schema/orderSchema')

const createValidate = (req, res, next) => {
  const { error } = schema.create.validate(req.body)
  error ? res.status(422).json({ message: error.details[0].message }) : next()
}

const validates = {
  createValidate
}

module.exports = validates
