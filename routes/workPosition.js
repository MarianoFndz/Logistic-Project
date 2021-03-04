const { Router } = require('express')
const router = Router()
const controller = require('../controllers/workPosition')
const validates = require('../middlewares/actions/workPosition')

router.get('/', controller.all)
router.post('/', validates.validateCreate, controller.create)

module.exports = router
