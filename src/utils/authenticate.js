const jwt = require('jsonwebtoken');

const authenticate = context => {
  const Authorization = context.req.headers.Authorization;

  if (Authorization) {
    const token = Authorization.replace('Bearer ', '');
    const { userId } = jwt.verify(token, 'sillysecret');
    return userId;
  }

  throw new Error('Not Authorized');
};

module.exports = {
  authenticate,
};
