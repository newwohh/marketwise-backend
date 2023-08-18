const express = require("express");
const heatmapController = require("../controllers/heatmapController");

const heatmapRouter = express.Router();

heatmapRouter.get("/heatmap/:id", heatmapController.heatmap);

module.exports = heatmapRouter;
