const express = require("express");
const Router = new express.Router();
const Uploader = require("../controllers/uploadController");
const { uploadError, uploads } = require("../middleware/upload");
const catchAsync = require("../Errors/catchAsync");

Router.route("/").post(uploads, uploadError, catchAsync(Uploader));

module.exports = Router;
