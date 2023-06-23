const Blogs = require("../models/blogModel");
const catchAsync = require("../utils/catchAsync");

exports.createBlog = catchAsync(async (req, res, next) => {
  const data = await Blogs.create({
    title: req.body.title,
    description: req.body.description,
    // createdAt: Date.now(),
    // user: 99999999999,
  });

  console.log(data);

  res.status(200).json({
    status: "success",
    data: data,
  });
});

exports.getAllBlogs = catchAsync(async (req, res, next) => {
  const allBlogs = await Blogs.find();

  res.status(200).json({
    status: "success",
    data: allBlogs,
  });
});
