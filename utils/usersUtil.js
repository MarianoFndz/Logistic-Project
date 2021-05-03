const moment = require('moment')
const uid = require('node-uuid')
const UserModel = require('../models/UserModel')
const { hash } = require('../utils/bcrypt')

function saveUser (data) {
  const { password } = data

  const passwordHashed = hash(password)

  const newUser = new UserModel({
    ...data,
    password: passwordHashed,
    verificationCode: uid(),
    dateExpirationCode: moment(new Date()).add(1, 'hours')
  })

  return newUser.save()
}

module.exports = {
  saveUser
}
