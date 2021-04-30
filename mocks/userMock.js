const faker = require('faker')
const { hash } = require('../utils/bcrypt')

const usersMockGenerate = (emails) => {
  const users = emails.map((email) => {
    const password = faker.internet.password()
    const user = {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email,
      password: hash(password)
    }
    return {
      getUser: () => user,
      getEmail: () => user.email,
      getFirstName: () => user.firstName,
      getLastName: () => user.lastName,
      getPassword: () => password
    }
  })

  return users
}

module.exports = usersMockGenerate
