const logger = require('../../../utils/logger');

const ItemsController = {
  async handleGet(req, res, next) {
    try {
      const response = [
        {
          id: 1,
          name: 'name for item 1',
          image: 'https://via.placeholder.com/200'
        },
        {
          id: 2,
          name: 'name for item 2',
          image: 'https://via.placeholder.com/200'
        }
      ]

      return res.status(200).json(response);
    } catch (e) {
      logger.error(`Users Controller :: handleGet ${e.message}`);
      logger.debug(e);

      // error handler middleware
      return next(e);
    }
  },
};

module.exports = ItemsController;
