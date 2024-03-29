const User = require('../models/UserModel')
const JobTitleModel = require('../models/JobTitleModel')
const { UnauthorizedError } = require('../customErrors')

const validatePermissionsService = async (idUser, PERMISSION_CODE) => {
  const user = await User.findById({ _id: idUser })

  if (user.admin === true) return 'Authorized'
  console.log(user.jobTitle, '___________________________')

  const jobTitle = await JobTitleModel.findById({ _id: user.jobTitle })
  const permissionsAcepted = jobTitle.permissions.get(PERMISSION_CODE)
  if (!permissionsAcepted) throw new UnauthorizedError()
  return 'Authorized'
}

module.exports = validatePermissionsService
