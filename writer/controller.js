const neatCsv = require('neat-csv')

const upload = async (ctx, next) => {
  try {
    const data = await neatCsv(ctx.req)
    const db = ctx.mongo.db('importer')
    await db.collection('inventory').insertMany(data)
    ctx.status = 202
  } catch (e) {
    ctx.body = e.message
    ctx.status = 400
  }

}

module.exports = {
  upload
}
