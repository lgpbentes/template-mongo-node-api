const RequestFormatter = {
  format(reqParams) {
    const { body, query, user } = reqParams;
    const formattedParams = {
      ...body,
      ...query,
    };

    if (user && user.email) {
      formattedParams.email = user.email;
    }

    return formattedParams;
  },
};

module.exports = RequestFormatter;
