const Router = require('../framework/Router')
const router = new Router()
const controller = require('./user-controller')

router.get('/users', controller.userGet)

router.post('/users', controller.userCreate)

module.exports = router