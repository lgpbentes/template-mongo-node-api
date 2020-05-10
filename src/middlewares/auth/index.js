const _ = require('lodash');
const Token = require('../../../services/jwtoken');
const logger = require('../../../utils/logger');
const errorFormatter = require('./../../formatters/response/errors');

const auth = {
  async check(req, res, next) {
    const { authorization } = req.headers;
    const { method, baseUrl, path } = req;
    const route = baseUrl + path;

    try {
      if (_.isEmpty(authorization)) {
        return errorFormatter.unauthorizedResponse(res, {
          code: 1003,
          message: 'Missing token.',
        });
      }

      req.user = await Token.verify(authorization, method, route);

      if (_.isEmpty(req.user) || Object.keys(req.user).includes('error')) {
        return errorFormatter.unauthorizedResponse(res, {
          code: 1004,
          message: 'Invalid token.',
        });
      }

      return next();
    } catch (err) {
      logger.error(`Auth Middleware :: check ${err}`);
      logger.debug(err);

      return next(err);
    }
  },
  async basic(req, res, next) {
    const b64auth = (req.headers.authorization || '').split(' ')[1] || '';
    // eslint-disable-next-line no-buffer-constructor
    const [login, password] = Buffer.from(b64auth, 'base64')
      .toString().split(':');

    if (
      login
      && password
      && login === 'basiclogin'
      && password === 'basicpasswd'
    ) { return next(); }

    res.set('WWW-Authenticate', 'Basic realm="401"');
    res.status(401);
    return res.json({ error: 'Auth Required' });
  },
  async middleware(req, res, next) {
    if (req.headers.authorization) {
      return req.headers.authorization.includes('Bearer')
        ? auth.check(req, res, next)
        : auth.basic(req, res, next);
    }
    return auth.basic(req, res, next);
  },
};

module.exports = auth;
