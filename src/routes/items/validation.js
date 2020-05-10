const { Joi } = require('celebrate');

const getItemsJoiSchema = {
  query: Joi.object({}),
  body: Joi.object({}),
};

module.exports = {
  getItemsJoiSchema,
};
