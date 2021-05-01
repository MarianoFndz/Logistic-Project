const ClientModel = require('../models/ClientModel')

const all = async (req, res) => {
  const allClients = await ClientModel.find()
  res.json(allClients)
}

const create = async ({ body: data }, res) => {
  const newClient = new ClientModel(data)

  await newClient.save()

  res.status(201).json({ message: 'Client created' })
}

module.exports = {
  all,
  create
}
