import AuditLog from "../models/auditLogModel.js";

/**
 * Custom error class for operational errors
 */
export class AppError extends Error {
  constructor(message, statusCode, code = "ERROR") {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Async error wrapper
 * Wraps async route handlers to catch errors
 */
export const asyncHandler = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

/**
 * Handle Mongoose Cast Errors (Invalid ObjectId)
 */
const handleCastError = (error) => {
  const message = `Invalid ${error.path}: ${error.value}`;
  return new AppError(message, 400, "INVALID_ID");
};

/**
 * Handle Mongoose Duplicate Key Errors
 */
const handleDuplicateFieldsError = (error) => {
  const field = Object.keys(error.keyValue)[0];
  const value = error.keyValue[field];
  const message = `${field} '${value}' already exists. Please use another value`;
  return new AppError(message, 409, "DUPLICATE_FIELD");
};

/**
 * Handle Mongoose Validation Errors
 */
const handleValidationError = (error) => {
  const errors = Object.values(error.errors).map((el) => el.message);
  const message = `Invalid input data: ${errors.join(". ")}`;
  return new AppError(message, 400, "VALIDATION_ERROR");
};

/**
 * Handle JWT Errors
 */
const handleJWTError = () => {
  return new AppError("Invalid token. Please log in again", 401, "INVALID_TOKEN");
};

/**
 * Handle JWT Expired Error
 */
const handleJWTExpiredError = () => {
  return new AppError("Your token has expired. Please log in again", 401, "TOKEN_EXPIRED");
};

/**
 * Send error response in development
 */
const sendErrorDev = (err, req, res) => {
  res.status(err.statusCode).json({
    success: false,
    error: err,
    message: err.message,
    code: err.code,
    stack: err.stack,
  });
};

/**
 * Send error response in production
 */
const sendErrorProd = (err, req, res) => {
  // Operational, trusted error: send message to client
  if (err.isOperational) {
    res.status(err.statusCode).json({
      success: false,
      message: err.message,
      code: err.code,
    });
  } else {
    // Programming or unknown error: don't leak error details
    console.error("ERROR 💥", err);

    res.status(500).json({
      success: false,
      message: "Something went wrong",
      code: "INTERNAL_SERVER_ERROR",
    });
  }
};

/**
 * Global error handling middleware
 */
export const errorHandler = async (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.code = err.code || "ERROR";

  // Log error to audit log
  try {
    await AuditLog.logEvent({
      userId: req.user?.userId,
      action: "ERROR",
      ipAddress: req.ip,
      userAgent: req.headers["user-agent"],
      success: false,
      errorMessage: err.message,
      metadata: {
        statusCode: err.statusCode,
        code: err.code,
        path: req.originalUrl,
        method: req.method,
        stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
      },
    });
  } catch (logError) {
    console.error("Failed to log error:", logError);
  }

  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, req, res);
  } else {
    let error = { ...err };
    error.message = err.message;

    // Handle specific error types
    if (err.name === "CastError") error = handleCastError(err);
    if (err.code === 11000) error = handleDuplicateFieldsError(err);
    if (err.name === "ValidationError") error = handleValidationError(err);
    if (err.name === "JsonWebTokenError") error = handleJWTError();
    if (err.name === "TokenExpiredError") error = handleJWTExpiredError();

    sendErrorProd(error, req, res);
  }
};

/**
 * 404 Not Found Handler
 */
export const notFoundHandler = (req, res, next) => {
  const error = new AppError(`Cannot find ${req.originalUrl} on this server`, 404, "NOT_FOUND");
  next(error);
};

/**
 * Unhandled Rejection Handler
 */
export const handleUnhandledRejection = (server) => {
  process.on("unhandledRejection", (err) => {
    console.error("UNHANDLED REJECTION! 💥 Shutting down...");
    console.error(err.name, err.message);
    server.close(() => {
      process.exit(1);
    });
  });
};

/**
 * Uncaught Exception Handler
 */
export const handleUncaughtException = () => {
  process.on("uncaughtException", (err) => {
    console.error("UNCAUGHT EXCEPTION! 💥 Shutting down...");
    console.error(err.name, err.message);
    process.exit(1);
  });
};

export default {
  AppError,
  asyncHandler,
  errorHandler,
  notFoundHandler,
  handleUnhandledRejection,
  handleUncaughtException,
};
