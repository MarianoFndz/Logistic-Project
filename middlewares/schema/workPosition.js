const Joi = require('@hapi/joi')

const schemas = {
  create: Joi.object().keys({
    description: Joi.string()
      .required()
      .messages({ 'any.required': 'The firstname is obligatory' })
  })
}

module.exports = schemas
