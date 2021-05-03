const { Router } = require('express')
const router = Router()
const controller = require('../controllers/authController')
const validates = require('../middlewares/validates/actions/usersAction')
const { securedUser } = require('../middlewares/authMiddleware')

router.post('/', securedUser, validates.create, controller.create)

router.get('/', securedUser, controller.all)

router.post('/login', validates.auth, controller.login)

module.exports = router
