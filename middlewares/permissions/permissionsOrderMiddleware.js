const permissionCodes = require('../../utils/permissionsCodes')

const checkPermissionsService = require('../../services/validatePermissionsService')

const create = async ({ id: idUser }, res, next) => {
  try {
    await checkPermissionsService(idUser, permissionCodes.ORDER_CREATE)
    next()
  } catch (e) {
    next(e)
  }
}

const packaging = async ({ id: idUser }, res, next) => {
  try {
    await checkPermissionsService(idUser, permissionCodes.ORDER_PACKAGING)
    next()
  } catch (e) {
    next(e)
  }
}

const distributing = async ({ id: idUser }, res, next) => {
  try {
    await checkPermissionsService(idUser, permissionCodes.ORDER_DISTRIBUTING)
    next()
  } catch (e) {
    next(e)
  }
}

const transporting = async ({ id: idUser }, res, next) => {
  try {
    await checkPermissionsService(idUser, permissionCodes.ORDER_TRANSPORTING)
    next()
  } catch (e) {
    next(e)
  }
}

module.exports = {
  create,
  packaging,
  distributing,
  transporting
}
