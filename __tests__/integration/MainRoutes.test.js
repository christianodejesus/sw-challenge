const request = require('supertest')
const http = require('http-status')
const server = require('../../src/')

describe('Main API Routes', () => {
  it('should receive a OK (200) status code when navigate to "/" url and receive a message', async () => {
    const res = await request(server).get('/')

    expect(res.status).toBe(http.OK)
    expect(res.body).toHaveProperty('mensagem')
    expect(res.body.mensagem).not.toBeNull()
  })

  it('should receive a OK (200) status code when navigate to "/api" url and receive a message', async () => {
    const res = await request(server).get('/api')

    expect(res.status).toBe(http.OK)
    expect(res.body).toHaveProperty('mensagem')
  })

  afterAll(async () => {
    await server.close()
  })
})
