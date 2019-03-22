const httpStatus = require('http-status')
const Planeta = require('../models/Planeta')
// const http = require('http')

const PlanetasController = {
  async create (req, res) {
    const { nome, clima, terreno } = req.body
    const planeta = await Planeta.create({
      nome,
      clima,
      terreno
    }).catch(error => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
        mensagem: 'Cannot save planet, please try again',
        error
      })
    })

    if (planeta !== null) {
      res.status(httpStatus.OK).send({
        mensagem: 'Planet saved successfully',
        data: {
          planeta
        }
      })
    }
  },

  list (req, res) {
    Planeta.find((error, planetas) => {
      if (error) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
          mensagem: 'You have a error in planets listing',
          error
        })

        return
      }

      res.json({
        count: planetas.length,
        data: planetas
      })
    })
  }
}

module.exports = PlanetasController
