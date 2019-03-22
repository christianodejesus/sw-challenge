require('dotenv').config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
})
const express = require('express')
const bodyparser = require('body-parser')
const router = require('./routes')
// const database = require('./database')

const app = express()

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: false }))
app.use(router)

module.exports = app
