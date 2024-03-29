const Joi = require('@hapi/joi')

const schemaLoginKeys = {
  email: Joi.string()
    .required()
    .messages({ 'any.required': 'The email is obligatory' }),
  password: Joi.string()
    .required()
    .messages({ 'any.required': 'The password is obligatory' })
}

const schemas = {
  create: Joi.object().keys({
    firstName: Joi.string().required().messages({
      'any.required': 'The firstname is obligatory'
    }),
    lastName: Joi.string()
      .required()
      .messages({ 'any.required': 'The firstname is obligatory' }),
    jobTitle: Joi.string()
      .required()
      .messages({ 'any.required': 'The jobTitle is obligatory' }),
    ...schemaLoginKeys
  }),
  auth: Joi.object().keys({ ...schemaLoginKeys })
}

module.exports = schemas
