class AppError extends Error {
  constructor(message) {
    super(message);
  }
}
module.exports = AppError;
