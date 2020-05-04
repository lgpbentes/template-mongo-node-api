const RequestFormatter = {
  format(reqParams) {
    const { body, query } = reqParams;
    const formattedParams = {
      ...body,
      ...query,
    };

    return formattedParams;
  },
};

module.exports = RequestFormatter;
