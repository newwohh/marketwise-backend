const catchAsync = require("../utils/catchAsync");
const Subscription = require("../models/subscriptionModel");

exports.createSubscription = catchAsync(async (req, res, next) => {
  const data = await Subscription.create(req.body);

  res.status(200).json({
    status: "success",
    data: data,
  });

  next();
});

exports.getSubscription = catchAsync(async (req, res, next) => {
  const data = await Subscription.find({ user: req.params.id });
  //   console.log(req.params);
  const doc = await data;

  res.status(200).json({
    status: "success",
    data: data,
  });

  next();
});
