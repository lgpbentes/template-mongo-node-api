const ResponseFormatter = {
  errorResponse(res, err) {
    const errorMsg = { code: 1000, message: 'Internal server error' };
    if (err.code !== undefined) {
      errorMsg.code = err.code;
    }

    if (err.message) {
      errorMsg.message = err.message;
    }

    res
      .status(500)
      .jsonp(errorMsg);
  },

  badRequestResponse(res, { code, message }) {
    const errorMsg = { code: 1001, message: 'Bad request' };

    if (code) {
      errorMsg.code = code;
    }

    if (message) {
      errorMsg.message = message;
    }

    res
      .status(400)
      .jsonp(errorMsg);
  },
  unauthorizedResponse(res, { code, message }) {
    const errorMsg = { code: 1002, message: 'Unauthorized Access' };

    if (code) {
      errorMsg.code = code;
    }

    if (message) {
      errorMsg.message = message;
    }

    res
      .status(401)
      .jsonp(errorMsg);
  },
};

module.exports = ResponseFormatter;
