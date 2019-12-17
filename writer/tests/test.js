const { createReadStream } = require('fs')
const { assert } = require('chai')
const path = require('path')
const fetch = require('node-fetch')

describe('Test post endpoint', () => {

  const app = require('../app.js')

  after(() => {
    app.close()
    process.exit()
  })

  it('POST /upload should return 202', async () => {
    const stream = createReadStream(path.join(__dirname, 'sample.csv'))
    const response = await fetch('http://localhost:3000/upload', {
      method: 'POST',
      body: stream
    })
    assert.equal(response.status, 202)
  })

})
