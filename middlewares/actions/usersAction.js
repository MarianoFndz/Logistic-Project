const schema = require('../schema/usersSchema')

const create = (req, res, next) => {
	const { error } = schema.create.validate(req.body)
	error ? res.status(422).json({ message: error.details[0].message }) : next()
}

const auth = (req, res, next) => {
	const { error } = schema.auth.validate(req.body)
	error ? res.status(422).json({ message: error.details[0].message }) : next()
}

const validates = {
	create,
	auth
}

module.exports = validates
