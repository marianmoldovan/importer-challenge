const MongoClient = require('mongodb').MongoClient
const app = require('./app/app')

const mongoClient = new MongoClient(process.env.MONGO_URI
  || 'mongodb://localhost:27017/admin', { useUnifiedTopology: true })
mongoClient.connect()

const dependencies = {
  mongoClient
}

const server = app(dependencies).listen(process.env.PORT || 3000)

server.on('close', () => {
  mongoClient.close()
})

module.exports = server
