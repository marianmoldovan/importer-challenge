const Koa = require('koa')
const Router = require('@koa/router')
const mongo = require('koa-mongo')

const controller = require('./controller')

const app = new Koa()
const router = new Router()
const db = mongo({
  uri: process.env.MONGO_URI || 'mongodb://localhost:27017/admin'
})

router.post('/upload', controller.upload)

app.use(db)
app.use(router.routes())
app.use(router.allowedMethods());

module.exports = app.listen(3000)
