const mongoose = require('mongoose')

const databaseConnection = async () => {
  try {
    console.log(process.env.DB_CNN)
    await mongoose.connect(process.env.DB_CNN, {
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
