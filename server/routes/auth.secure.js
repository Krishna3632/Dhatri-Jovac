import express from "express";
import {
  register,
  login,
  refreshAccessToken,
  logout,
  logoutAllDevices,
  getCurrentUser,
} from "../controllers/authController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import {
  validateRegistrationInput,
  validateLoginInput,
} from "../middleware/validationMiddleware.js";
import {
  registrationLimiter,
  authLimiter,
  refreshTokenLimiter,
  bruteForcePrevention,
} from "../middleware/rateLimitMiddleware.js";
import { asyncHandler } from "../middleware/errorMiddleware.js";

const router = express.Router();

/**
 * @route   POST /api/auth/register
 * @desc    Register a new user
 * @access  Public
 * @rateLimit 3 requests per hour per IP
 */
router.post(
  "/register",
  registrationLimiter,
  validateRegistrationInput,
  asyncHandler(register)
);

/**
 * @route   POST /api/auth/login
 * @desc    Login user
 * @access  Public
 * @rateLimit 5 requests per 15 minutes per IP
 */
router.post(
  "/login",
  authLimiter,
  bruteForcePrevention,
  validateLoginInput,
  asyncHandler(login)
);

/**
 * @route   POST /api/auth/refresh
 * @desc    Refresh access token using refresh token
 * @access  Public (requires valid refresh token)
 * @rateLimit 20 requests per 15 minutes per IP
 */
router.post(
  "/refresh",
  refreshTokenLimiter,
  asyncHandler(refreshAccessToken)
);

/**
 * @route   POST /api/auth/logout
 * @desc    Logout user (revoke refresh token)
 * @access  Public
 */
router.post("/logout", asyncHandler(logout));

/**
 * @route   POST /api/auth/logout-all
 * @desc    Logout from all devices (revoke all refresh tokens)
 * @access  Private
 */
router.post(
  "/logout-all",
  authMiddleware,
  asyncHandler(logoutAllDevices)
);

/**
 * @route   GET /api/auth/me
 * @desc    Get current authenticated user
 * @access  Private
 */
router.get("/me", authMiddleware, asyncHandler(getCurrentUser));

/**
 * @route   GET /api/auth/health
 * @desc    Health check for auth service
 * @access  Public
 */
router.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Auth service is running",
    timestamp: new Date().toISOString(),
  });
});

export default router;
