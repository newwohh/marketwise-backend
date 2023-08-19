class HandleResponse {
  constructor(status, statusCode, message, res, data, req) {
    this.status = status;
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
    this.res = res;
    this.req = req;
  }

  successReturn() {
    if (this.statusCode === 200) {
      this.res.status(this.statusCode).json({
        status: this.status,
        message: this.message,
        data: this.data,
      });
    }
  }

  failedReturn() {
    if (this.statusCode !== 200) {
      this.res.status(this.statusCode).json({
        status: this.status,
        message: this.message,
      });
    }
  }
}

module.exports = HandleResponse;
