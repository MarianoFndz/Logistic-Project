const { Router } = require('express')
const router = Router()
const { createController, loginController, allController } = require('../controllers/usersController')
const validates = require('../middlewares/actions/usersAction')
const { validateCreate, validateAuth } = validates

router.post('/', validateCreate, createController)

router.get('/', allController)

router.post('/login', validateAuth, loginController)

module.exports = router
