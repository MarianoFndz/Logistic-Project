const permissionCodes = require('../../utils/permissionsCodes')

const checkPermissionsService = require('../../services/validatePermissionsService')

const permissionsCreateMiddleware = async ({ id: idUser }, res, next) => {
  try {
    await checkPermissionsService(idUser, permissionCodes.ORDER_CREATE)
    next()
  } catch (e) {
    next(e)
  }
}

const permissionsPackagingMiddleware = async ({ id: idUser }, res, next) => {
  try {
    await checkPermissionsService(idUser, permissionCodes.ORDER_PACKAGING)
    next()
  } catch (e) {
    next(e)
  }
}

const permissionsDistributingMiddleware = async ({ id: idUser }, res, next) => {
  try {
    await checkPermissionsService(idUser, permissionCodes.ORDER_DISTRIBUTING)
    next()
  } catch (e) {
    next(e)
  }
}

const permissionsTransportingMiddleware = async ({ id: idUser }, res, next) => {
  try {
    await checkPermissionsService(idUser, permissionCodes.ORDER_TRANSPORTING)
    next()
  } catch (e) {
    next(e)
  }
}

module.exports = {
  permissionsCreateMiddleware,
  permissionsPackagingMiddleware,
  permissionsDistributingMiddleware,
  permissionsTransportingMiddleware
}
