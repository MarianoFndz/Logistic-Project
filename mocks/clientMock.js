const faker = require('faker')

const manyClients = (number) => {
  const clients = []
  for (let i = 0; i < number; i++) {
    clients.push({
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      address: faker.address.direction(),
      email: faker.internet.email()
    })
  }

  return clients
}

const oneClient = () => ({
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  address: faker.address.direction(),
  email: faker.internet.email()
})

module.exports = { manyClients, oneClient }
