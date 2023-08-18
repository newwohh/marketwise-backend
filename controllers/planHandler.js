const catchAsync = require("../utils/catchAsync");
const { verifyData, createPlan } = require("./paymentController");

exports.choosePlan = catchAsync(async (req, res, next) => {
  return createPlan(req, res);
  next();
});

exports.verifyPayment = catchAsync(async (req, res, next) => {
  verifyData(req, res);
});
