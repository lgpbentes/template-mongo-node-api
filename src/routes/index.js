const healthRoute = require('./health');
const usersRoute = require('./users');
const authRoute = require('./auth');
const itemsRoute = require('./items');

const routes = {
  healthRoute,
  usersRoute,
  authRoute,
  itemsRoute,
};

module.exports = routes;
