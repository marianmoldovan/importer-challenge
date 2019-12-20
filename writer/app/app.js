const Koa = require('koa')
const koadepsi = require('koa-depsi')
const router = require('./routes')

function createApp(dependencies = {}) {
  const app = new Koa()
  app.use(koadepsi(dependencies))
  app.use(router.routes())
  app.use(router.allowedMethods())
  return app
}

module.exports = createApp
