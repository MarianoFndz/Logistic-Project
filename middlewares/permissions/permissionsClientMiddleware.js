const permissionCodes = require('../../utils/permissionsCodes')

const checkPermissionsService = require('../../services/validatePermissionsService')

const create = async ({ id: idUser }, res, next) => {
	try {
		await checkPermissionsService(idUser, permissionCodes.CLIENT_CREATE)
		next()
	} catch (e) {
		next(e)
	}
}

const all = async ({ id: idUser }, res, next) => {
	try {
		await checkPermissionsService(idUser, permissionCodes.CLIENT_ALL)
		next()
	} catch (e) {
		next(e)
	}
}

module.exports = {
	create,
	all
}
