const Blogs = require("../models/blogModel");
const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const { errorHandler } = require("./errorHandler");

// @task Creates a new blog
// @route POST api/blogs/newblog
// @desc Creates a new blog with title and desciption
// @access Only has access to Standard and Premium users

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
      errorHandler("failed", 400, "Sorry please provide data", res);
      return next();
    }

    if (!user) {
      errorHandler("failed", 401, "Sorry no user found", res);
      return next();
    }

    console.log(user);
    if (
      data.title.trim().length === 0 ||
      data.description.trim().length === 0 ||
      data.title === "" ||
      data.description == ""
    ) {
      errorHandler(
        "failed",
        400,
        "Sorry title and description cannot be empty",
        res
      );

      return next();
    }
    const newBlog = await Blogs.create(data);

    res.status(200).json({
      status: "success",
      data: newBlog,
    });
  } else if (!data) {
    errorHandler("failed", 400, "Sorry cannot POST", res);
    return next();
  }

  next();
});

// @task Get all blogs
// @route GET api/blogs
// @desc Gets all blogs for blog page when the page load
// @access Access for all users

exports.getAllBlogs = catchAsync(async (req, res, next) => {
  const allBlogs = await Blogs.find();

  if (!allBlogs) {
    errorHandler("failed", 400, "Sorry no blogs were found", res);
  }

  res.status(200).json({
    status: "success",
    data: allBlogs,
  });

  next();
});

// @task Update blog
// @route PATCH api/blogs/newblog
// @desc Update a new blog with new title and desciption
// @access Only has access to Standard and Premium users

exports.updateBlog = catchAsync(async (req, res, next) => {
  let blogId = req.params.id;

  const updatedFields = {};

  let user = await User.findById(req.body.user);

  if (!user) {
    res.status(401).json({
      status: "failed",
      message: "User not found! please login",
    });
    return next();
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
    res.status(404).json({ status: "failed", message: "Blog not found" });
    return next();
  }

  res.status(200).json({ message: "success", updatedBlog: doc });

  next();
});

// @task Deletes a blog
// @route DELETE api/blogs/newblog
// @desc Delete a blog that cannot be undo
// @access Only has access to Standard and Premium users

exports.deleteBlog = catchAsync(async (req, res, next) => {
  let blogId = req.params.id;

  const doc = await Blogs.findByIdAndDelete(blogId);

  console.log(doc);

  if (!doc) {
    res.status(404).json({ status: "failed", message: "Blog not found" });
    return next();
  }

  res.status(204).json({
    status: "success",
    data: null,
  });

  next();
});
