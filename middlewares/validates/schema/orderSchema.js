const Joi = require('@hapi/joi')

const schemas = {
  create: Joi.object().keys({
    client: Joi.string().required().messages({
      'any.required': 'The user is obligatory'
    })
  })
}

module.exports = schemas
