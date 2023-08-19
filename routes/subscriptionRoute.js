const express = require("express");

const subscriptionController = require("../controllers/subscribeController");
const { protect } = require("../middlewares/middlewares");

const subscriptionRouter = express.Router();

subscriptionRouter.use(protect);

subscriptionRouter.post(
  "/newsubscription",
  subscriptionController.createSubscription
);
subscriptionRouter.get(
  "/getsubscription/:id",
  subscriptionController.getSubscription
);

module.exports = subscriptionRouter;
