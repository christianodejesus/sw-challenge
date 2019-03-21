const mongoose = require('mongoose');

const PlanetaSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
    unique: true,
  },
  clima: {
    type: String,
    required: true,
  },
  terreno: {
    type: String,
    required: true,
  },
  qtdeAparicoes: {
    type: Number,
    required: true,
  },
});

const Planeta = mongoose.model('Planeta', PlanetaSchema);

module.exports = Planeta;
