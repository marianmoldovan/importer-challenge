const { createReadStream } = require('fs')
const { expect } = require('chai')
const path = require('path')
const fetch = require('node-fetch')
const MongoClient = require('mongodb').MongoClient
const mongoUnit = require('mongo-unit')

const app = require('../app/app.js')

describe('Test post endpoint', async () => {

  let mongoClient, server

  before(async () => {
    await mongoUnit.start()
    mongoClient = new MongoClient(mongoUnit.getUrl(), { useUnifiedTopology: true })
    mongoClient.connect()
    server = app({ mongoClient }).listen(3000)
    server.on('close', () => {
     mongoClient.close()
    })
  })

  after(() => {
    server.close()
    return mongoUnit.stop()
  })

  it('POST /upload should return 202', async () => {
    const stream = createReadStream(path.join(__dirname, 'sample.csv'))
    const response = await fetch('http://localhost:3000/upload', {
      method: 'POST',
      body: stream
    })
    expect(response.status).to.be.equal(202)
  })

  it('Mongo collecion should have 4 members and contain some ', async () => {
    const db = await mongoClient.db('importer')
    const queryCursor = await db.collection('data').find()
    let itemsCount = await queryCursor.count()
    expect(itemsCount).to.be.equal(4)
    let item = await queryCursor.next()
    expect(item).to.include.keys('Country', 'Sector', 'Parent sector')
  })

})
