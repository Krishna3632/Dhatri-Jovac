import {
  validateRegistration,
  validateLogin,
  validatePasswordChange,
  validateEmail,
  sanitizeInput,
  validateObjectId,
} from "../utils/validationSchemas.js";

/**
 * Middleware to validate registration input
 */
export const validateRegistrationInput = (req, res, next) => {
  try {
    // Sanitize inputs
    if (req.body.name) req.body.name = sanitizeInput(req.body.name);
    if (req.body.email) req.body.email = sanitizeInput(req.body.email);
    if (req.body.phone) req.body.phone = sanitizeInput(req.body.phone);

    // Validate
    const validation = validateRegistration(req.body);

    if (!validation.isValid) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        code: "VALIDATION_ERROR",
        errors: validation.errors,
      });
    }

    next();
  } catch (error) {
    console.error("Validation error:", error);
    return res.status(500).json({
      success: false,
      message: "Validation error",
      code: "VALIDATION_ERROR",
    });
  }
};

/**
 * Middleware to validate login input
 */
export const validateLoginInput = (req, res, next) => {
  try {
    // Sanitize inputs
    if (req.body.email) req.body.email = sanitizeInput(req.body.email);

    // Validate
    const validation = validateLogin(req.body);

    if (!validation.isValid) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        code: "VALIDATION_ERROR",
        errors: validation.errors,
      });
    }

    next();
  } catch (error) {
    console.error("Validation error:", error);
    return res.status(500).json({
      success: false,
      message: "Validation error",
      code: "VALIDATION_ERROR",
    });
  }
};

/**
 * Middleware to validate password change input
 */
export const validatePasswordChangeInput = (req, res, next) => {
  try {
    const validation = validatePasswordChange(req.body);

    if (!validation.isValid) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        code: "VALIDATION_ERROR",
        errors: validation.errors,
      });
    }

    next();
  } catch (error) {
    console.error("Validation error:", error);
    return res.status(500).json({
      success: false,
      message: "Validation error",
      code: "VALIDATION_ERROR",
    });
  }
};

/**
 * Middleware to validate email input
 */
export const validateEmailInput = (req, res, next) => {
  try {
    if (req.body.email) req.body.email = sanitizeInput(req.body.email);

    const validation = validateEmail(req.body.email);

    if (!validation.isValid) {
      return res.status(400).json({
        success: false,
        message: validation.message,
        code: "VALIDATION_ERROR",
      });
    }

    next();
  } catch (error) {
    console.error("Validation error:", error);
    return res.status(500).json({
      success: false,
      message: "Validation error",
      code: "VALIDATION_ERROR",
    });
  }
};

/**
 * Middleware to validate MongoDB ObjectId parameters
 */
export const validateIdParam = (paramName = "id") => {
  return (req, res, next) => {
    const id = req.params[paramName];

    if (!validateObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: `Invalid ${paramName} format`,
        code: "INVALID_ID",
      });
    }

    next();
  };
};

/**
 * Middleware to sanitize all request body inputs
 */
export const sanitizeBody = (req, res, next) => {
  try {
    if (req.body && typeof req.body === "object") {
      for (const key in req.body) {
        if (typeof req.body[key] === "string") {
          req.body[key] = sanitizeInput(req.body[key]);
        }
      }
    }
    next();
  } catch (error) {
    console.error("Sanitization error:", error);
    next();
  }
};

/**
 * Middleware to sanitize query parameters
 */
export const sanitizeQuery = (req, res, next) => {
  try {
    if (req.query && typeof req.query === "object") {
      for (const key in req.query) {
        if (typeof req.query[key] === "string") {
          req.query[key] = sanitizeInput(req.query[key]);
        }
      }
    }
    next();
  } catch (error) {
    console.error("Sanitization error:", error);
    next();
  }
};

export default {
  validateRegistrationInput,
  validateLoginInput,
  validatePasswordChangeInput,
  validateEmailInput,
  validateIdParam,
  sanitizeBody,
  sanitizeQuery,
};
