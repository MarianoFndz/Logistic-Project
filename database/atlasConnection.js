const mongoose = require('mongoose')

const { DB_CNN } = process.env

const databaseConnection = async () => {
  try {
    console.log(DB_CNN)
    await mongoose.connect(DB_CNN, {
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
