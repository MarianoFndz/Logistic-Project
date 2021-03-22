const permissionsCodes = require('./permissionsCodes')

function checkPermissions (permissions) {
  for (const code in permissions) {
    if (typeof permissions[code] !== 'boolean') throw new Error('Pone booleanos')
    if (!permissionsCodes[code]) throw new Error('Permission Code not exists')
  }
}

module.exports = checkPermissions
