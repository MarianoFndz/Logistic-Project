
const atlasConnection = require('./atlasConnection')
const inMemoryConnection = require('./inMemoryConnection')

const { NODE_ENV } = process.env

const databaseConnection = NODE_ENV === 'test' ? inMemoryConnection : atlasConnection

module.exports = databaseConnection
