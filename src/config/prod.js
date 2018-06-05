const DB_SECRET = process.env.DB_SECRET;

export const config = {
  expireTime: '30d',
  secrets: {
    JWT_SECRET: 'systemofadown',
  },
  db: {
    url: `mongodb://dev-academy:${DB_SECRET}@ds247830.mlab.com:47830/pokemon-prod`,
  },
  graphiql: {
    endpointURL: 'https://pokemon-server-aldhrmzdvz.now.sh/graphql',
  },
  disableAuth: true,
};
