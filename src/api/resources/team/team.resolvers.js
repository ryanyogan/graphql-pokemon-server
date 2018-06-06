import { Team } from './team.model';

const getOneTeam = (_, { id }) => Team.findById(id).exec();

const allTeams = (_, { limit = 3 }) =>
  Team.find({})
    .limit(limit)
    .exec();

const createTeam = (_, { input }) => Team.create(input);

const updateTeam = (_, { input }) => {
  const { id, ...update } = input;

  return Team.findByIdAndUpdate(id, update, { new: true }).exec();
};

const teamCount = async (_, { id }) => {
  const team = await Team.findById(id);
  return team.pokemons.length;
};

const addPokemon = async (_, { teamId, pokemonId }) => {
  const team = await Team.findById(teamId);
  team.pokemons.push(pokemonId);
  await team.save();

  return team;
};

export const teamResolvers = {
  Query: {
    Team: getOneTeam,
    allTeams,
    teamCount,
  },

  Mutation: {
    Team: createTeam,
    updateTeam,
    addPokemon,
  },

  Team: {
    pokemons: async (team, { limit = 10 }) => {
      const { pokemons } = await team
        .populate({ path: 'pokemons', options: { limit } })
        .execPopulate();
      return pokemons;
    },
  },
};
