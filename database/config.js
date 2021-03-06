const mongoose = require('mongoose')

const databaseConnection = async () => {
  try {
    await mongoose.connect(process.env.DB_CNN)
    console.log('Connected to Database')
  } catch (error) {
    console.error(error)
  }
}

module.exports = databaseConnection
