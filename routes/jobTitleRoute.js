const { Router } = require('express')
const router = Router()
const controller = require('../controllers/jobTitleController')
const validates = require('../middlewares/validates/actions/jobTitleAction')

router.get('/', controller.all)
router.post('/', validates.validateCreate, controller.create)

module.exports = router
