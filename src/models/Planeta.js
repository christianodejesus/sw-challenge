const mongoose = require('../database')

const PlanetaSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
    unique: true
  },
  clima: {
    type: String,
    required: true
  },
  terreno: {
    type: String,
    required: true
  }
})

const Planeta = mongoose.model('Planeta', PlanetaSchema)

module.exports = Planeta
