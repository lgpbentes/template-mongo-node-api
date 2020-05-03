const express = require('express');

const {
  healthRoute,
} = require('./routes');

const app = express();

// health check
app.use('/health', healthRoute);

module.exports = app;
