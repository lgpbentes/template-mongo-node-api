const { Joi } = require('celebrate');

module.exports = {
  query: Joi.object({}),
  body: Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
};
