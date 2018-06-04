export const config = {
  expireTime: '30d',
  secrets: {
    JWT_SECRET: 'systemofadown',
  },
  db: {
    url: 'mongodb://localhost/pokemon-team-builder-test',
  },
  disableAuth: true,
};
