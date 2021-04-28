const { Router } = require('express')
const router = Router()

const controller = require('../../controllers/order/packagingController')

router.post('/start/:orderId', controller.start)
router.post('/finish/:orderId', controller.finish)

module.exports = router
