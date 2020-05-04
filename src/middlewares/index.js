const bodyParser = require('body-parser');
const expressPinoLogger = require('express-pino-logger');
const logger = require('../../utils/logger');
const normalizeQueryParams = require('./normalize-query-params');
const normalizeBodyParams = require('./normalize-body-params');

const expressPino = expressPinoLogger({ logger });

const applyMiddlewares = (app) => {
  app.use(expressPino);
  app.use(bodyParser.urlencoded({ limit: '1mb', extended: true }));
  app.use(bodyParser.json({ limit: '1mb' }));
  app.use(normalizeQueryParams());
  app.use(normalizeBodyParams());
};

module.exports = { applyMiddlewares };
