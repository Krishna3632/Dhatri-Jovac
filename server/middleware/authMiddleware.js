import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import AuditLog from "../models/auditLogModel.js";
import { verifyAccessToken } from "../utils/tokenUtils.js";

/**
 * Main authentication middleware
 * Verifies JWT access token and attaches user to request
 */
export const authMiddleware = async (req, res, next) => {
  try {
    // Extract token from Authorization header
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "No authentication token provided",
        code: "NO_TOKEN",
      });
    }

    const token = authHeader.substring(7); // Remove "Bearer " prefix

    // Verify token
    let decoded;
    try {
      decoded = verifyAccessToken(token);
    } catch (error) {
      // Log unauthorized access attempt
      await AuditLog.logEvent({
        action: "UNAUTHORIZED_ACCESS",
        ipAddress: req.ip,
        userAgent: req.headers["user-agent"],
        success: false,
        errorMessage: error.message,
      });

      return res.status(401).json({
        success: false,
        message: error.message || "Invalid or expired token",
        code: "INVALID_TOKEN",
      });
    }

    // Verify token type
    if (decoded.type !== "access") {
      return res.status(401).json({
        success: false,
        message: "Invalid token type",
        code: "INVALID_TOKEN_TYPE",
      });
    }

    // Fetch user from database
    const user = await User.findById(decoded.userId).select("+password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
        code: "USER_NOT_FOUND",
      });
    }

    // Check if user is active
    if (!user.isActive) {
      return res.status(403).json({
        success: false,
        message: "Account has been deactivated",
        code: "ACCOUNT_DEACTIVATED",
      });
    }

    // Check if user is locked
    if (user.isLocked) {
      const lockTime = Math.ceil((user.lockUntil - Date.now()) / 60000);
      return res.status(403).json({
        success: false,
        message: `Account is locked. Try again in ${lockTime} minutes`,
        code: "ACCOUNT_LOCKED",
        lockUntil: user.lockUntil,
      });
    }

    // Check if password was changed after token was issued
    if (user.changedPasswordAfter(decoded.iat)) {
      return res.status(401).json({
        success: false,
        message: "Password was recently changed. Please log in again",
        code: "PASSWORD_CHANGED",
      });
    }

    // Attach user to request (without password)
    req.user = {
      userId: user._id,
      email: user.email,
      role: user.role,
      name: user.name,
      isEmailVerified: user.isEmailVerified,
    };

    // Attach full user object if needed (for specific routes)
    req.userFull = user;

    next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    return res.status(500).json({
      success: false,
      message: "Authentication error",
      code: "AUTH_ERROR",
    });
  }
};

/**
 * Optional authentication middleware
 * Doesn't fail if no token, but attaches user if valid token exists
 */
export const optionalAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return next(); // No token, continue without user
    }

    const token = authHeader.substring(7);

    try {
      const decoded = verifyAccessToken(token);
      
      if (decoded.type === "access") {
        const user = await User.findById(decoded.userId);
        
        if (user && user.isActive) {
          req.user = {
            userId: user._id,
            email: user.email,
            role: user.role,
            name: user.name,
          };
        }
      }
    } catch (error) {
      // Silently fail - optional auth
    }

    next();
  } catch (error) {
    next(); // Continue even if error
  }
};

export default authMiddleware;

