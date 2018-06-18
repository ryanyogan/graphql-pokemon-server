const pokemon = (_, { id }, ctx) => ctx.models.pokemon.findById(id).exec();

const allPokemons = (_, { limit = 20 }, ctx) =>
  ctx.models.pokemon
    .find({})
    .limit(limit)
    .exec();

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
