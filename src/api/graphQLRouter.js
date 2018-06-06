import { makeExecutableSchema } from 'graphql-tools';
import { graphqlExpress } from 'apollo-server-express';
import merge from 'lodash.merge';
import { userType, userResolvers } from './resources/user';
import { pokemonType, pokemonResolvers } from './resources/pokemon';
import { teamType, teamResolvers } from './resources/team';

const baseSchema = `
  schema {
    query: Query
    mutation: Mutation
  }
`;

const schema = makeExecutableSchema({
  typeDefs: [baseSchema, userType, pokemonType, teamType],
  resolvers: merge({}, userResolvers, pokemonResolvers, teamResolvers),
});

export const graphQLRouter = graphqlExpress(req => ({
  schema,
  context: {
    req,
    user: req.user,
  },
}));
