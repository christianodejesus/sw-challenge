const request = require('supertest');
const http = require('http-status');
const server = require('../../src/');

describe('Main Route.', () => {
  it('should receive a OK status code when navigate to "/" url and receive a message', async () => {
    const res = await request(server).get('/');

    expect(res.status).toBe(http.OK);
    expect(res.body).toHaveProperty('mensagem');
    expect(res.body.mensagem).toBe('Star Wars Challenge API');
  });

  afterAll(async () => {
    await server.close();
  });
});
