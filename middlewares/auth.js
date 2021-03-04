const { decodeToken } = require('../services/auth')

const securedUser = (req, res, next) => {
  try {
    const { authorization } = req.headers // req.headers.authorization
    const token = decodeToken(authorization) // error
    const { _id } = token

    req.id = _id

    next()
  } catch (err) {
    next(err)
  }
}

module.exports = { securedUser }
