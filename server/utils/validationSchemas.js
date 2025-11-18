/**
 * Input Validation Schemas for Authentication
 * Using custom validation logic (can be replaced with Joi/Yup)
 */

// Password validation regex
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Phone validation regex (US format)
const phoneRegex = /^\+?1?\s*\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;

/**
 * Validate registration input
 */
export const validateRegistration = (data) => {
  const errors = [];

  // Name validation
  if (!data.name || data.name.trim().length < 2) {
    errors.push({ field: "name", message: "Name must be at least 2 characters long" });
  }
  if (data.name && data.name.length > 100) {
    errors.push({ field: "name", message: "Name cannot exceed 100 characters" });
  }

  // Email validation
  if (!data.email) {
    errors.push({ field: "email", message: "Email is required" });
  } else if (!emailRegex.test(data.email)) {
    errors.push({ field: "email", message: "Invalid email format" });
  }

  // Password validation
  if (!data.password) {
    errors.push({ field: "password", message: "Password is required" });
  } else if (data.password.length < 8) {
    errors.push({ field: "password", message: "Password must be at least 8 characters long" });
  } else if (!passwordRegex.test(data.password)) {
    errors.push({
      field: "password",
      message: "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
    });
  }

  // Role validation
  if (data.role && !["patient", "doctor", "admin"].includes(data.role)) {
    errors.push({ field: "role", message: "Invalid role. Must be patient, doctor, or admin" });
  }

  // Phone validation (optional)
  if (data.phone && !phoneRegex.test(data.phone)) {
    errors.push({ field: "phone", message: "Invalid phone number format" });
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

/**
 * Validate login input
 */
export const validateLogin = (data) => {
  const errors = [];

  // Email validation
  if (!data.email) {
    errors.push({ field: "email", message: "Email is required" });
  } else if (!emailRegex.test(data.email)) {
    errors.push({ field: "email", message: "Invalid email format" });
  }

  // Password validation
  if (!data.password) {
    errors.push({ field: "password", message: "Password is required" });
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

/**
 * Validate password change input
 */
export const validatePasswordChange = (data) => {
  const errors = [];

  // Current password
  if (!data.currentPassword) {
    errors.push({ field: "currentPassword", message: "Current password is required" });
  }

  // New password
  if (!data.newPassword) {
    errors.push({ field: "newPassword", message: "New password is required" });
  } else if (data.newPassword.length < 8) {
    errors.push({ field: "newPassword", message: "New password must be at least 8 characters long" });
  } else if (!passwordRegex.test(data.newPassword)) {
    errors.push({
      field: "newPassword",
      message: "New password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
    });
  }

  // Confirm password
  if (data.newPassword !== data.confirmPassword) {
    errors.push({ field: "confirmPassword", message: "Passwords do not match" });
  }

  // Check if new password is different from current
  if (data.currentPassword === data.newPassword) {
    errors.push({ field: "newPassword", message: "New password must be different from current password" });
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

/**
 * Validate email input
 */
export const validateEmail = (email) => {
  if (!email) {
    return { isValid: false, message: "Email is required" };
  }
  if (!emailRegex.test(email)) {
    return { isValid: false, message: "Invalid email format" };
  }
  return { isValid: true };
};

/**
 * Validate password strength
 */
export const validatePasswordStrength = (password) => {
  const checks = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /\d/.test(password),
    special: /[@$!%*?&]/.test(password),
  };

  const strength = Object.values(checks).filter(Boolean).length;

  return {
    isValid: strength === 5,
    strength: strength === 5 ? "strong" : strength >= 3 ? "medium" : "weak",
    checks,
  };
};

/**
 * Sanitize user input (prevent XSS)
 */
export const sanitizeInput = (input) => {
  if (typeof input !== "string") return input;

  return input
    .trim()
    .replace(/[<>]/g, "") // Remove < and > to prevent script injection
    .replace(/javascript:/gi, "") // Remove javascript: protocol
    .replace(/on\w+=/gi, ""); // Remove event handlers
};

/**
 * Validate ObjectId
 */
export const validateObjectId = (id) => {
  return /^[0-9a-fA-F]{24}$/.test(id);
};
