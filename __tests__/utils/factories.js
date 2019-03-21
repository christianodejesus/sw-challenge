const faker = require('faker');
const { factory } = require('factory-girl');
const Planeta = require('../../src/models/planeta');

factory.define('Planeta', Planeta, {
  nome: faker.name.findName(),
  clima: faker.lorem.words(1),
  terreno: faker.lorem.words(2).replace(' ', ','),
  qtdeAparicoes: 2,
});

module.exports = factory;
