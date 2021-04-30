const Joi = require('@hapi/joi')

const schemas = {
  create: Joi.object().keys({
    firstName: Joi.string().required().messages({
      'any.required': 'The firstname is obligatory'
    }),
    lastName: Joi.string()
      .required()
      .messages({ 'any.required': 'The firstname is obligatory' }),
    email: Joi.string()
      .required()
      .messages({ 'any.required': 'The email is obligatory' }),
    address: Joi.string()
      .required()
      .messages({ 'any.required': 'The address is obligatory' })
  })
}

module.exports = schemas
