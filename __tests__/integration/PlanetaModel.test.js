const truncate = require('../utils/truncate')
const Planeta = require('../../src/models/Planeta')

describe('Model Planeta', () => {
  beforeEach(async () => {
    await truncate()
  })

  it('should Planeta model creates a document in the database successfully', async () => {
    const planeta = await Planeta.create({
      nome: 'Alderaan',
      clima: 'temperate',
      terreno: 'grasslands, mountains'
    })

    expect(planeta).toHaveProperty('id')
    expect(planeta.id).not.toBeNull()
  })

  afterAll(async () => {
    await Planeta.db.close()
  })
})
