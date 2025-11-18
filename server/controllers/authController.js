import User from "../models/userModel.js";
import RefreshToken from "../models/refreshTokenModel.js";
import AuditLog from "../models/auditLogModel.js";
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from "../utils/tokenUtils.js";
import { AppError } from "../middleware/errorMiddleware.js";
import crypto from "crypto";

/**
 * REGISTER - Create new user account
 * POST /api/auth/register
 */
export const register = async (req, res, next) => {
  try {
    const { name, email, password, role, phone } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      throw new AppError("User with this email already exists", 409, "USER_EXISTS");
    }

    // Create user
    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password,
      role: role || "patient",
      phoneNumber: phone,
    });

    // Generate tokens
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    // Store refresh token in database
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days
    await RefreshToken.create({
      userId: user._id,
      tokenHash: refreshToken,
      deviceInfo: req.headers["user-agent"] || "Unknown",
      ipAddress: req.ip,
      userAgent: req.headers["user-agent"],
      expiresAt,
    });

    // Set refresh token as httpOnly cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: "/api/auth",
    });

    // Log successful registration
    await AuditLog.logEvent({
      userId: user._id,
      action: "REGISTER",
      ipAddress: req.ip,
      userAgent: req.headers["user-agent"],
      success: true,
    });

    // Send response
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
        accessToken,
        expiresIn: "15m",
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * LOGIN - Authenticate user
 * POST /api/auth/login
 */
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Find user (include password for comparison)
    const user = await User.findOne({ email: email.toLowerCase() }).select("+password");

    if (!user) {
      // Log failed attempt
      await AuditLog.logEvent({
        action: "FAILED_LOGIN",
        ipAddress: req.ip,
        userAgent: req.headers["user-agent"],
        success: false,
        errorMessage: "User not found",
        metadata: { email },
      });

      throw new AppError("Invalid email or password", 401, "INVALID_CREDENTIALS");
    }

    // Check if account is active
    if (!user.isActive) {
      throw new AppError("Account has been deactivated", 403, "ACCOUNT_DEACTIVATED");
    }

    // Check if account is locked
    if (user.isLocked) {
      const lockTime = Math.ceil((user.lockUntil - Date.now()) / 60000);
      
      await AuditLog.logEvent({
        userId: user._id,
        action: "FAILED_LOGIN",
        ipAddress: req.ip,
        userAgent: req.headers["user-agent"],
        success: false,
        errorMessage: "Account locked",
      });

      throw new AppError(
        `Account is locked due to too many failed login attempts. Try again in ${lockTime} minutes`,
        403,
        "ACCOUNT_LOCKED"
      );
    }

    // Compare password
    const isPasswordCorrect = await user.comparePassword(password);

    if (!isPasswordCorrect) {
      // Increment failed login attempts
      await user.incrementLoginAttempts();

      await AuditLog.logEvent({
        userId: user._id,
        action: "FAILED_LOGIN",
        ipAddress: req.ip,
        userAgent: req.headers["user-agent"],
        success: false,
        errorMessage: "Invalid password",
      });

      throw new AppError("Invalid email or password", 401, "INVALID_CREDENTIALS");
    }

    // Reset failed login attempts
    await user.resetLoginAttempts();

    // Generate tokens
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    // Store refresh token in database
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    await RefreshToken.create({
      userId: user._id,
      tokenHash: refreshToken,
      deviceInfo: req.headers["user-agent"] || "Unknown",
      ipAddress: req.ip,
      userAgent: req.headers["user-agent"],
      expiresAt,
    });

    // Set refresh token as httpOnly cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: "/api/auth",
    });

    // Log successful login
    await AuditLog.logEvent({
      userId: user._id,
      action: "LOGIN",
      ipAddress: req.ip,
      userAgent: req.headers["user-agent"],
      success: true,
    });

    // Send response
    res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
        accessToken,
        expiresIn: "15m",
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * REFRESH TOKEN - Get new access token using refresh token
 * POST /api/auth/refresh
 */
export const refreshAccessToken = async (req, res, next) => {
  try {
    // Get refresh token from cookie or body
    const oldRefreshToken = req.cookies.refreshToken || req.body.refreshToken;

    if (!oldRefreshToken) {
      throw new AppError("Refresh token not provided", 401, "NO_REFRESH_TOKEN");
    }

    // Verify refresh token
    let decoded;
    try {
      decoded = verifyRefreshToken(oldRefreshToken);
    } catch (error) {
      throw new AppError("Invalid or expired refresh token", 401, "INVALID_REFRESH_TOKEN");
    }

    // Find refresh token in database
    const storedToken = await RefreshToken.findOne({
      userId: decoded.userId,
      isRevoked: false,
      expiresAt: { $gt: Date.now() },
    }).select("+tokenHash");

    if (!storedToken) {
      throw new AppError("Refresh token not found or expired", 401, "INVALID_REFRESH_TOKEN");
    }

    // Compare token
    const isValid = await storedToken.compareToken(oldRefreshToken);
    if (!isValid) {
      throw new AppError("Invalid refresh token", 401, "INVALID_REFRESH_TOKEN");
    }

    // Find user
    const user = await User.findById(decoded.userId);
    if (!user || !user.isActive) {
      throw new AppError("User not found or inactive", 401, "USER_NOT_FOUND");
    }

    // Generate new tokens (Token Rotation)
    const newAccessToken = generateAccessToken(user);
    const newRefreshToken = generateRefreshToken(user);

    // Revoke old refresh token
    await storedToken.revoke("Token rotated");

    // Store new refresh token
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    await RefreshToken.create({
      userId: user._id,
      tokenHash: newRefreshToken,
      deviceInfo: req.headers["user-agent"] || "Unknown",
      ipAddress: req.ip,
      userAgent: req.headers["user-agent"],
      expiresAt,
    });

    // Set new refresh token cookie
    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: "/api/auth",
    });

    // Log token refresh
    await AuditLog.logEvent({
      userId: user._id,
      action: "TOKEN_REFRESH",
      ipAddress: req.ip,
      userAgent: req.headers["user-agent"],
      success: true,
    });

    res.status(200).json({
      success: true,
      message: "Token refreshed successfully",
      data: {
        accessToken: newAccessToken,
        expiresIn: "15m",
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * LOGOUT - Revoke refresh token
 * POST /api/auth/logout
 */
export const logout = async (req, res, next) => {
  try {
    const refreshToken = req.cookies.refreshToken || req.body.refreshToken;

    if (refreshToken) {
      // Verify and revoke token
      try {
        const decoded = verifyRefreshToken(refreshToken);
        await RefreshToken.updateOne(
          { userId: decoded.userId, isRevoked: false },
          { $set: { isRevoked: true, revokedAt: Date.now(), revokedReason: "User logout" } }
        );
      } catch (error) {
        // Token invalid or expired - continue with logout
      }
    }

    // Clear cookie
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/api/auth",
    });

    // Log logout
    if (req.user) {
      await AuditLog.logEvent({
        userId: req.user.userId,
        action: "LOGOUT",
        ipAddress: req.ip,
        userAgent: req.headers["user-agent"],
        success: true,
      });
    }

    res.status(200).json({
      success: true,
      message: "Logout successful",
    });
  } catch (error) {
    next(error);
  }
};

/**
 * LOGOUT ALL DEVICES - Revoke all refresh tokens for user
 * POST /api/auth/logout-all
 */
export const logoutAllDevices = async (req, res, next) => {
  try {
    if (!req.user) {
      throw new AppError("Authentication required", 401, "NOT_AUTHENTICATED");
    }

    // Revoke all refresh tokens for user
    await RefreshToken.revokeAllForUser(req.user.userId);

    // Clear cookie
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/api/auth",
    });

    // Log logout all
    await AuditLog.logEvent({
      userId: req.user.userId,
      action: "LOGOUT",
      ipAddress: req.ip,
      userAgent: req.headers["user-agent"],
      success: true,
      metadata: { logoutType: "all_devices" },
    });

    res.status(200).json({
      success: true,
      message: "Logged out from all devices successfully",
    });
  } catch (error) {
    next(error);
  }
};

/**
 * GET CURRENT USER - Get authenticated user details
 * GET /api/auth/me
 */
export const getCurrentUser = async (req, res, next) => {
  try {
    if (!req.user) {
      throw new AppError("Authentication required", 401, "NOT_AUTHENTICATED");
    }

    const user = await User.findById(req.user.userId);

    if (!user) {
      throw new AppError("User not found", 404, "USER_NOT_FOUND");
    }

    res.status(200).json({
      success: true,
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          phone: user.phoneNumber,
          isActive: user.isActive,
          isEmailVerified: user.isEmailVerified,
          lastLogin: user.lastLogin,
          createdAt: user.createdAt,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

export default {
  register,
  login,
  refreshAccessToken,
  logout,
  logoutAllDevices,
  getCurrentUser,
};
