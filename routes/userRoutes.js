const express = require("express");
const authController = require("../controllers/authController");
const heatmapController = require("../controllers/heatmapController");

const userRouter = express.Router();

userRouter.post("/signup", authController.signup);
userRouter.post("/login", authController.login);
userRouter.get("/logout", authController.logout);

userRouter.get("/heatmap", heatmapController.heatmap);

module.exports = userRouter;
