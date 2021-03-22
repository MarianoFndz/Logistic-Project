const { Router } = require('express')
const router = Router()

const { allController, createController } = require('../../controllers/order/orderControlller')
const { createValidate } = require('../../middlewares/actions/orderAction')

const packagingRoute = require('./packagingRoute')
const distributingRoute = require('./distributingRoute')
const transportingRoute = require('./transportingRoute')

const {
  permissionsCreateMiddleware,
  permissionsPackagingMiddleware,
  permissionsDistributingMiddleware,
  permissionsTransportingMiddleware
} = require('../../middlewares/permissions/permissionsOrderMiddleware')

router.get('/', allController)
router.post('/', permissionsCreateMiddleware, createValidate, createController)
router.use('/packaging/', permissionsPackagingMiddleware, packagingRoute)
router.use('/distributing', permissionsDistributingMiddleware, distributingRoute)
router.use('/transporting', permissionsTransportingMiddleware, transportingRoute)

module.exports = router
