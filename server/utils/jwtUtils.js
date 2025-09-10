import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;
const TOKEN_HEADER_KEY = process.env.TOKEN_HEADER_KEY || "auth-token";

// Generate Access Token (short-lived)
export const generateAccessToken = (payload) => {
  return jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: "30m" });
};

// Generate Refresh Token (long-lived)
export const generateRefreshToken = (payload) => {
  return jwt.sign(payload, JWT_REFRESH_SECRET, { expiresIn: "7d" });
};

// Verify Access Token
export const verifyAccessToken = (req) => {
  const token = req.header(TOKEN_HEADER_KEY);

  if (!token) {
    throw new Error(`Access Denied: No token provided in '${TOKEN_HEADER_KEY}' header.`);
  }

  try {
    return jwt.verify(token, JWT_SECRET_KEY);
  } catch (error) {
    throw error;
  }
};

// Verify Refresh Token
export const verifyRefreshToken = (token) => {
  try {
    return jwt.verify(token, JWT_REFRESH_SECRET);
  } catch (error) {
    throw error;
  }
};
