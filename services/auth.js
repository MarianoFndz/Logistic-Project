const jwt = require('jsonwebtoken')
const fs = require('fs')
const { JsonWebTokenError } = require('../customErrors/customErrors')

const privateKey = fs.readFileSync('./keys/private.pem')
const publicKey = fs.readFileSync('./keys/public.pem')
const signOptions = { expiresIn: '8h', algorithm: 'RS256' }

const createToken = (payload) => jwt.sign(payload, privateKey, signOptions)
const decodeToken = (token) => {
  const [, JWT] = token.split(' ')
  const validToken = jwt.verify(JWT, publicKey, function (err, decoded) {
    if (err) {
      throw new JsonWebTokenError()
    }
    return decoded
  })
  console.log(validToken)
  return validToken
}

module.exports = { createToken, decodeToken }
