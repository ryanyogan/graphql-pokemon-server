import express from 'express';
import { graphiqlExpress } from 'apollo-server-express';
import { express as voyagerMiddleware } from 'graphql-voyager/middleware';
import setupMiddleware from './middleware';
import { connect } from './db';
import { graphQLRouter } from './api';
import config from './config';

const app = express();

setupMiddleware(app);
connect();

app.use('/graphql', graphQLRouter);
app.use(
  '/docs',
  graphiqlExpress({
    endpointURL: config.graphiql.endpointURL,
  }),
);
app.use('/voyager', voyagerMiddleware({ endpointUrl: '/graphql' }));

app.use('*', (req, res) =>
  res.json({ message: 'Please use /graphql when connecting' }),
);

export default app;
