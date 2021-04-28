const { Router } = require('express')
const router = Router()

const controllers = require('../../controllers/order/orderControlller')
const validates = require('../../middlewares/actions/orderAction')

const packagingRoute = require('./packagingRoute')
const distributingRoute = require('./distributingRoute')
const transportingRoute = require('./transportingRoute')

const permissions = require('../../middlewares/permissions/permissionsOrderMiddleware')

router.get('/', controllers.all)
router.post('/', permissions.create, validates.create, controllers.create)
router.use('/packaging/', permissions.packaging, packagingRoute)
router.use('/distributing', permissions.distributing, distributingRoute)
router.use('/transporting', permissions.transporting, transportingRoute)

module.exports = router
