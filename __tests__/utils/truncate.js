const database = require('../../src/database')

module.exports = async () => {
  await Promise.all(
    Object.keys(database.models).map(async modelName => {
      await database.model(modelName).deleteMany({})
    })
  )
}
