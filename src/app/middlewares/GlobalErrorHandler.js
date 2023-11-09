import httpStatus from "http-status";
import ApiError from "../errors/ApiError";
import ValidationError from "../errors/ValidationError";
import ZodError from "../errors/ZodError";
import CastError from "../errors/CastError";
import DuplicateError from "../errors/DuplicateError";

const GlobalErrorHandler = (error, req, res, next) => {
  let statusCode = httpStatus.NOT_FOUND;
  let message = `Something went wrong!`;
  let errorMessages = [];

  if (error instanceof ApiError) {
    statusCode = error?.statusCode;
    message = error?.message ? error.message : "An error occurred";
    errorMessages = error?.message
      ? [
          {
            path: "",
            message: error?.message,
          },
        ]
      : [];
  } else if (error.name === "ValidationError") {
    const decoded_error = ValidationError(error);
    statusCode = decoded_error.statusCode;
    message = decoded_error.message;
    errorMessages = decoded_error.errorMessages;
  } else if (error instanceof ZodError) {
    const decoded_error = ZodError(error);
    statusCode = decoded_error.statusCode;
    message = decoded_error.message;
    errorMessages = decoded_error.errorMessages;
  } else if (error instanceof Error.CastError) {
    const decoded_error = CastError(error);
    statusCode = decoded_error.statusCode;
    message = decoded_error.message;
    errorMessages = decoded_error.errorMessages;
  } else if ("code" in error && error.code === 11000) {
    const decoded_error = DuplicateError(error);
    statusCode = decoded_error.statusCode;
    message = decoded_error.message;
    errorMessages = decoded_error.errorMessages;
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: config.env !== "production" ? error?.stack : undefined,
  });
};

export default GlobalErrorHandler;
