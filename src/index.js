const app = require('./app')

const server = app.listen(process.env.PORT || 3000)

module.exports = server
