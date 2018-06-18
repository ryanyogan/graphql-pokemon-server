const pokemon = (_, { id }, ctx) =>
  ctx.modules.pokemon.getPokemon({ id, pokemonModel: ctx.models.pokemon });

const allPokemons = (_, { limit = 20 }, ctx) =>
  ctx.modules.pokemon.getAllPokemon({
    limit,
    pokemonModel: ctx.models.pokemon,
  });

module.exports = {
  Query: {
    pokemon,
    allPokemons,
  },

  Pokemon: {
    classification: parent => parent.misc.classification,
    height: parent => parent.misc.height,
    weight: parent => parent.misc.weight,
    happiness: parent => parent.misc.happiness,
  },
};
