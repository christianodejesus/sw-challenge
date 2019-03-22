const request = require('supertest')
const http = require('http-status')
const truncate = require('../utils/truncate')
const database = require('../../src/database')
const server = require('../../src')

describe('Planetas API Routes', () => {
  beforeEach(async () => {
    await truncate()
  })

  it('should receive a status code 200 and creates a planet in database when performs a post to /api/planetas endpoint', async () => {
    const res = await request(server)
      .post('/api/planetas')
      .send({
        nome: 'Alderaan',
        clima: 'temperate',
        terreno: 'grasslands, mountains'
      })
    expect(res.status).toBe(http.OK)
    expect(res.body).toHaveProperty('mensagem')
    expect(res.body).toHaveProperty('data')

    const novo = res.body.data.planeta

    const planeta = await database.connection.db
      .collection('planetas')
      .findOne({
        nome: 'Alderaan'
      })
    expect(planeta).not.toBeNull()
    expect(planeta.id).toBe(novo.id)
  })

  it('should receive a status code 200 and an array of planets when performs a get to "/api/planetas" endpoint', async () => {
    const res = await request(server).get('/api/planetas')
    expect(res.status).toBe(http.OK)
    expect(res.body).toHaveProperty('count')
    expect(res.body).toHaveProperty('data')
    expect(res.body.data).toBeInstanceOf(Array)
  })

  afterAll(async () => {
    await database.disconnect()
    await server.close()
  })
})
