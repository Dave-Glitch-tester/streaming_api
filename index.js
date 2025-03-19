require("dotenv").config();
require("./util/cloudinary");
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const connectDb = require("./db/connect");
const morgan = require("morgan");
const passport = require("passport");
const session = require("express-session");
require("./Strategy/googlestrategy");
const AuthRoutes = require("./Routes/authRoutes");
const UploadRoutes = require("./Routes/UploadRoutes");
const googleRoutes = require("./Routes/googleRoutes");
const ErrorHandler = require("./Errors/ErrorHandler");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const oneDay = 1000 * 60 * 60 * 24;
const options = {
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    expiresIn: new Date(Date.now() * oneDay),
  },
};
app.use(
  morgan(function (tokens, req, res) {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, "content-length"),
      "-",
      tokens["response-time"](req, res),
      "ms",
    ].join(" ");
  })
);
app.use(session(options));

app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser(process.env.SESSION_SECRET));

// Routes
app.use("/", AuthRoutes);
app.use("/uploads", UploadRoutes);
app.use("/auth/google", googleRoutes);

app.get("*", (req, res) => {
  res.send(`${req.originalUrl} not found`);
});

// Error Handler
app.use(ErrorHandler);
const start = async () => {
  await connectDb();
  app.listen(3000, () => console.log("Server running on port 3000"));
};

start();
