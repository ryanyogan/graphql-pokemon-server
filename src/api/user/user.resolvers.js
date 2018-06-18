const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('./user.model');

const signup = async (_, { input: { email, password } }) => {
  try {
    const userExists = await User.findOne({ email }).lean();

    if (userExists) {
      throw new Error('Email is already in use.');
    }

    const _password = await bcrypt.hash(password, 10);
    const user = await new User({ email, password: _password }).save();
    const token = jwt.sign({ userId: user._id }, 'sillysecret');

    return { token, user };
  } catch (error) {
    throw new Error(error);
  }
};

const login = async (_, { input: { email, password } }) => {
  try {
    const user = await User.findOne({ email }).lean();
    if (!user) {
      throw new Error('Invalid Credentials');
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      throw new Error('Invalid Credentials');
    }

    user.password = undefined;

    return {
      token: jwt.sign({ userId: user._id }, 'sillysecret'),
      user,
    };
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  Mutation: {
    signup,
    login,
  },
};
