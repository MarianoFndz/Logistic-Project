const supertest = require('supertest')
const app = require('../index')
const mongoose = require('mongoose')
const UserModel = require('../models/UserModel')
const JobTitleModel = require('../models/JobTitleModel')
const jobTitleMockGenerate = require('../mocks/jobTitleMock')
const userMock = require('../mocks/userMock')

const api = supertest(app)

const initialAdmin = userMock.userAdminMockGenerate()

const initialJobTitle = jobTitleMockGenerate({ CREATE_USER: true })

const initialUsers = userMock.usersMockGenerate(['marianofernandez2480@gmail.com', 'marianofndz2480@gmail.com'])

describe('Auth', () => {
  const userCreated = initialUsers[0]
  const userToCreate = initialUsers[1]
  let jobTitleCreated

  beforeEach(async () => {
    await UserModel.deleteMany({})
    await JobTitleModel.deleteMany({})

    const dataAdmin = initialAdmin.getUser()
    const admin = new UserModel(dataAdmin)
    await admin.save()

    jobTitleCreated = new JobTitleModel(initialJobTitle)
    await jobTitleCreated.save()

    const dataUserCreated = userCreated.getUser()
    const user = new UserModel({ jobTitleCreated, ...dataUserCreated })
    await user.save()
  })

  test('POST /login: returns token when I log in with Admin User', async () => {
    const response = await api
      .post('/auth/login')
      .send({
        email: initialAdmin.getEmail(),
        password: initialAdmin.getPassword()
      })
    const { message, JWT } = response.body

    expect(message).toBe('Bienvenid@')
    expect(typeof JWT).toBe('string')
  })
  test('POST /login: returns token when I log in with normal user', async () => {
    const response = await api
      .post('/auth/login')
      .send({
        email: userCreated.getEmail(),
        password: userCreated.getPassword()
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

  test('POST /: create a new user and return "unauthorized" for not having permissions', async () => {
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
  })
})
