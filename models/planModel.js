const mongoose = require("mongoose");

const planModel = mongoose.Schema({
  name: {
    type: String,
    required: [true, "no plan identified"],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    required: [true, "no user found"],
  },
});

const Plan = mongoose.model("Plan", planModel);

module.exports = Plan;
