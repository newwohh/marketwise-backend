const HandleResponse = require("../utils/handleResponse");

exports.handlerFactory = (status, statusCode, message, res, data) => {
  switch (statusCode) {
    case 400:
      new HandleResponse(
        status,
        400,
        "Sorry please provide data",
        res
      ).failedReturn();
      break;
    case 401:
      new HandleResponse(
        status,
        401,
        "Sorry no user found",
        res
      ).failedReturn();
      break;
    case 404:
      new HandleResponse(
        status,
        400,
        "Sorry requested data not found",
        res
      ).failedReturn();
      break;
    case 200:
      new HandleResponse(
        status,
        200,
        "Good request",
        res,
        data
      ).successReturn();
      break;

    default:
      break;
  }
};
