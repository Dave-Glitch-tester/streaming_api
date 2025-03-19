const express = require("express");
const Router = new express.Router();
const passport = require("passport");

Router.route("/").get(
  passport.authenticate("google", { scope: ["profile", "email"] })
);
Router.route("/redirect").get(
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => res.send("okay")
);

module.exports = Router;
