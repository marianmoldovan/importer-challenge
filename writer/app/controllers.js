const neatCsv = require('neat-csv')

// The single handler of the upload endpoint. Takes a csv file, parses it and it gets inserted in the db
const upload = async (ctx) => {
  try {
    // We  allow neat csv library parse and save in memory the database
    const data = await neatCsv(ctx.req)
    const db = await ctx.deps.mongoClient.db('importer')
    // We insert the documents in the data collection
    await db.collection('data').insertMany(data)
    ctx.status = 202
  } catch (e) {
    // If something went wrong, we will inform with the error
    ctx.body = e.message
    ctx.status = 400
  }
}

module.exports = {
  upload
}
