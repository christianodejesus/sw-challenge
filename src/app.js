require('dotenv').config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
})
const express = require('express')
const bodyparser = require('body-parser')
const routes = require('./routes')

const app = express()

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: false }))
app.get('/', (req, res) => {
  res.json({
    mensagem: 'Star Wars Challenge API'
  })
})
app.use('/api', routes)

module.exports = app
