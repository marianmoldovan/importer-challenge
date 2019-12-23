const MongoClient = require('mongodb').MongoClient
const app = require('./app/app')

// Create and constructs the mongodb client
const mongoClient = new MongoClient(process.env.MONGO_URI
  || 'mongodb://localhost:27017/admin', { useUnifiedTopology: true })
mongoClient.connect()

const dependencies = {
  mongoClient
}

// Create the app servers on the desired port or in the development port, 3000
const server = app(dependencies).listen(process.env.PORT || 3000)

// When we close the server, we also close the mongo client, so the process can die without hanging
server.on('close', () => {
  mongoClient.close()
})

module.exports = server
