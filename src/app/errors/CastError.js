import httpStatus from "http-status";

const CastError = (error) => {
  const errors = [
    {
      path: error.path,
      message: error.message,
    },
  ];
  const statusCode = httpStatus.BAD_REQUEST;

  return {
    statusCode,
    message: `Cast Error: ${err?.kind} failed for value '${err?.value}' at path '${err?.path}'`,
    errorMessages: errors,
  };
};

export default CastError;
