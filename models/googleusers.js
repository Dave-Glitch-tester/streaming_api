const { Schema, model } = require("mongoose");

const googleSchema = new Schema({
  google_id: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});

module.exports = model("googleUsers", googleSchema);
