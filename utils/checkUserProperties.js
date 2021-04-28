const UserModel = require("../models/UserModel")
const { unhash } = require("./bcrypt")

function checkEmail(email) {
	return UserModel.findOne({ email }, { password: 1, admin: 1 })
}

function checkPassword(password, passwordHashed) {
	const isPasswordValid = unhash(password, passwordHashed)

	if (!isPasswordValid) throw new LoginError()
}

module.exports = {
	checkEmail,
	checkPassword
}