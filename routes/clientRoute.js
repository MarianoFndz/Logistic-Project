const { Router } = require('express')
const router = Router()
const { allController, createController } = require('../controllers/clientController')
const { createValidate } = require('../middlewares/actions/clientAction')
const { permissionsCreateMiddleware } = require('../middlewares/permissions/permissionsClientMiddleware')

router.get('/', allController)
router.post('/', permissionsCreateMiddleware, createValidate, createController)

module.exports = router
