const Blogs = require("../models/blogModel");
const catchAsync = require("../utils/catchAsync");

exports.createBlog = catchAsync(async (req, res, next) => {
  const data = await Blogs.create({
    title: req.body.title,
    description: req.body.description,
    createdAt: Date.now(),
    user: req.body.user,
  });

  if (data) {
    if (!data.title || !data.description || !data.user) {
      res.status(404).json({
        status: "failed",
        message: "sorry please provide data",
      });
    }

    console.log(data);

    if (
      data.title.trim().length === 0 ||
      data.description.trim().length === 0
    ) {
      res.status(404).json({
        status: "failed",
        message: "sorry title and description cannot be empty",
      });
    }

    res.status(200).json({
      status: "success",
      data: data,
    });
  } else {
    if (!data) {
      res.status(404).json({
        status: "failed",
        message: "sorry invalid data",
      });
    }
  }
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
