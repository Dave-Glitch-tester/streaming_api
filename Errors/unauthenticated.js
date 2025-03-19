const AppError = require("./CustomApiError");
class unAuthenticatedError extends AppError {
  constructor(message) {
    super(message);
    this.StatusCode = 401;
  }
}

module.exports = unAuthenticatedError;
