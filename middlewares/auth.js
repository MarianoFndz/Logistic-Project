const { decodeToken } = require('../services/auth')

const securedUser = (req, res, next) => {
  try {
    const { authorization } = req.headers

    if (!authorization) throw new Error('Capo pone el token')

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
