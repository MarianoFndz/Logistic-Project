const User = require('../models/UserModel')
const WorkPosition = require('../models/WorkPositionModel')

const validatePermissionsService = async (idUser, PERMISSION_CODE) => {
  const user = await User.findById({ _id: idUser })
  const workPosition = await WorkPosition.findById({ _id: user.workPosition })
  const permissionsAcepted = workPosition.permissions.get(PERMISSION_CODE)
  if (!permissionsAcepted) throw new Error('NO tenes autorizacion')
  return permissionsAcepted
}

module.exports = validatePermissionsService
