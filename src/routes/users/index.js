const { celebrate } = require('celebrate');
const { Router } = require('express');
const { postUsersJoiSchema, getUsersJoiSchema } = require('./validation');
const usersController = require('../../controllers/users');
const auth = require('../../middlewares/auth');

const router = new Router({ mergeParams: true });

const joiOptions = {
  allowUnknown: false,
};

router.post(
  '/',
  celebrate(postUsersJoiSchema, joiOptions),
  usersController.handlePost,
);

router.get(
  '/',
  auth.middleware,
  celebrate(getUsersJoiSchema, joiOptions),
  usersController.handleGet,
);

module.exports = router;
