const express = require("express");
const planController = require("../controllers/planHandler");

let planRouter = express.Router();

planRouter.post("/chooseplan", planController.choosePlan);

module.exports = planRouter;
