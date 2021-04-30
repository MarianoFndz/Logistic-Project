const { MongoMemoryServer } = require('mongodb-memory-server')
const mongoose = require('mongoose')

const mongoServer = new MongoMemoryServer()

const atlasConnection = async () => {
  try {
    const mongoUri = await mongoServer.getUri()
    const mongooseOpts = {
      autoReconnect: true,
      reconnectTries: Number.MAX_VALUE,
      reconnectInterval: 1000
    }

    await mongoose.connect(mongoUri, mongooseOpts)
    console.log('Connected to in Memory Database')
  } catch (e) {
    console.error(e)
  }
}

module.exports = atlasConnection
