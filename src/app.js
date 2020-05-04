const express = require('express');

const { applyMiddlewares } = require('./middlewares');
const errorHandler = require('./middlewares/error-handler');

const {
  healthRoute,
  usersRoute,
  authRoute,
} = require('./routes');

const app = express();

applyMiddlewares(app);

// health check
app.use('/health', healthRoute);

app.use('/users', usersRoute);

app.use('/auth', authRoute);

app.use(errorHandler);

module.exports = app;
