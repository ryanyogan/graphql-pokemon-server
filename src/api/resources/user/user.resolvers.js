import { User } from './user.model';

const getMe = (_, __, { user }) => ({
  id: 1,
  username: 'Stubbed Out Username',
});

export const userResolvers = {
  Query: {
    getMe,
  },
};
