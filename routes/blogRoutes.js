const express = require("express");
const authController = require("../controllers/authController");
const blogController = require("../controllers/blogController");

const blogRouter = express.Router();

// blogRouter.use(authController.protect);

blogRouter.get("/", blogController.getAllBlogs);
blogRouter.post("/newblog", blogController.createBlog);

module.exports = blogRouter;
