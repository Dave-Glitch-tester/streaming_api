const ErrorHandler = (err, req, res, next) => {
  const error = {
    message: err.message || "Something Went Wrong",
    statusCode: err.StatusCode || 500,
  };
  if (err.name === "ValidationError") {
    error.msg = Object.values(err.errors)
      .map((item) => item.message)
      .join(",");
    error.statusCode = 400;
  }

  if (err.code && err.code === 11000) {
    error.msg = `Duplicate value entered for ${Object.keys(
      err.keyValue
    )} field, please choose another value`;
    error.statusCode = 400;
  }
  if (err.name === "CastError") {
    error.msg = `No item found with id : ${err.value}`;
    error.statusCode = 404;
  }

  res.status(error.statusCode).json({ message: error.message });
  next();
};

module.exports = ErrorHandler;
