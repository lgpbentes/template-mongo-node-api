const jwt = require('jsonwebtoken');
const _ = require('lodash');
const conf = require('../utils/config');

const jwtSecret = conf.get('JWT_SECRET');
const jwtConfig = conf.get('jwtConfig');

const {
  issuer,
  lifetime,
  algorithm,
} = jwtConfig;

const Token = {
  generate(payload, signOptions) {
    const privateKey = jwtSecret;
    payload.iss = issuer;
    payload.exp = payload.iat + lifetime;
    payload.algorithm = algorithm;

    signOptions.audience = payload.iss;

    const token = jwt.sign(payload, privateKey, signOptions);

    return {
      token,
    };
  },
  async verify(token) {
    try {
      const privateKey = jwtSecret;
      const legit = await jwt.verify(
        _.replace(token, 'Bearer ', ''),
        privateKey,
        { algorithms: [jwtConfig.algorithm] },
      );
      return legit;
    } catch (e) {
      return {
        error: 'Invalid credentials.',
      };
    }
  },
};

module.exports = Token;
