const permissionCodes = require('../../utils/permissionsCodes')

const checkPermissionsService = require('../../services/validatePermissionsService')

const permissionsCreateMiddleware = async ({ id: idUser }, res, next) => {
  try {
    await checkPermissionsService(idUser, permissionCodes.CLIENT_CREATE)
    next()
  } catch (e) {
    next(e)
  }
}

module.exports = {
  permissionsCreateMiddleware
}
