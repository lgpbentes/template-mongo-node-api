const { getConf } = require('./configger');

// getConf is function that generates config based on the env.json files and
// environment variables. But we don't need to instantiate a config every time
// to access the configs. So we instantiate one single config here and everyone
// can use this cached config.
module.exports = getConf();
