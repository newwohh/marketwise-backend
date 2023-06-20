const express = require("express");
const authController = require("../controllers/authController");

const userRouter = express.Router();

userRouter.post("/signup", authController.signup);
userRouter.post("/login", authController.login);

userRouter.use(authController.protect);

userRouter.get("/heatmap", authController.heatmap);

module.exports = userRouter;
