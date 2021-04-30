const supertest = require('supertest')
const { app, server } = require('../index')
const mongoose = require('mongoose')
const UserModel = require('../models/UserModel')

const api = supertest(app)

const initialAdmin = {
  email: 'admin@gmail.com',
  password: '$2b$10$v0DlS.W3CKIyFZT04zidEub5s.zxVqBF0waNy9c.oec4I2rBXrYvm',
  firstName: 'Admin',
  lastName: 'Admin',
  admin: true
}

describe('Auth - get All', () => {
  beforeEach(async () => {
    await UserModel.deleteMany({})

    const admin = new UserModel(initialAdmin)
    await admin.save()
  })

  afterAll(() => {
    mongoose.connection.close()
    server.close()
  })

  test.skip('returns Content-Type:application-json', async () => {
    await api
      .get('/auth/')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('returns token when I log in', async () => {
    const response = await api
      .post('/auth/login')
      .send({
        email: 'admin@gmail.com',
        password: '1234'
      })
    const { message, JWT } = response.body

    expect(message).toBe('Bienvenid@')
    expect(typeof JWT).toBe('string')
  })
})
