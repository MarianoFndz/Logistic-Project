const { Router } = require('express')
const router = Router()
const controller = require('../controllers/client/client')
const validates = require('../middlewares/actions/client')

router.get('/', controller.all)
router.post('/', validates.create, controller.create)

module.exports = router
