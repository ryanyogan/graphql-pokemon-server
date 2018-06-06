import { Pokemon } from './pokemon.model';

const getOnePokemon = (_, { id }) => Pokemon.findById(id).exec();

const getAllPokemons = () =>
  Pokemon.find({})
    .limit(20)
    .exec();

const createPokemon = (_, { input }) => Pokemon.create(input);

export const pokemonResolvers = {
  Query: {
    Pokemon: getOnePokemon,
    getAllPokemons,
  },
  Pokemon: {
    // I do not want the user to query misc { classification } so here is
    // how we can handle that, we have the parent (rootValue) as the first arg
    // which resolves to the Pokemon, now we may drive into the object
    // This also is saying, hey! we have the data, don't ask for it again, its
    // in memory!
    classification: parent => parent.misc.classification,
    height: parent => parent.misc.height,
    weight: parent => parent.misc.weight,
    happiness: parent => parent.misc.happiness,
    // Notice Below, if we wanted to, we could drive down on eaach value
    // given to us from the parent, the parent in this instance is the (root)
    // of the Pokemon, with nested data structures such as Pokemon.Misc.Classification, etc..
    // We do not have to do this, if you look here: https://github.com/ryanyogan/graphql-pokemon-server/blob/master/src/api/resources/pokemon/pokemon.graphql#L24
    // You can see we created a Damage type, GraphQL is smart enough to match the names, and respond
    // accordingly :)  Looking below now, can you see how we can handle changing a legacy
    // API request with a response such as data.user_name to userName ?
    // userName: (parent) => parent.user_name  ...  Is this whole "Graph" thing
    // starting to click? I told ya "info" was an AST!

    // normal: parent => parent.damages.normal,
    // fire: parent => parent.damages.fire,
    // water: parent => parent.damages.water,
    // electric: parent => parent.damages.electric,
    // grass: parent => parent.damages.grass,
    // ice: parent => parent.damages.ice,
    // fight: parent => parent.damages.fight,
    // poison: parent => parent.damages.poison,
    // ground: parent => parent.damages.ground,
    // flying: parent => parent.damages.flying,
    // psychic: parent => parent.damages.psychic,
    // bug: parent => parent.damages.bug,
    // rock: parent => parent.damages.rock,
    // ghost: parent => parent.damages.ghost,
    // dragon: parent => parent.damages.dragon,
    // dark: parent => parent.damages.dark,
    // steel: parent => parent.damages.steel,
  },
  Mutation: {
    createPokemon,
  },
};
