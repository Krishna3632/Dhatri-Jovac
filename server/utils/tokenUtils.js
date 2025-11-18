import jwt from "jsonwebtoken";
import crypto from "crypto";

const jwtConfig = {
  accessTokenSecret: process.env.JWT_ACCESS_SECRET || 'your-super-secret-access-key-min-256-bits',
  refreshTokenSecret: process.env.JWT_REFRESH_SECRET || 'your-super-secret-refresh-key-min-256-bits',
  accessTokenExpiry: process.env.JWT_ACCESS_EXPIRY || '15m',
  refreshTokenExpiry: process.env.JWT_REFRESH_EXPIRY || '7d',
};

/**
 * Generate Access Token (Short-lived)
 * Contains: userId, email, role
 * Expiry: 15 minutes
 */
export const generateAccessToken = (user) => {
  const payload = {
    userId: user._id.toString(),
    email: user.email,
    role: user.role,
    type: "access",
  };

  return jwt.sign(payload, jwtConfig.accessTokenSecret, {
    expiresIn: jwtConfig.accessTokenExpiry,
    issuer: "healthcare-platform",
    audience: "healthcare-api",
  });
};

/**
 * Generate Refresh Token (Long-lived)
 * Contains: userId, tokenId (for rotation)
 * Expiry: 7 days
 */
export const generateRefreshToken = (user, tokenId = null) => {
  const payload = {
    userId: user._id.toString(),
    tokenId: tokenId || crypto.randomBytes(32).toString("hex"),
    type: "refresh",
  };

  return jwt.sign(payload, jwtConfig.refreshTokenSecret, {
    expiresIn: jwtConfig.refreshTokenExpiry,
    issuer: "healthcare-platform",
    audience: "healthcare-api",
  });
};

/**
 * Verify Access Token
 */
export const verifyAccessToken = (token) => {
  try {
    return jwt.verify(token, jwtConfig.accessTokenSecret, {
      issuer: "healthcare-platform",
      audience: "healthcare-api",
    });
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      throw new Error("Access token expired");
    }
    if (error.name === "JsonWebTokenError") {
      throw new Error("Invalid access token");
    }
    throw new Error("Token verification failed");
  }
};

/**
 * Verify Refresh Token
 */
export const verifyRefreshToken = (token) => {
  try {
    return jwt.verify(token, jwtConfig.refreshTokenSecret, {
      issuer: "healthcare-platform",
      audience: "healthcare-api",
    });
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      throw new Error("Refresh token expired");
    }
    if (error.name === "JsonWebTokenError") {
      throw new Error("Invalid refresh token");
    }
    throw new Error("Token verification failed");
  }
};

/**
 * Decode token without verification (for debugging)
 */
export const decodeToken = (token) => {
  return jwt.decode(token, { complete: true });
};

/**
 * Get token expiry date
 */
export const getTokenExpiry = (token) => {
  const decoded = jwt.decode(token);
  if (decoded && decoded.exp) {
    return new Date(decoded.exp * 1000);
  }
  return null;
};

/**
 * Check if token is expired
 */
export const isTokenExpired = (token) => {
  const expiry = getTokenExpiry(token);
  return expiry ? expiry < new Date() : true;
};

/**
 * Generate random token for email verification, password reset, etc.
 */
export const generateRandomToken = () => {
  return crypto.randomBytes(32).toString("hex");
};

/**
 * Hash token for storage
 */
export const hashToken = (token) => {
  return crypto.createHash("sha256").update(token).digest("hex");
};
