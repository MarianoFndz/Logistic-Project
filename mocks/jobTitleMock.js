const faker = require('faker')

const jobTitleGenerate = (permissions) => ({
  title: faker.name.firstName(),
  description: faker.name.jobDescriptor(),
  permissions: {
    ...permissions
  }
})

module.exports = jobTitleGenerate
