const httpStatus = require('http-status')
const Planeta = require('../models/Planeta')
const swapi = require('swapi-node')

const Util = {
  async getExternalPlanetInfo (planeta) {
    const planetInfo = await swapi
      .get(`https://swapi.co/api/planets/?search=${planeta.nome}`)
      .then(result => {
        return result
      })

    const qtdeAparicoesFilmes =
      planetInfo.count > 0 ? planetInfo.results[0].films.length : 0

    return {
      _id: planeta._id,
      nome: planeta.nome,
      clima: planeta.clima,
      terreno: planeta.terreno,
      qtdeAparicoesFilmes
    }
  }
}

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

    await Planeta.find(filters, async (error, planetas) => {
      if (error) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
          mensagem: 'You have a error in planets listing',
          error
        })
      }

      if (planetas.length > 0) {
        for (let i = 0; i < planetas.length; i++) {
          planetas[i] = await Util.getExternalPlanetInfo(planetas[i])
        }
      }

      return res.json({
        count: planetas.length,
        data: planetas
      })
    })
  },

  async show (req, res) {
    const id = req.params.id

    await Planeta.findById(id, async (error, planeta) => {
      if (error) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
          mensagem: 'You have a error in planet filter',
          error
        })
      }

      planeta = await Util.getExternalPlanetInfo(planeta)

      return res.json({
        count: 1,
        data: [planeta]
      })
    })
  },

  async remove (req, res) {
    const id = req.params.id

    try {
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
    } catch (error) {}
  }
}

module.exports = PlanetasController
