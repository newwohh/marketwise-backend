const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Cannot upload without a title"],
  },
  description: {
    type: String,
    required: [true, "Cannot upload without a title"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: Number,
    required: [true, "User undefined"],
  },
});

const Blogs = mongoose.model("Blog", blogSchema);

module.exports = Blogs;
