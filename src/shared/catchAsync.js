/**
 * A middleware function for handling asynchronous request handlers and catching errors.
 *
 * @param fn - The asynchronous request handler function to be wrapped.
 * @returns A new request handler function that handles errors and passes them to the next middleware.
 */
const catchAsync = (fn) => {
  return async (req, res, next) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};

export default catchAsync;
