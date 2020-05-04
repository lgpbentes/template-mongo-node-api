const { celebrate } = require('celebrate');
const { Router } = require('express');

const { postUsersJoiSchema, getUsersJoiSchema } = require('./validation');
const usersController = require('../../controllers/users');

const router = new Router({ mergeParams: true });

const joiOptions = {
  allowUnknown: false,
};

router.post(
  '/',
  // auth.middleware,
  celebrate(postUsersJoiSchema, joiOptions),
  usersController.handlePost,
);

router.get(
  '/',
  // auth.middleware,
  celebrate(getUsersJoiSchema, joiOptions),
  usersController.handleGet,
);

module.exports = router;
