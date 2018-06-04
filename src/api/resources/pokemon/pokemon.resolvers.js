import { Pokemon } from './pokemon.model';

const getOnePokemon = (_, { id }) => Pokemon.findById(id).exec();

const getAllPokemons = () => Pokemon.find({}).exec();

const createPokemon = (_, { input: { name, imageUrl, classification } }) =>
  Pokemon.create({
    imageUrl,
    name,
    classification,
  });

export const pokemonResolvers = {
  Query: {
    Pokemon: getOnePokemon,
    getAllPokemons,
  },
  Pokemon: {
    classification: parent => parent.misc.classification,
    height: parent => parent.misc.height,
    weight: parent => parent.misc.weight,
    happiness: parent => parent.misc.happiness,
  },
  Mutation: {
    createPokemon,
  },
};
