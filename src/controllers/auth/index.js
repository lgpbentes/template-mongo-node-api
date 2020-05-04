const logger = require('../../../utils/logger');
const UsersDAO = require('../../../database/dao/users');
const Token = require('../../../services/jwtoken');

const AuthController = {
  async login(req, res, next) {
    try {
      const {
        email,
        password,
      } = req.body;

      const user = await UsersDAO.checkUser({ email, password });

      const payload = {
        iat: new Date().valueOf(),
        email,
        // eslint-disable-next-line no-underscore-dangle
        userId: user._id,
      };
      return res.status(202).json(
        {
          ...Token.generate(payload, {}),
        },
      );
    } catch (e) {
      logger.error(`Auth Controller :: login ${e.message}`);
      logger.debug(e);

      // error handler middleware
      return next(e);
    }
  },
};

module.exports = AuthController;
