const catchAsync = require("../utils/catchAsync");
const Subscription = require("../models/subscriptionModel");
const User = require("../models/userModel");

exports.createSubscription = catchAsync(async (req, res, next) => {
  const data = {
    name: req.body.name,
    market: req.body.market,
    price: req.body,
    user: req.body.user,
  };

  let user = await User.findById(data.user);

  if (data) {
    if (!data.name || data.market || !data.user) {
      return res.status(404).json({
        status: "failed",
        message: "sorry please provide data",
      });
    }

    if (!user) {
      return res.status(404).json({
        status: "failed",
        message: "User not found! please login",
      });
    }

    const addSubscription = await Subscription.create(data);

    res.status(200).json({
      status: "success",
      data: addSubscription,
    });
  } else if (!data) {
    return res.status(404).json({
      status: "failed",
      message: "sorry invalid data",
    });
  }

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
