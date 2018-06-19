// Remove this import
const Team = require('./team.model');

// Do we really want to do a ODM (Database) lookup in our resolver?
const team = (_, { id }) => Team.findById(id).exec();

// How about here?
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
  // Hmmm.... Do we need to ask for this information?
  const { pokemons } = await Team.findById(id);

  return pokemons.length;
};

const addPokemon = async (_, { teamId, pokemonId }) => {
  const existingTeam = await Team.findById(teamId);
  existingTeam.pokemons.push(pokemonId);
  await existingTeam.save();

  return team;
};

module.exports = {
  Query: {
    team,
    allTeams,
    teamCount,
  },

  Mutation: {
    createTeam,
    updateTeam,
    addPokemon,
  },

  Team: {
    // Why do we need this?
    id: parent => `${parent._id}`,
    // Can you figure out how to use a DataLoader here?
    pokemons: async (team, { limit = 10 }) => {
      const { pokemons } = await team
        .populate({ path: 'pokemons', options: { limit } })
        .execPopulate();

      return pokemons;
    },
  },
};
