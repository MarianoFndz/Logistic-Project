const Client = require('../models/ClientModel')

const all = async (req, res) => {
	const allClients = await Client.find()
	res.json(allClients)
}

const create = ({ body: data }, res) => {
	const newClient = new Client(data)

	Client
		.create(newClient)
		.then(() => {
			res.status(201).json({ message: 'Client created' })
		})
}

module.exports = {
	all,
	create
}
