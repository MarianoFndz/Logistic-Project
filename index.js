const express = require('express')
const dotenv = require('dotenv')
const logger = require('morgan')
const compression = require('compression')
const databaseConnection = require('./database/config')
const { securedUser, securedAdmin } = require('./middlewares/authMiddleware')

dotenv.config()

databaseConnection()

const app = express()
app.use(compression())
app.use(express.json())
app.use(logger('dev'))

const workPosition = require('./routes/workPositionRoute')
const auth = require('./routes/authRoute')
const client = require('./routes/clientRoute')
const order = require('./routes/order/orderRoute')

app.use('/client', securedUser, client)
app.use('/work-position', securedAdmin, workPosition)
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
