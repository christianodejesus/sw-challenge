const httpStatus = require('http-status')
const Planeta = require('../models/Planeta')
// const http = require('http')

const PlanetasController = {
  async create (req, res) {
    const { nome, clima, terreno } = req.body
    const dataToSave = {
      nome,
      clima,
      terreno
    }

    await Planeta.create(dataToSave, (error, planeta) => {
      if (error) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
          mensagem: 'Cannot save planet, please verify the sent data',
          error
        })
      }

      return res.status(httpStatus.OK).send({
        mensagem: 'Planet saved successfully',
        data: {
          planeta
        }
      })
    })
  },

  async list (req, res) {
    const filters = {}

    if (req.query.nome !== undefined) {
      filters['nome'] = {
        $regex: `.*${req.query.nome}.*`,
        $options: '-i'
      }
    }

    await Planeta.find(filters, (error, planetas) => {
      if (error) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
          mensagem: 'You have a error in planets listing',
          error
        })
      }

      return res.json({
        count: planetas.length,
        data: planetas
      })
    })
  },

  async show (req, res) {
    const id = req.params.id

    await Planeta.findById(id, (error, planeta) => {
      if (error) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
          mensagem: 'You have a error in planet filter',
          error
        })
      }

      return res.json({
        count: 1,
        data: [planeta]
      })
    })
  },

  async remove (req, res) {
    const id = req.params.id

    await Planeta.findByIdAndDelete(id, (error, planeta) => {
      if (error) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
          mensagem: 'You have a error in planet delete',
          error
        })
      }

      return res.json({
        mensagem: 'Planet deleted successfully'
      })
    })
  }
}

module.exports = PlanetasController
