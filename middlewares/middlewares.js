const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const User = require("../models/userModel");

exports.protect = async (req, res, next) => {
  if (req.cookies.jwt) {
    try {
      const decoded = await promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.JWT_SECRET
      );
      const currentUser = await User.findById(decoded.id);
      console.log(currentUser.name);
      req.user = currentUser;
      res.locals.user = currentUser;
      return next();
    } catch (err) {
      return console.log(err);
    }
  } else {
    res.send({ status: "failed" });
  }
};
