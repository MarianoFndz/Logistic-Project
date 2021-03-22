const Joi = require('@hapi/joi')

const schemas = {
  create: Joi.object().keys({
    description: Joi.string()
      .required()
      .messages({ 'any.required': 'The description is obligatory' }),
    permissions: Joi.object()
      .required()
      .messages({ 'any.required': 'The permissions is obligatory' })
  })
}

module.exports = schemas
