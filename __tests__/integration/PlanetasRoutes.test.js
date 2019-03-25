const request = require('supertest')
const http = require('http-status')
const truncate = require('../utils/truncate')
const database = require('../../src/database')
const server = require('../../src')

describe('Planetas API Routes', () => {
  beforeEach(async () => {
    await truncate()
  })

  it('should receive a status code 200 and creates a planet in database when performs a POST to /api/planetas endpoint', async () => {
    const res = await request(server)
      .post('/api/planetas')
      .send({
        nome: 'Alderaan',
        clima: 'temperate',
        terreno: 'grasslands, mountains'
      })

    expect(res.status).toBe(http.OK)
    expect(res.body).toHaveProperty('mensagem')
    expect(res.body.mensagem).toBe('Planet saved successfully')
    expect(res.body).toHaveProperty('data')

    const novo = res.body.data.planeta

    const planeta = await database.connection.db
      .collection('planetas')
      .findOne({
        nome: novo.nome
      })

    expect(planeta).not.toBeNull()
    expect(planeta._id.toString()).toBe(novo._id.toString())
  })

  it('should receive a status code 500 when performs a POST to /api/planetas endpoint with invalid data', async () => {
    const res = await request(server)
      .post('/api/planetas')
      .send({
        nome: null,
        clima: 'temperate'
      })

    expect(res.status).toBe(http.INTERNAL_SERVER_ERROR)
    expect(res.body).toHaveProperty('mensagem')
    expect(res.body.mensagem).toBe(
      'Cannot save planet, please verify the sent data'
    )
    expect(res.body).toHaveProperty('error')
  })

  it('should receive a status code 200 and an array of planet objects when performs a GET to "/api/planetas" endpoint', async () => {
    const res = await request(server).get('/api/planetas')

    expect(res.status).toBe(http.OK)
    expect(res.body).toHaveProperty('count')
    expect(res.body).toHaveProperty('data')
    expect(res.body.data).toBeInstanceOf(Array)
  })

  it('should receive a status code 200 and an array that contains a planet object when performs a GET to "/api/planetas" endpoint filtering by name', async () => {
    const res = await request(server)
      .post('/api/planetas')
      .send({
        nome: 'Alderaan',
        clima: 'temperate',
        terreno: 'grasslands, mountains'
      })
    expect(res.status).toBe(http.OK)

    const res2 = await request(server)
      .post('/api/planetas')
      .send({
        nome: 'Tatooine',
        clima: 'aride',
        terreno: 'desert'
      })

    expect(res2.status).toBe(http.OK)

    const resQuery = await request(server)
      .get('/api/planetas')
      .query({
        nome: 'Alderaan'
      })

    expect(resQuery.status).toBe(http.OK)
    expect(resQuery.body).toHaveProperty('count')
    expect(resQuery.body).toHaveProperty('data')
    expect(resQuery.body.data).toBeInstanceOf(Array)

    expect(resQuery.body.count).toBe(1)
    expect(resQuery.body.data[0]).toHaveProperty('_id')
    expect(resQuery.body.data[0]).toHaveProperty('nome')
    expect(resQuery.body.data[0]).toHaveProperty('clima')
    expect(resQuery.body.data[0]).toHaveProperty('terreno')
  })

  it('should receive a status code 200 and an array that contains a planet object when performs a GET to "/api/planetas/:id" endpoint', async () => {
    const res = await request(server)
      .post('/api/planetas')
      .send({
        nome: 'Alderaan',
        clima: 'temperate',
        terreno: 'grasslands, mountains'
      })
    expect(res.status).toBe(http.OK)

    const res2 = await request(server)
      .post('/api/planetas')
      .send({
        nome: 'Tatooine',
        clima: 'aride',
        terreno: 'desert'
      })

    expect(res2.status).toBe(http.OK)
    const tatooine = res2.body.data.planeta

    const resId = await request(server).get(`/api/planetas/${tatooine._id}`)

    expect(resId.status).toBe(http.OK)

    expect(resId.body).toHaveProperty('count')
    expect(resId.body).toHaveProperty('data')
    expect(resId.body.data).toBeInstanceOf(Array)
    expect(resId.body.count).toBe(1)

    const planetaLocalizado = resId.body.data[0]

    expect(planetaLocalizado._id).toBe(tatooine._id)
    expect(planetaLocalizado.nome).toBe(tatooine.nome)
  })

  it('should receive a status code 200 and delete the planet object from database when performs a DELETE to "/api/planetas/:id" endpoint', async () => {
    const res = await request(server)
      .post('/api/planetas')
      .send({
        nome: 'Alderaan',
        clima: 'temperate',
        terreno: 'grasslands, mountains'
      })

    expect(res.status).toBe(http.OK)
    expect(res.body).toHaveProperty('mensagem')
    expect(res.body.mensagem).toBe('Planet saved successfully')
    expect(res.body).toHaveProperty('data')

    const novoPlaneta = res.body.data.planeta

    const resDel = await request(server).delete(
      `/api/planetas/${novoPlaneta._id}`
    )

    expect(resDel.status).toBe(http.OK)
    expect(resDel.body).toHaveProperty('mensagem')
    expect(resDel.body.mensagem).toBe('Planet deleted successfully')

    const planeta = await database.connection.db
      .collection('planetas')
      .findOne({
        nome: novoPlaneta.nome
      })

    expect(planeta).not.toBeInstanceOf(Object)
  })

  it('should receive a status code 500 when performs a DELETE to "/api/planetas/:id" endpoint passing an invalid ID', async () => {
    const res = await request(server)
      .post('/api/planetas')
      .send({
        nome: 'Alderaan',
        clima: 'temperate',
        terreno: 'grasslands, mountains'
      })

    expect(res.status).toBe(http.OK)
    expect(res.body).toHaveProperty('mensagem')
    expect(res.body.mensagem).toBe('Planet saved successfully')

    const resDel = await request(server).delete(`/api/planetas/abc123`)

    expect(resDel.status).toBe(http.INTERNAL_SERVER_ERROR)
    expect(resDel.body).toHaveProperty('mensagem')
    expect(resDel.body.mensagem).toBe('You have a error in planet delete')
  })

  afterAll(async () => {
    await database.disconnect()
    await server.close()
  })
})
