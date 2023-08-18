const Razorpay = require("razorpay");
const crypto = require("crypto");
const catchAsync = require("../utils/catchAsync");
const Plan = require("../models/planModel");

exports.createPayment = catchAsync(async (req, res, next, data) => {
  let userData = { name: req.body._planname, user: req.body._user };

  const instance = new Razorpay({
    key_id: process.env.RAZRPAY_ID,
    key_secret: process.env.RAZRPAY_SECRET,
  });

  const amount = req.body.amount;
  const options = {
    amount: amount,
    currency: "USD",
    receipt: crypto.randomBytes(10).toString("hex"),
  };

  instance.orders.create(options, async (error, order) => {
    if (error) {
      return res.status(500).json({ status: "failed" });
    } else {
      const doc = await Plan.create(userData);
      res.status(200).json({ status: "success", data: order, doc });
      return true;
    }
  });
});

exports.verifyData = catchAsync(async (req, res, next, data) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;

  const sign = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSign = crypto
    .createHmac("sha356", process.env.RAZRPAY_SECRET)
    .update(sign.toString())
    .digest("hex");

  if (razorpay_signature === expectedSign) {
    return res.status(200).json({ message: "success" });
  } else {
    return res.status(400).json({ message: "failed" });
  }
});
