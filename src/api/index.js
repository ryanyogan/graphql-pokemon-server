const merge = require('lodash/merge');
const pokemon = require('./pokemon');
const team = require('./team');
const loaders = require('./loaders');

module.exports = {
  typeDefs: [pokemon.typeDefs].join(' '),
  resolvers: merge({}, pokemon.resolvers),
  context: {
    models: {
      pokemon: pokemon.model,
      team: team.model,
    },
    loaders: loaders(),
  },
};
