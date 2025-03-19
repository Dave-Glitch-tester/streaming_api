const mongoose = require("mongoose");
const connection_string =
  process.env.MONGO_URI || "mongodb://localhost:27017/campgrounds";

const connectDb = () => {
  mongoose.connect(process.env.MONGO_URI);

  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "connection error:"));
  db.once("open", () => {
    console.log("DataBase connected successful");
  });
};

module.exports = connectDb;
