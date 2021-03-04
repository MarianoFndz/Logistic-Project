const express = require('express')
const logger = require('morgan')
const compression = require('compression')
const databaseConnection = require('./database/config')
const { securedUser } = require('./middlewares/auth')

databaseConnection()

const app = express()
app.use(compression())
app.use(express.json())
app.use(logger('dev'))

const workPosition = require('./routes/workPosition')
const auth = require('./routes/auth')

app.use('/workPosition', securedUser, workPosition)
app.use('/auth', auth)

app.get('/', (req, res) => {
  res.send('<h1>Hello world!!!❤👋</h1>')
  res.end()
})

app.use((err, req, res, __) => {
  err.status = err.status ? err.status : 500

  res.status(err.status).json({ message: err.message })
})

app.listen(5000)
