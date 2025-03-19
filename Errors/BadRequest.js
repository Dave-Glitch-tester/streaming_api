const AppError = require("./CustomApiError");
class BadRequest extends AppError {
  constructor(message) {
    super(message);
    this.StatusCode = 401;
  }
}

module.exports = BadRequest;
