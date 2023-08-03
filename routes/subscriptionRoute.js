const express = require("express");

const authController = require("../controllers/authController");
const subscriptionController = require("../controllers/subscribeController");

const subscriptionRouter = express.Router();

subscriptionRouter.post(
  "/newsubscription",
  subscriptionController.createSubscription
);
subscriptionRouter.get(
  "/getsubscription/:id",
  subscriptionController.getSubscription
);

module.exports = subscriptionRouter;
