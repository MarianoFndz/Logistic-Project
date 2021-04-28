const { Router } = require('express')
const router = Router()

const controller = require('../../controllers/order/distributingController')

router.post('/start/:orderId', controller.start)
router.post('/finish/:orderId', controller.finish)

module.exports = router
