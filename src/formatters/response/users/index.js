const _ = require('lodash');

const UsersResponseFormatter = {
  format(response) {
    const formattedResponse = {};
    formattedResponse.users = response.map(user => _.pick(
      user,
      [
        'id',
        'name',
        'email',
      ],
    ));

    return formattedResponse;
  },
};

module.exports = UsersResponseFormatter;
