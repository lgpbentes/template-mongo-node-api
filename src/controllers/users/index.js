const logger = require('../../../utils/logger');
const UsersDAO = require('../../../database/dao/users');
const UsersRequestFormatter = require('../../formatters/request/users');
const UsersResponseFormatter = require('../../formatters/response/users');

const UsersController = {
  async handlePost(req, res, next) {
    try {
      const reqParams = await UsersRequestFormatter.formatPost(req);

      const user = await UsersDAO.create(reqParams);
      const response = {
        status: 'CREATED',
        user,
      };

      return res.status(201).json(response);
    } catch (e) {
      logger.error(`Users Controller :: handlePost ${e.message}`);
      logger.debug(e);

      // error handler middleware
      return next(e);
    }
  },
  async handleGet(req, res, next) {
    try {
      const reqParams = UsersRequestFormatter.formatGet(req);
      const { email } = reqParams;

      const result = await UsersDAO.read({ email });
      const response = UsersResponseFormatter.format(result);

      return res.status(200).json(response);
    } catch (e) {
      logger.error(`Users Controller :: handleGet ${e.message}`);
      logger.debug(e);

      // error handler middleware
      return next(e);
    }
  },
};

module.exports = UsersController;
