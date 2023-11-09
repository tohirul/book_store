// import { Error } from "mongoose";

class ApiError extends Error {
  statusCode;
  constructor(code, message, stack = "") {
    super(message);
    this.statusCode = code;

    if (stack.length) {
      this.stack = stack;
    } else Error.captureStackTrace(this, this.constructor);
  }
}

export default ApiError;
