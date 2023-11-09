import httpStatus from "http-status";

const ValidationError = (error) => {
  const errors = Object.values(err.errors).map((el) => {
    return {
      path: el?.path,
      message: el?.message,
    };
  });

  const statusCode = httpStatus.BAD_REQUEST;

  return {
    statusCode,
    message:
      "Validation Error: The provided data did not pass Mongoose validation checks",
    errorMessages: errors,
  };
};

export default ValidationError;
