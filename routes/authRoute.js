const { Router } = require('express')
const router = Router()
const controller = require('../controllers/usersController')
const validates = require('../middlewares/actions/usersAction')
const { securedAdmin } = require('../middlewares/authMiddleware')

router.post('/', securedAdmin, validates.create, controller.create)

router.get('/', securedAdmin, controller.all)

router.post('/login', validates.create, controller.login)

module.exports = router
