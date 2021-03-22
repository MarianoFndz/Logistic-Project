
const uid = require('node-uuid')
const moment = require('moment')
const registerTemplate = require('../utils/registerTemplate')

const User = require('../models/UserModel')
const { hash, unhash } = require('../utils/bcrypt')
const { createToken } = require('../services/auth')
const sendEmail = require('../services/mailing')

const {
  EmailExistsError,
  EmailNOTExistsError,
  LoginError
} = require('../customErrors/customErrors')

const allController = async (req, res) => {
  const allUsers = await User.find()

  res.json(allUsers)
}

const createController = async ({ body: data }, res, next) => {
  try {
    const { email } = data

    console.log(data)

    const userExists = await checkEmail(email)

    if (userExists) return next(new EmailExistsError())

    const newUserData = await saveUser(data)

    console.log(newUserData)

    sendVerificationEmail(newUserData)

    res.status(201).json({ message: 'User created' })
  } catch (error) {
    next(error)
  }
}

const loginController = async ({ body: data }, res, next) => {
  try {
    const { password, email } = data
    const userExists = await checkEmail(email)

    if (!userExists) return next(new EmailNOTExistsError())

    checkPassword(password, userExists.password)

    console.log(userExists)

    const JWTObject = {
      _id: userExists._id,
      email,
      admin: userExists.admin
    }

    const JWT = createToken(JWTObject)

    res.json({ message: 'Bienvenid@', JWT })
    res.end()
  } catch (error) {
    next(error)
  }
}

function checkEmail (email) {
  return User.findOne({ email }, { password: 1, admin: 1 })
}

function checkPassword (password, passwordHashed) {
  const isPasswordValid = unhash(password, passwordHashed)

  if (!isPasswordValid) throw new LoginError()
}

function saveUser (data) {
  const { password } = data

  const passwordHashed = hash(password)

  const newUser = new User({
    ...data,
    password: passwordHashed,
    verificationCode: uid(),
    dateExpirationCode: moment(new Date()).add(1, 'hours')
  })

  return newUser.save()
}

function sendVerificationEmail (data) {
  const { firstName, lastName, verificationCode, email } = data

  sendEmail({
    to: email,
    subject: 'Gracias por registrarte en mi aplicacion hermosa 🥰',
    html: registerTemplate({ firstName, lastName, verificationCode })
  })
}

module.exports = {
  allController,
  createController,
  loginController
}
