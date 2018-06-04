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
  Mutation: {
    createPokemon,
  },
};
