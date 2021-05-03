class EmailExistsError extends Error {
  constructor (...params) {
    super(...params)
    this.name = 'EmailExistsError'
    this.message = 'The email is already exists'
    this.status = 401
    this.date = new Date()
  }
}

class EmailNOTExistsError extends Error {
  constructor (...params) {
    super(...params)
    this.name = 'EmailExistsError'
    this.message = 'The email doesn\'t exists'
    this.status = 401
    this.date = new Date()
  }
}

class LoginError extends Error {
  constructor (...params) {
    super(...params)
    this.name = 'LoginError'
    this.message = 'User or password incorrect'
    this.status = 401
    this.date = new Date()
  }
}

class JsonWebTokenError extends Error {
  constructor (...params) {
    super(...params)
    this.name = 'JsonWebTokenError'
    this.message = 'Unauthorized'
    this.status = 401
    this.date = new Date()
  }
}

class UnauthorizedError extends Error {
  constructor (...params) {
    super(...params)
    this.name = 'UnauthorizedError'
    this.message = 'Unauthorized'
    this.status = 401
    this.date = new Date()
  }
}

const customErrors = {
  EmailExistsError,
  EmailNOTExistsError,
  LoginError,
  JsonWebTokenError,
  UnauthorizedError
}

module.exports = customErrors
