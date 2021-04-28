const Order = require('../../models/OrderModel')

const all = async (req, res) => {
	const allOrders = await Order.find()
	res.json(allOrders)
}

const create = ({ body: data, id }, res) => {
	const newOrder = new Order({
		user: id,
		...data
	})

	Order
		.create(newOrder)
		.then(() => {
			res.status(201).json({ message: 'Order created' })
		})
}

module.exports = {
	all,
	create
}
