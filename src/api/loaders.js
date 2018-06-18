const DataLoader = require('dataloader');
const _ = require('lodash');
const Pokemon = require('./pokemon/pokemon.model');

const createPokemonLoader = () =>
  new DataLoader(pokemonIds =>
    Pokemon.find({ _id: { $in: pokemonIds } })
      .exec()
      .then(pokemons => {
        const pokemonsById = _.keyBy(pokemons, '_id');
        return pokemonIds.map(pokemonId => pokemonsById[pokemonId]);
      }),
  );

module.exports = () => ({
  pokemon: createPokemonLoader(),
});
