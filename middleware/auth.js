const { unAuthenticatedError } = require("../Errors");
const jwt = require("jsonwebtoken");
const authenticate = (req, res, next) => {
  try {
    const token = req.signedCookies.authorize;
    if (!token)
      throw new unAuthenticatedError("Unauthorized to access this routes");
    const verifiedToken = jwt.verify(token, process.env.SECRET);
    const { userId, username } = verifiedToken;
    req.user = { username, userId };
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = authenticate;
