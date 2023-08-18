const mongoose = require("mongoose");

const subscriptionSchema = new mongoose.Schema({
  market: {
    type: String,
    required: [true, "select a market"],
  },
  name: {
    type: String,
    required: [true, "select a ticker"],
  },
  price: {
    type: Number,
    required: [true, "select a ticker"],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    required: [true, "not logged in"],
  },
});

const Subscription = mongoose.model("Subscription", subscriptionSchema);

module.exports = Subscription;
