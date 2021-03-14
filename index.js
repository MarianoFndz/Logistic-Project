const express = require('express')
const dotenv = require('dotenv')
const logger = require('morgan')
const compression = require('compression')
const databaseConnection = require('./database/config')
const { securedUser } = require('./middlewares/auth')

dotenv.config()

databaseConnection()

const app = express()
app.use(compression())
app.use(express.json())
app.use(logger('dev'))

const workPosition = require('./routes/workPosition')
const auth = require('./routes/auth')
const client = require('./routes/client')
const order = require('./routes/order/order')

app.use('/client', securedUser, client)
app.use('/workPosition', securedUser, workPosition)
app.use('/order', securedUser, order)
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
