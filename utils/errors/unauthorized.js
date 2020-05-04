const BaseError = require('./base');

class UnauthorizedError extends BaseError {
  constructor({ code, message, fields }) {
    let errorMsg = message;
    if (!message && fields && fields.length) {
      errorMsg = `Unauthorized access for "${fields.join(', ')}"`;
    }

    // Overriding both message and status code
    super(errorMsg || 'Unauthorized access', 401);

    // Saving custom property
    this.code = 1002;
    if (code !== undefined) {
      this.code = code;
    }

    this.fields = fields || [];
  }
}

module.exports = UnauthorizedError;
