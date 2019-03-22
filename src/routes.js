const router = require('express').Router()
const PlanetasController = require('./controller/PlanetasController')

router.get('/', (req, res) => {
  res.json({
    mensagem: 'Star Wars Challenge API endpoints',
    endpoints: []
  })
})

router.get('/planetas', PlanetasController.list)

router.post('/planetas', PlanetasController.create)

// router.get('/planetas', (req, res) => {})

module.exports = router
