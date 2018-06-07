import mongoose from 'mongoose';
import { graphql } from 'graphql';
import { schema } from '../src/api/graphQLRouter';
import '../src/api/resources/pokemon/pokemon.model';
import '../src/api/resources/team/team.model';
import '../src/api/resources/user/user.model';

mongoose.Promose = global.Promise;

export const removeModel = modelName => {
  const model = mongoose.model(modelName);
  return new Promise((resolve, reject) => {
    if (!model) {
      return resolve();
    }

    model.remove(err => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

export const dropDb = () =>
  mongoose
    .connect(
      'mongodb://localhost/pokemon-test',
      {
        useMongoClient: true,
      },
    )
    .then(() => Promise.all(mongoose.modelNames().map(removeModel)));

export const runQuery = async (query, variables, user) =>
  graphql(schema, query, {}, { user }, variables);
