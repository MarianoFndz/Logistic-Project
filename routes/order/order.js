const { Router } = require('express')
const router = Router()

const controller = require('../../controllers/order')
const validates = require('../../middlewares/actions/order')

const packaging = require('./packaging')
const distributing = require('./distributing')
const transporting = require('./transporting')

router.get('/', controller.all)
router.post('/', validates.create, controller.create)
router.use('/packaging/', packaging)
router.use('/distributing', distributing)
router.use('/transporting', transporting)

module.exports = router
