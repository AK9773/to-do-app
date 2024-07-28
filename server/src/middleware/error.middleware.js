import { ApiError } from "../utils/apiError.utils.js";

const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  if (err instanceof ApiError) {
    return res.status(statusCode).json({
      ...err,
      message: err.message,
    });
  }

  return res.status(statusCode).json({ statusCode, message: err.message });
};

export default errorHandler;
