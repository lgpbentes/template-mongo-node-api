require('dotenv').config();

const conf = require('../utils/config');
const initialize = require('./controllers/initializer');

const port = conf.get('port');
const host = conf.get('host');
const environment = conf.get('environment');

const logger = require('../utils/logger');

const app = require('./app');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

/**
 * This configuration is required so that all hours generated by the
 * application are in accordance with the timezone
 */
process.env.TZ = conf.get('timezone');

initialize().then(() => {
  app.listen(port, host, (err) => {
    if (err) {
      logger.error({ error: err });
      return;
    }

    if (process.send) {
      process.send({ status: 'listening' });
    }

    logger.info(`Template API (${environment}) listening at ${port}`);
  });
});
