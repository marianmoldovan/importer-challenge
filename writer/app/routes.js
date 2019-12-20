const Router = require('@koa/router')
const controller = require('./controllers')

const router = Router()
router.post('/upload', controller.upload)

module.exports = router
