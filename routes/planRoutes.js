const express = require("express");
const planController = require("../controllers/planHandler");

let planRouter = express.Router();

planRouter.post("/chooseplan", planController.createPlan);
planRouter.post("/verifypayment", planController.verifyPayment);

module.exports = planRouter;
