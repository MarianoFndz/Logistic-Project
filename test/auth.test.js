const supertest = require('supertest')
const { app, server } = require('../index')
const mongoose = require('mongoose')
const UserModel = require('../models/UserModel')
const JobTitleModel = require('../models/JobTitleModel')
const { hash } = require('../utils/bcrypt')
const jobTitleMockGenerate = require('../mocks/jobTitleMock')
const userMockGenerate = require('../mocks/userMock')

const api = supertest(app)

const password = '1234'
const passwordHashed = hash(password)

const initialAdmin = {
  email: 'admin@gmail.com',
  password: passwordHashed,
  firstName: 'Admin',
  lastName: 'Admin',
  admin: true
}

const initialJobTitle = jobTitleMockGenerate({ CREATE_USER: true })

const initialUsers = userMockGenerate(['marianofernandez2480@gmail.com', 'marianofndz2480@gmail.com'])

describe('Auth', () => {
  const userCreated = initialUsers[0]
  const userToCreate = initialUsers[1]
  let jobTitleCreated

  beforeEach(async () => {
    await UserModel.deleteMany({})
    await JobTitleModel.deleteMany({})

    const admin = new UserModel(initialAdmin)
    await admin.save()

    const jobTitle = new JobTitleModel(initialJobTitle)
    await jobTitle.save()
    jobTitleCreated = jobTitle

    console.log(jobTitle, 'JOB TITLE')

    const dataUserCreated = userCreated.getUser()

    const user = new UserModel({ jobTitle, ...dataUserCreated })
    await user.save()
    console.log(user)
  })

  test('POST /login: returns token when I log in with Admin User', async () => {
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
  test('GET /: returns Content-Type:application-json and Status-Code 401', async () => {
    await api
      .get('/auth/')
      .expect(401)
      .expect('Content-Type', /application\/json/)
  })

  test('GET /all: return unauthorized for not having permissions', async () => {
    const response = await api
      .get('/auth/')

    const { body, statusCode } = response

    expect(body.message).toBe('Unauthorized')
    expect(statusCode).toBe(401)
  })

  test('POST /: return "unauthorized" for not having permissions', async () => {
    const responseLogin = await api
      .post('/auth/login')
      .send({
        email: userCreated.getEmail(),
        password: userCreated.getPassword()
      })
    const { JWT } = responseLogin.body

    const dataUserToCreate = userToCreate.getUser()

    const newUser = await api
      .post('/auth/')
      .set({ Authorization: `Token ${JWT}` })
      .send({ jobTitle: jobTitleCreated._id, ...dataUserToCreate })

    const { body, statusCode } = newUser

    expect(body.message).toBe('User created')
    expect(statusCode).toBe(201)
  })

  afterAll(() => {
    mongoose.connection.close()
    server.close()
  })
})
