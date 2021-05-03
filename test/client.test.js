const supertest = require('supertest')
const app = require('../index')
const mongoose = require('mongoose')
const UserModel = require('../models/UserModel')
const JobTitleModel = require('../models/JobTitleModel')
const ClientModel = require('../models/ClientModel')
const jobTitleMockGenerate = require('../mocks/jobTitleMock')
const userMock = require('../mocks/userMock')
const clientsMock = require('../mocks/clientMock')

const api = supertest(app)

const initialJobTitleWithPermissions = jobTitleMockGenerate({ CLIENT_CREATE: true, CLIENT_ALL: true })
const initialJobTitleNOTPermissions = jobTitleMockGenerate()

const initialUsers = userMock.usersMockGenerate(['marianofernandez2480@gmail.com', 'marianofndz2480@gmail.com'])

const initialClients = clientsMock.manyClients(5)

console.log(initialClients, '--------------------------')

describe('Client', () => {
  const userCreatedWithPermissions = initialUsers[0]
  const userCreatedNOTPermissions = initialUsers[1]

  beforeEach(async () => {
    await UserModel.deleteMany({})
    await JobTitleModel.deleteMany({})
    await ClientModel.deleteMany({})

    const jobTitleWithPermissions = new JobTitleModel(initialJobTitleWithPermissions)
    await jobTitleWithPermissions.save()

    const jobTitleNOTPermissions = new JobTitleModel(initialJobTitleNOTPermissions)
    await jobTitleNOTPermissions.save()

    console.log(jobTitleWithPermissions._id, jobTitleNOTPermissions._id, 'JOB TITLE')

    const dataUserWithPermissions = userCreatedWithPermissions.getUser()
    const userWithPermissions = new UserModel({ jobTitle: jobTitleWithPermissions._id, ...dataUserWithPermissions })
    await userWithPermissions.save()

    const dataUserNOTPermissions = userCreatedNOTPermissions.getUser()
    const userNOTPermissions = new UserModel({ jobTitle: jobTitleNOTPermissions._id, ...dataUserNOTPermissions })
    await userNOTPermissions.save()

    // for (let i = 0; i < initialClients.length; i++) {
    //   const newClient = new ClientModel(initialClients[i])
    //   await newClient.save()
    // }

    const clients = initialClients.map(async element => {
      const newClient = new ClientModel(element)
      return newClient.save()
    })

    await Promise.all(clients)
  })

  test("POST /: return 'Client created'", async () => {
    const response = await api
      .post('/auth/login')
      .send({
        email: userCreatedWithPermissions.getEmail(),
        password: userCreatedWithPermissions.getPassword()
      })

    const { JWT } = response.body

    const newClientResponse = await api
      .post('/client/')
      .set({ Authorization: `Token ${JWT}` })
      .send(clientsMock.oneClient())

    const { message } = newClientResponse.body

    expect(message).toBe('Client created')
  })

  test('GET /: return all clients', async () => {
    const response = await api
      .post('/auth/login')
      .send({
        email: userCreatedWithPermissions.getEmail(),
        password: userCreatedWithPermissions.getPassword()
      })

    const { JWT } = response.body

    const newClientResponse = await api
      .get('/client/')
      .set({ Authorization: `Token ${JWT}` })

    const { body } = newClientResponse

    expect(body.length).toBe(initialClients.length)
  })

  afterAll(() => {
    mongoose.connection.close()
  })
})
