const bcrypt = require('bcryptjs');
const RequestFormatter = require('../../request/base');

const UsersRequestFormatter = {
  async formatPost(reqParams) {
    const formattedParams = RequestFormatter.format(reqParams);
    const {
      password,
    } = formattedParams;

    if (password) {
      formattedParams.password = await bcrypt.hashSync(
        password,
      );
    }
    return formattedParams;
  },
};

module.exports = UsersRequestFormatter;
