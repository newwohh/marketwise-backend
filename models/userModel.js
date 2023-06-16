const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please type name"],
  },
  gender: {
    type: String,
    required: [true, "Please select a gender"],
  },
  email: {
    type: String,
    required: [true, "Please type E-Mail"],
    unique: true,
    lowercase: true,
    validate: [],
  },
  password: {
    type: String,
    required: [true, "Please type password"],
    minlength: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please that's your password"],
    message: "Password are not same",
  },
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
