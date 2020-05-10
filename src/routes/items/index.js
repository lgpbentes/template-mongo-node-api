const { celebrate } = require('celebrate');
const { Router } = require('express');
const { getItemsJoiSchema } = require('./validation');
const itemsController = require('../../controllers/items');
const auth = require('../../middlewares/auth');

const router = new Router({ mergeParams: true });

const joiOptions = {
  allowUnknown: false,
};

router.get(
  '/',
  auth.middleware,
  celebrate(getItemsJoiSchema, joiOptions),
  itemsController.handleGet,
);

module.exports = router;
