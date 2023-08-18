const Razorpay = require("razorpay");
const crypto = require("crypto");
const catchAsync = require("../utils/catchAsync");

exports.createPlan = catchAsync(async (req, res, next, data) => {
  const instance = new Razorpay({
    key_id: process.env.RAZRPAY_ID,
    key_secret: process.env.RAZRPAY_SECRET,
  });

  const options = {
    amount: 100,
    currency: "INR",
    receipt: crypto.randomBytes(10).toString("hex"),
  };

  instance.orders.create(options, (error, order) => {
    if (error) {
      console.log(error);
      return res.status(500).json({ status: "failed" });
    } else {
      res.status(200).json({ data: order });
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
