const mongoose = require('mongoose')

const databaseConnection = async () => {
  try {
    await mongoose.connect(
      'mongodb+srv://test_user:B1YZgAiBkrenlydE@cluster0.vpw6m.mongodb.net/logistics'
    )
    console.log('Connected to Database')
  } catch (error) {
    console.error(error)
  }
}

module.exports = databaseConnection
