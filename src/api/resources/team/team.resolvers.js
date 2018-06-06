import { Team } from './team.model';

const getOneTeam = (_, { id }) => Team.findById(id).exec();

const allTeams = () => Team.find({}).exec();

const createTeam = (_, { input }) => Team.create(input);

const updateTeam = (_, { input }) => {
  const { id, ...update } = input;

  return Team.findByIdAndUpdate(id, update, { new: true }).exec();
};

export const teamResolvers = {
  Query: {
    Team: getOneTeam,
    allTeams,
  },

  Mutation: {
    Team: createTeam,
    updateTeam,
  },

  Team: {
    pokemons: async team => {
      const { pokemons } = await team.populate('pokemons').execPopulate();
      console.log('Tracing Nested Types - Currently : ', team); // eslint-disable-line
      return pokemons;
    },
  },
};
