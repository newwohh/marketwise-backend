const mongoose = require("mongoose");
const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const xss = require("xss-clean");
const mongoSanitize = require("express-mongo-sanitize");
const userRouter = require("./routes/userRoutes");
const blogRouter = require("./routes/blogRoutes");
const app = express();
app.use(cookieParser());
dotenv.config({ path: "./config/config.env" });

// body parser, reading data from body into req.body
app.use(express.json({ limit: "10kb" }));
// data sanitization against noSQL query injection
app.use(mongoSanitize());
// data sanitization against cross side scripting
app.use(xss());

app.use(function (req, res, next) {
  console.log(req.cookies.jwt);
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header(
    "Access-Control-Allow-Methods",
    "GET,PUT,POST,DELETE,UPDATE,OPTIONS"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept"
  );

  next();
});

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);
app.use("/api/v1/users/", userRouter);
app.use("/api/v1/blogs/", blogRouter);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB SUCCESS"));

module.exports = app;
