const request = require('supertest')
const httpStatus = require('http-status')
const server = require('../../src/')
const database = require('../../src/database')

describe('Main API Routes', () => {
  it('should receive a OK (200) status code when performs a GET to "/" endpoint and receive a message', async () => {
    const res = await request(server).get('/')

    expect(res.status).toBe(httpStatus.OK)
    expect(res.body).toHaveProperty('mensagem')
    expect(res.body.mensagem).not.toBeNull()
  })

  it('should receive a OK (200) status code when performs a GET to "/api" endpoint and receive a message', async () => {
    const res = await request(server).get('/api')

    expect(res.status).toBe(httpStatus.OK)
    expect(res.body).toHaveProperty('mensagem')
  })

  afterAll(async () => {
    await database.disconnect()
    await server.close()
  })
})
