const Subscription = require("../models/subscriptionModel");
const catchAsync = require("../utils/catchAsync");

exports.heatmap = catchAsync(async (req, res, next) => {
  const data = await Subscription.find({ user: req.params.id });
  //   console.log(req.params);
  const doc = await data;

  res.status(200).json({
    status: "success",
    data: data,
  });

  next();
});
