const router = require('express').Router()
const PlanetasController = require('./controller/PlanetasController')

router.get('/', (req, res) => {
  res.json({
    mensagem: 'Star Wars Challenge API endpoints',
    endpoints: []
  })
})

router.get('/planetas', PlanetasController.list)
router.get('/planetas/:id', PlanetasController.show)
router.post('/planetas', PlanetasController.create)
router.delete('/planetas/:id', PlanetasController.remove)

module.exports = router
