require('dotenv').config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
})

const mongoose = require('mongoose')

const dbUrl = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${
  process.env.DB_NAME
}`

mongoose.connect(dbUrl, { useNewUrlParser: true })
mongoose.Promise = global.Promise

module.exports = mongoose
