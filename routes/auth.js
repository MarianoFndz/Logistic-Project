const { Router } = require('express')
const router = Router()
const controller = require('../controllers/users')
const validates = require('../middlewares/actions/users')
const { validateCreate, validateAuth } = validates
const { create, login, all } = controller

router.post('/', validateCreate, create)

router.post('/login', validateAuth, login)

router.get('/', all)

module.exports = router
