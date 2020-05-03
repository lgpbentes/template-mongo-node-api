const path = require('path');
const nconf = require('nconf');

const configPath = `${process.cwd()}/config`;

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const conf = {
  getConf() {
    nconf.argv()
      .env()
      .file({
        file: path.join(`${configPath}/${process.env.NODE_ENV}.json`),
      })
      .file('defaults', {
        file: path.join(`${configPath}/default.json`),
      });

    return nconf;
  },
};

module.exports = conf;
