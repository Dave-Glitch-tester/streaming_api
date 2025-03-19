const express = require("express");
const Router = new express.Router();
const { login, register } = require("../controllers/authController");
const catchAsync = require("../util/catchAsync");

Router.route("/login").post(catchAsync(login));
Router.route("/register").post(catchAsync(register));

module.exports = Router;
