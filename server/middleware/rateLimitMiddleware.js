import rateLimit from "express-rate-limit";
import MongoStore from "rate-limit-mongo";

/**
 * General API rate limiter
 * 100 requests per 15 minutes per IP
 */
export const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: {
    success: false,
    message: "Too many requests from this IP, please try again later",
    code: "RATE_LIMIT_EXCEEDED",
  },
  standardHeaders: true, // Return rate limit info in `RateLimit-*` headers
  legacyHeaders: false, // Disable `X-RateLimit-*` headers
  // Store in MongoDB for distributed systems
  // store: new MongoStore({
  //   uri: process.env.MONGODB_URI,
  //   collectionName: "rateLimits",
  //   expireTimeMs: 15 * 60 * 1000,
  // }),
});

/**
 * Strict rate limiter for authentication endpoints
 * Prevents brute-force attacks
 * 5 requests per 15 minutes per IP
 */
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 login requests per windowMs
  skipSuccessfulRequests: true, // Don't count successful requests
  message: {
    success: false,
    message: "Too many authentication attempts, please try again after 15 minutes",
    code: "AUTH_RATE_LIMIT_EXCEEDED",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

/**
 * Strict rate limiter for registration
 * Prevents spam registrations
 * 3 registrations per hour per IP
 */
export const registrationLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 3, // Limit each IP to 3 registrations per hour
  message: {
    success: false,
    message: "Too many accounts created from this IP, please try again after an hour",
    code: "REGISTRATION_RATE_LIMIT_EXCEEDED",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

/**
 * Rate limiter for password reset requests
 * 3 requests per hour per IP
 */
export const passwordResetLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 3,
  message: {
    success: false,
    message: "Too many password reset requests, please try again after an hour",
    code: "PASSWORD_RESET_RATE_LIMIT_EXCEEDED",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

/**
 * Rate limiter for token refresh
 * 20 requests per 15 minutes per IP
 */
export const refreshTokenLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20,
  message: {
    success: false,
    message: "Too many token refresh requests, please try again later",
    code: "REFRESH_RATE_LIMIT_EXCEEDED",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

/**
 * Custom rate limiter factory
 * @param {number} windowMs - Time window in milliseconds
 * @param {number} max - Max requests per window
 * @param {string} message - Error message
 */
export const createRateLimiter = (windowMs, max, message) => {
  return rateLimit({
    windowMs,
    max,
    message: {
      success: false,
      message: message || "Rate limit exceeded",
      code: "RATE_LIMIT_EXCEEDED",
    },
    standardHeaders: true,
    legacyHeaders: false,
  });
};

/**
 * IP-based brute force protection
 * More sophisticated than simple rate limiting
 */
const loginAttempts = new Map();

export const bruteForcePrevention = (req, res, next) => {
  const ip = req.ip;
  const now = Date.now();
  const windowMs = 15 * 60 * 1000; // 15 minutes
  const maxAttempts = 10;

  // Get attempts for this IP
  let attempts = loginAttempts.get(ip) || [];

  // Remove old attempts outside the time window
  attempts = attempts.filter(timestamp => now - timestamp < windowMs);

  // Check if max attempts exceeded
  if (attempts.length >= maxAttempts) {
    return res.status(429).json({
      success: false,
      message: "Too many failed login attempts. Account temporarily locked.",
      code: "BRUTE_FORCE_DETECTED",
      retryAfter: Math.ceil((attempts[0] + windowMs - now) / 1000),
    });
  }

  // Add current attempt
  attempts.push(now);
  loginAttempts.set(ip, attempts);

  // Clean up old entries periodically
  if (Math.random() < 0.01) { // 1% chance to clean up
    const cutoff = now - windowMs;
    for (const [key, value] of loginAttempts.entries()) {
      const validAttempts = value.filter(timestamp => now - timestamp < windowMs);
      if (validAttempts.length === 0) {
        loginAttempts.delete(key);
      } else {
        loginAttempts.set(key, validAttempts);
      }
    }
  }

  next();
};

export default {
  generalLimiter,
  authLimiter,
  registrationLimiter,
  passwordResetLimiter,
  refreshTokenLimiter,
  bruteForcePrevention,
  createRateLimiter,
};
