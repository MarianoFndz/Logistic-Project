const { Router } = require('express')
const router = Router()
const controllers = require('../controllers/clientController')
const validates = require('../middlewares/validates/actions/clientAction')
const permissions = require('../middlewares/permissions/permissionsClientMiddleware')

router.get('/', permissions.all, controllers.all)
router.post('/', permissions.create, validates.create, controllers.create)

module.exports = router
