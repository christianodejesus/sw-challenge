const router = require('express').Router()

router.get('/', (req, res) => {
  res.json({
    mensagem: 'Star Wars Challenge API'
  })
})

// router.get('/planetas', (req, res) => {})

module.exports = router
