const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const { verifyData, createPayment } = require("./paymentController");

exports.createPlan = catchAsync(async (req, res, next) => {
  let document = { name: req.body._planname, user: req.body._user };
  let user = await User.findById(document.user);

  if (!document) {
    res.status(404).json({
      status: "failed",
      message: "not logged in or user not found please check",
    });

    return next();
  }

  if (user) {
    createPayment(req, res);
  } else if (!user) {
    res.status(500).json({
      status: "failed",
      message: "Sorry couldn't complete transaction please login",
    });
  }
});

exports.verifyPayment = catchAsync(async (req, res, next) => {
  verifyData(req, res);
});
