const jwt = require('jsonwebtoken')
const fs = require('fs')
const { JsonWebTokenError } = require('../customErrors')

const privateKey = fs.readFileSync('./keys/private.pem')
const publicKey = fs.readFileSync('./keys/public.pem')
const signOptions = { expiresIn: '8h', algorithm: 'RS256' }

const createToken = (payload) => jwt.sign(payload, privateKey, signOptions)
const decodeToken = (token) => {
  try {
    const [, JWT] = token.split(' ')
    const validToken = checkToken(JWT, publicKey)
    return validToken
  } catch (e) {
    throw new Error(new JsonWebTokenError())
  }
}

function checkToken (JWT, publicKey) {
  return jwt.verify(JWT, publicKey, function (err, decoded) {
    if (err) {
      throw new Error(err)
    }
    return decoded
  })
}

module.exports = { createToken, decodeToken }
