const catchAsync = require("../utils/catchAsync");
const Subscription = require("../models/subscriptionModel");
const User = require("../models/userModel");

// @task Subscribe to any ticker/coin/currency
// @route POST api/subscriptions/newsubscription
// @desc Subscribe to get the updates and all info on the subscribed element
// @access Access only for Standard and premium

exports.createSubscription = catchAsync(async (req, res, next) => {
  const data = {
    name: req.body.name,
    market: req.body.market,
    price: req.body.price,
    user: req.body.user,
  };

  let user = await User.findById(data.user);

  if (data) {
    if (!data.name || !data.market || !data.user) {
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

// @task Check subscription
// @route GET api/subscriptions/getsubscription/:id
// @desc Get all subscribed tickers
// @access Access only for Standard and premium

exports.getSubscription = catchAsync(async (req, res, next) => {
  const data = await Subscription.find({ user: req.params.id });
  //   console.log(req.params);

  res.status(200).json({
    status: "success",
    data: data,
  });

  next();
});

// @task Delete subscription
// @route DELETE api/subscriptions/getsubscription/:id
// @desc Delete all subscribed tickers
// @access Access only for Standard and premium

exports.deleteSubscription = catchAsync(async (req, res, next) => {
  let subId = req.params.id;

  const doc = await Blogs.findByIdAndDelete(subId);

  if (!doc) {
    return res.status(404).json({ message: "Subscription not found" });
  }

  res.status(204).json({
    status: "success",
    data: null,
  });

  next();
});
