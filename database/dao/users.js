const _ = require('lodash');
const bcrypt = require('bcryptjs');
const Users = require('../models/users');
const logger = require('../../utils/logger');
const RequestError = require('../../utils/errors/request');
const UnauthorizedError = require('../../utils/errors/unauthorized');

const UsersDAO = {
  create: async (params) => {
    try {
      const { name, email, password } = params;

      const createdUser = await Users.create(
        { name, email, password },
      );

      return createdUser;
    } catch (err) {
      logger.error('Users DAO :: create', err.message);

      if (err.code === 11000) {
        throw new RequestError({
          code: 11000,
          message: 'E-mail already registered',
        });
      }

      throw err;
    }
  },
  read: async ({ email }) => {
    const foundUser = await Users.findOne({ email });

    return foundUser;
  },
  checkUser: async ({ email, password }) => {
    const user = await Users.findOne({ email });

    if (_.isEmpty(user)) {
      throw new UnauthorizedError({
        code: 11001,
        message: 'Invalid email.',
      });
    }

    const check = bcrypt.compareSync(
      password,
      user.password,
    );
    if (!check) {
      throw new UnauthorizedError({
        code: 11002,
        message: 'Invalid credentials.',
      });
    }

    return user;
  },
};

module.exports = UsersDAO;
