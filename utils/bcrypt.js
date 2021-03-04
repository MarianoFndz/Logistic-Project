const bcrypt = require('bcrypt')
const salt = bcrypt.genSaltSync()

const hash = (payload) => bcrypt.hashSync(payload, salt)

const unhash = (payload, hashPayload) => {
  return bcrypt.compareSync(payload, hashPayload)
}

module.exports = { hash, unhash }
