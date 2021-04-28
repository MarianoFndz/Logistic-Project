const moment = require("moment")
const uid = require("node-uuid")

function saveUser(data) {
	const { password } = data

	const passwordHashed = hash(password)

	const newUser = new User({
		...data,
		password: passwordHashed,
		verificationCode: uid(),
		dateExpirationCode: moment(new Date()).add(1, 'hours')
	})

	return newUser.save()
}

module.exports = {
	saveUser
}