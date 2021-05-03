const mongoose = require('mongoose')

const { DB_CNN, DB_CNN_TEST, NODE_ENV } = process.env

const connectionString = NODE_ENV === 'test' ? DB_CNN_TEST : DB_CNN

const databaseConnection = async () => {
  try {
    console.log(DB_CNN)
    await mongoose.connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    })
    console.log('Connected to Database')
  } catch (error) {
    console.error(error)
  }
}

module.exports = databaseConnection
