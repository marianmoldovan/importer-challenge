const Koa = require('koa')
const koadepsi = require('koa-depsi')
const router = require('./routes')

// Factory function that creates the koa app
function createApp(dependencies = {}) {
  const app = new Koa()
  // We bind with koadepsi the external dependencies
  app.use(koadepsi(dependencies))
  // Set up routes from local file routes
  app.use(router.routes())
  app.use(router.allowedMethods())
  return app
}

// We return the factory method of the app, so we can reuse it in testing
module.exports = createApp
