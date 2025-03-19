const express = require("express");
const Router = new express.Router();
const { videoPlayer } = require("../controllers/streamcontroller");

Router.route("/video").get(videoPlayer);

module.exports = Router;
