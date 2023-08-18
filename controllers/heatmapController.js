const Subscription = require("../models/subscriptionModel");
const catchAsync = require("../utils/catchAsync");

// @task Give data for using heatmap
// @route GET api/heatmap
// @desc Returns the data for rendering the data
// @access Only has access to Standard and Premium users

exports.heatmap = catchAsync(async (req, res, next) => {
  const data = await Subscription.find({ user: req.params.id });
  //   console.log(req.params);

  res.status(200).json({
    status: "success",
    data: data,
  });

  next();
});
