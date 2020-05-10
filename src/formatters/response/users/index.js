const _ = require('lodash');

const UsersResponseFormatter = {
  format(response) {
    const formattedResponse = {};

    formattedResponse.user = _.pick(
      response,
      [
        'id',
        'name',
        'email',
      ],
    );

    return formattedResponse;
  },
};

module.exports = UsersResponseFormatter;
