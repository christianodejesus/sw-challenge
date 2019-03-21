const database = require('../../src/database');

module.exports = () => {
  Promise.all(
    Object.keys(database.models).map(modelName => database.model(modelName).deleteMany({})),
  );
};
