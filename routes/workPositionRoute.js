const { Router } = require('express')
const router = Router()
const controller = require('../controllers/workPositionController')
const validates = require('../middlewares/actions/workPositionAction')

router.get('/', controller.all)
router.post('/', validates.validateCreate, controller.create)

module.exports = router
