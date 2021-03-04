const Users = require('../models/User')
const { hash, unhash } = require('../utils/bcrypt')
const { createToken } = require('../services/auth')

const {
  EmailExistsError,
  EmailNOTExistsError,
  LoginError
} = require('../customErrors/customErrors')

const all = async (req, res) => {
  const allUsers = await Users.find()

  res.json(allUsers)
}

const create = async ({ body: data }, res, next) => {
  try {
    const { email, password, firstName, lastName, workPosition } = data

    const userExists = await checkEmail(email)

    if (userExists) return next(new EmailExistsError())

    const passwordHashed = hash(password)

    Users.create({
      email,
      password: passwordHashed,
      firstName,
      lastName,
      workPosition
    })

    res.status(201).json({ message: 'User created' })
  } catch (error) {
    next(error)
  }
}

const login = async ({ body: data }, res, next) => {
  try {
    const { password, email } = data
    const userExists = await checkEmail(email)

    if (!userExists) return next(new EmailNOTExistsError())

    checkPassword(password, userExists.password)

    const JWTObject = {
      _id: userExists._id,
      email
    }

    const JWT = createToken(JWTObject)

    res.json({ message: 'Bienvenid@', JWT })
    res.end()
  } catch (error) {
    next(error)
  }
}

const checkEmail = (email) => {
  return Users.findOne({ email }, { password: 1 })
}

const checkPassword = (password, passwordHashed) => {
  const isPasswordValid = unhash(password, passwordHashed)

  if (!isPasswordValid) throw new LoginError()
}

module.exports = {
  all,
  create,
  login
}
