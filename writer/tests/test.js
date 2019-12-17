const { createReadStream } = require('fs')
const { assert } = require('chai')
const path = require('path')
const fetch = require('node-fetch')

const app = require('../app.js')

after(() => {
  app.close()
})

describe('Test post endpoint', () => {
  it('POST /upload should return 202', async () => {
    const stream = createReadStream(path.join(__dirname, 'sample.csv'))
    const response = await fetch('http://localhost:3000/upload', {
      method: 'POST',
      body: stream
    })
    assert.equal(response.status, 202)
  })
})
