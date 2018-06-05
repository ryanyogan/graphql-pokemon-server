const DB_USER = process.env.DB_USER;
const DB_SECRET = process.env.DB_SECRET;

export const config = {
  expireTime: '30d',
  secrets: {
    JWT_SECRET: 'systemofadown',
  },
  db: {
    url: `mongodb://${DB_USER}:${DB_SECRET}@ds247830.mlab.com:47830/pokemon-prod`,
  },
  disableAuth: true,
};
