const { decodeToken } = require('../services/auth')
const { Unauthorized, JsonWebTokenError } = require('../customErrors')

const securedUser = (req, res, next) => {
  try {
    const { authorization } = req.headers
    if (!authorization) throw new JsonWebTokenError()

    const token = decodeToken(authorization)
    const { _id } = token

    req.id = _id

    next()
  } catch (err) {
    next(err)
  }
}

const securedAdmin = (req, res, next) => {
  try {
    const { authorization } = req.headers
    if (!authorization) throw new JsonWebTokenError()

    const token = decodeToken(authorization)
    const { _id, admin } = token

    if (!admin) throw new Unauthorized()

    req.id = _id
    next()
  } catch (err) {
    next(err)
  }
}

module.exports = { securedUser, securedAdmin }
