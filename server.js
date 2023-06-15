const app = require("./app");

const port = process.env.port || 5050;

const server = app.listen(port, () => {
  console.log(`App running on ${port}`);
});
