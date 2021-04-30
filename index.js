const express = require('express')
const dotenv = require('dotenv')
dotenv.config()
const logger = require('morgan')
const compression = require('compression')
const databaseConnection = require('./database/config')
const { securedUser, securedAdmin } = require('./middlewares/authMiddleware')

databaseConnection()

const app = express()
app.use(compression())
app.use(express.json())
app.use(logger('dev'))

const jobTitleRouter = require('./routes/jobTitleRoute')
const authRouter = require('./routes/authRoute')
const clientRouter = require('./routes/clientRoute')
const orderRouter = require('./routes/order/orderRoute')

app.use('/client', securedUser, clientRouter)
app.use('/job-title', securedAdmin, jobTitleRouter)
app.use('/order', securedUser, orderRouter)
app.use('/auth', authRouter)

app.get('/', (req, res) => {
  res.send('<h1>Hello world!!!❤👋</h1>')
  res.end()
})

app.use((err, req, res, __) => {
  err.status = err.status ? err.status : 500

  res.status(err.status).json({ message: err.message })
})

const PORT = process.env.PORT || 5000

const server = app.listen(PORT, () => {
  console.log('server starting on port: ' + PORT)
})

module.exports = { app, server }
