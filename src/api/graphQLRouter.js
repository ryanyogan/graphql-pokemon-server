import { makeExecutableSchema } from 'graphql-tools';
import { graphqlExpress } from 'apollo-server-express';
import merge from 'lodash.merge';
import { userType, userResolvers } from './resources/user';
import { pokemonType, pokemonResolvers } from './resources/pokemon';

const baseSchema = `
  schema {
    query: Query
  }
`;

const schema = makeExecutableSchema({
  typeDefs: [baseSchema, userType, pokemonType],
  resolvers: merge({}, userResolvers, pokemonResolvers),
});

export const graphQLRouter = graphqlExpress(req => ({
  schema,
  context: {
    req,
    user: req.user,
  },
}));
