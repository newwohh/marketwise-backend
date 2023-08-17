exports.heatmap = async (req, res, next) => {
  const { user } = req.body;

  res.send({ status: "success" });
};
