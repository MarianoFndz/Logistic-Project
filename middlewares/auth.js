const { decodeToken } = require('../services/auth')

const securedUser = (req, res, next) => {
  try {
    const { authorization } = req.headers
    const token = decodeToken(authorization)
    console.log(token)
    const { _id } = token

    req.id = _id

    next()
  } catch (err) {
    next(err)
  }
}

module.exports = { securedUser }
