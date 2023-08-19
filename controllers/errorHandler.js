exports.errorHandler = (status, statusCode, message, res) => {
  res.status(statusCode).json({
    status: status,
    message: message,
  });
};
