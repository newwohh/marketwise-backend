const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const xss = require("xss-clean");
const mongoSanitize = require("express-mongo-sanitize");
const userRouter = require("./routes/userRoutes");
const blogRouter = require("./routes/blogRoutes");
const subscriptionRouter = require("./routes/subscriptionRoute");
const planRouter = require("./routes/planRoutes");
const heatmapRouter = require("./routes/heatmapRoutes");
const app = express();
app.use(cookieParser());
dotenv.config({ path: "./config/config.env" });

// body parser, reading data from body into req.body
app.use(express.json({ limit: "10kb" }));
// data sanitization against noSQL query injection
app.use(mongoSanitize());
// data sanitization against cross side scripting
app.use(xss());

// Cross side scripting middleware
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header(
    "Access-Control-Allow-Headers",
    "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "GET,PUT,POST,DELETE,UPDATE,OPTIONS"
  );

  next();
});

// Routes
app.use("/api/v1/users/", userRouter);
app.use("/api/v1/blogs/", blogRouter);
app.use("/api/v1/subscrptions/", subscriptionRouter);
app.use("/api/v1/plans/", planRouter);
app.use("/api/v1/", heatmapRouter);

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Internal Server Error";
  res.status(status).json({ status: "error", message });
});

module.exports = app;
