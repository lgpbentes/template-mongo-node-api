const { celebrate } = require('celebrate');
const { Router } = require('express');
const joiSchema = require('./validation');
const authController = require('../../controllers/auth');

const router = new Router({ mergeParams: true });

const joiOptions = {
  allowUnknown: false,
};

router.post(
  '/',
  celebrate(joiSchema, joiOptions),
  authController.login,
);

module.exports = router;
