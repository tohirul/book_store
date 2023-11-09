import httpStatus from "http-status";

const DuplicateError = (error) => {
  const errors = [
    {
      path: "",
      message: error.message,
    },
  ];

  const statusCode = httpStatus.CONFLICT;

  return {
    statusCode,
    message: `Duplicate Entry: ${err.message || "Duplicate entry error"}`,
    errorMessages: errors,
  };
};

export default DuplicateError;
