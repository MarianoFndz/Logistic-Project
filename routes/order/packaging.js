const { Router } = require('express')
const router = Router()

const controller = require('../../controllers/packaging')
// const validates = require('../../middlewares/actions/order')
const { startController, finishController } = controller

router.post('/start/:orderId', startController)
router.post('/finish/:orderId', finishController)

module.exports = router
