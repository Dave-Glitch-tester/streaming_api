const Users = require("../models/User");
const { BadRequest, unAuthenticatedError } = require("../Errors");
const login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
  }
  const user = await Users.findOne({ username });
  if (!user) throw new BadRequest("User not Found");
  const isPasswordcorrect = user.comparePassword(password);
  if (!isPasswordcorrect)
    throw new unAuthenticatedError("Password is incorrect");
  const token = await user.createJwt();
  res.cookie("authorize", token, {
    httpOnly: true,
    signed: true,
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
  });
  res.send("Login successful");
};

const register = async (req, res) => {
  const { username, password, email } = req.body;
  const user = await Users.findOne({ username });
  if (user) {
    // Refacator here to throw error
    throw new BadRequest("Username already exist");
  }

  const newUser = await Users.create({ username, password, email });
  await newUser.save();
  const token = await newUser.createJwt();

  res.cookie("authorize", token, {
    httpOnly: true,
    signed: true,
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
  });
  res.send("Registered");
};

module.exports = { login, register };
