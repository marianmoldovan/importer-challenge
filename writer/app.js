const Koa = require('koa')
const Router = require('@koa/router')
const controller = require('./controller')

const app = new Koa()
const router = new Router()

router.post('/upload', controller.upload)

app.use(router.routes())
app.use(router.allowedMethods());

module.exports = app.listen(3000)
