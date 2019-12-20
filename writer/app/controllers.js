const neatCsv = require('neat-csv')

const upload = async (ctx, dbClient) => {
  try {
    const data = await neatCsv(ctx.req)
    const db = await ctx.deps.mongoClient.db('importer')
    await db.collection('data').insertMany(data)
    ctx.status = 202
  } catch (e) {
    ctx.body = e.message
    ctx.status = 400
  }
}

module.exports = {
  upload
}
