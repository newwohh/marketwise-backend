const Blogs = require("../models/blogModel");
const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");

exports.createBlog = catchAsync(async (req, res, next) => {
  const data = {
    title: req.body.title,
    description: req.body.description,
    createdAt: req.body.createdAt,
    user: req.body.user,
  };

  let user = await User.findById(data.user);
  console.log(data);

  if (data) {
    if (!data.title || !data.description) {
      return res.status(404).json({
        status: "failed",
        message: "Sorry please provide data",
      });
    }

    if (!user) {
      return res.status(404).json({
        status: "failed",
        message: "User not found! please login",
      });
    }

    console.log(user);
    if (
      data.title.trim().length === 0 ||
      data.description.trim().length === 0 ||
      data.title === "" ||
      data.description == ""
    ) {
      return res.status(404).json({
        status: "failed",
        message: "Sorry title and description cannot be empty",
      });
    }
    const newBlog = await Blogs.create(data);

    res.status(200).json({
      status: "success",
      data: newBlog,
    });
  } else {
    if (!data) {
      return res.status(404).json({
        status: "failed",
        message: "Sorry invalid data",
      });
    }
  }

  next();
});

exports.getAllBlogs = catchAsync(async (req, res, next) => {
  const allBlogs = await Blogs.find();

  if (!allBlogs) {
    res.status(404).json({
      status: "failed",
      message: "Sorry nothing found",
    });
  }

  res.status(200).json({
    status: "success",
    data: allBlogs,
  });

  next();
});
