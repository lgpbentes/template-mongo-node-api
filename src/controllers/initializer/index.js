const mongoose = require('mongoose');
const logger = require('../../../utils/logger');
const conf = require('../../../utils/config');

const dbUser = conf.get('DB_USER');
const dbPassword = conf.get('DB_PASSWORD');
const dbHost = conf.get('services:database:host');
const dbPort = conf.get('services:database:port');

const connectToMongo = (
  () => new Promise((resolve, reject) => setTimeout(() => {
    try {
      const options = {
        useNewUrlParser: true,
        useFindAndModify: false,
        keepAlive: true,
        useUnifiedTopology: true,
        user: dbUser,
        pass: dbPassword,
      };
      mongoose.connect(`mongodb://${dbHost}:${dbPort}`, options);
      logger.info('Connected successfully to MongoDB');
      resolve();
    } catch (error) {
      logger.debug(error);
      logger.info('Could not connect to MongoDB');
      reject();
    }
  }, 2000))
);

async function initializer() {
  await connectToMongo();
}

module.exports = initializer;
