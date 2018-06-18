const merge = require('lodash/merge');
const pokemon = require('./pokemon');

module.exports = {
  typeDefs: [pokemon.typeDefs].join(' '),
  resolvers: merge({}, pokemon.resolvers),
  context: {
    models: {
      pokemon: pokemon.model,
    },
  },
};
