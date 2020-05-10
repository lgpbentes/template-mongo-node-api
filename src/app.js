const express = require('express');

const { applyMiddlewares } = require('./middlewares');
const errorHandler = require('./middlewares/error-handler');

const {
  healthRoute,
  usersRoute,
  authRoute,
  itemsRoute,
} = require('./routes');

const app = express();

applyMiddlewares(app);

// health check
app.use('/health', healthRoute);

app.use('/users', usersRoute);

app.use('/auth', authRoute);

app.use('/items', itemsRoute);

app.use(errorHandler);

module.exports = app;
