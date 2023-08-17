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

exports.updateBlog = catchAsync(async (req, res, next) => {
  let blogId = req.params.id;

  const updatedFields = {};

  let user = await User.findById(req.body.user);

  if (!user) {
    return res.status(404).json({
      status: "failed",
      message: "User not found! please login",
    });
  }

  if (req.body.title) {
    updatedFields.title = req.body.title;
  }

  if (req.body.description) {
    updatedFields.description = req.body.description;
  }

  const doc = await Blogs.findByIdAndUpdate(blogId, updatedFields, {
    new: true,
    runValidators: true,
  });

  if (!doc) {
    return res
      .status(404)
      .json({ status: "failed", message: "Blog not found" });
  }

  res.status(200).json({ message: "success", updatedBlog: doc });

  next();
});

exports.deleteBlog = catchAsync(async (req, res, next) => {
  let blogId = req.params.id;

  const doc = await Blogs.findByIdAndDelete(blogId);

  console.log(doc);

  if (!doc) {
    return res
      .status(404)
      .json({ status: "failed", message: "Blog not found" });
  }

  res.status(204).json({
    status: "success",
    data: null,
  });

  next();
});
