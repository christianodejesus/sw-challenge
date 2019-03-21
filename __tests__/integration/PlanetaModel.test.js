const faker = require('faker');
const truncate = require('../utils/truncate');
const database = require('../../src/database');
const Planeta = require('../../src/models/planeta');

describe('Planeta Model', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should Planeta model creates a document in the database successfully', async () => {
    const planetaObj = {
      nome: faker.name.findName(),
      clima: faker.lorem.words(1),
      terreno: faker.lorem.words(2).replace(' ', ','),
      qtdeAparicoes: 2,
    };
    const newPlaneta = await Planeta.create(planetaObj);

    expect(newPlaneta).toHaveProperty('id');
    expect(newPlaneta.id).not.toBeNull();
  });

  afterAll(async () => {
    await database.disconnect();
  });
});
