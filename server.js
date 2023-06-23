const mongoose = require("mongoose");
const app = require("./app");

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB SUCCESS"));

const port = process.env.port || 5050;

const server = app.listen(port, () => {
  console.log(`App running on ${port}`);
});
