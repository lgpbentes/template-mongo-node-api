const { Joi } = require('celebrate');

const postUsersJoiSchema = {
  query: Joi.object({}),
  body: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    name: Joi.string(),
  }),
};

const getUsersJoiSchema = {
  query: Joi.object({}),
  body: Joi.object({}),
};

module.exports = {
  postUsersJoiSchema,
  getUsersJoiSchema,
};
