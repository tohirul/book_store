import httpStatus from "http-status";

const ZodError = (error) => {
  const errors = error.issues.map((issue) => {
    return {
      path: issue.path[issue.path.length - 1],
      message: issue.message,
    };
  });
  const statusCode = httpStatus.CONFLICT;
  return {
    statusCode,
    message:
      "Zod Validation Error: The provided data did not pass Zod Validation checks.",
    errorMessages: errors,
  };
};

export default ZodError;
