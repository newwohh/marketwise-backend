const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const userRouter = require("./routes/userRoutes");
const app = express();
app.use(cors());

dotenv.config({ path: "./config/config.env" });

app.use(express.json({ limit: "10kb" }));

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

app.use(cookieParser());

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB SUCCESS"));

app.use("/", userRouter);

module.exports = app;
