const merge = require('lodash/merge');
const pokemon = require('./pokemon');
const team = require('./team');
const loaders = require('./loaders');

module.exports = {
  typeDefs: [pokemon.typeDefs, team.typeDefs].join(' '),
  resolvers: merge({}, pokemon.resolvers, team.resolvers),
  context: {
    models: {
      pokemon: pokemon.model,
      team: team.model,
    },
    modules: {
      pokemon: pokemon.modules,
      team: team.modules,
    },
    loaders: loaders(),
  },
};
