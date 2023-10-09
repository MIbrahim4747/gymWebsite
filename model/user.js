const Schema = require("mongoose").Schema;
const mongoose = require("mongoose");

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    minLength: 2,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 5,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
