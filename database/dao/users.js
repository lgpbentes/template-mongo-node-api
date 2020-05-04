const Users = require('../models/users');
const logger = require('../../utils/logger');
const { throwBadRequest } = require('../../utils/errors/bad-request');

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
        throwBadRequest({ code: 11000, message: 'Email já cadastrado' });
      }

      throw err;
    }
  },
  readAll: async () => {
    const foundUsers = await Users.find();

    return foundUsers;
  },
};

module.exports = UsersDAO;
