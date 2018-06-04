import { Pokemon } from './pokemon.model';

const getOnePokemon = (_, { id }) => Pokemon.findById(id).exec();

const getAllPokemons = () => Pokemon.find({}).exec();

export const pokemonResolvers = {
  Query: {
    Pokemon: getOnePokemon,
    getAllPokemons,
  },
};
