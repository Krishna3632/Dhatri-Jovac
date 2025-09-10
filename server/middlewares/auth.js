import { verifyAccessToken } from "../utils/jwtUtils.js";

const authMiddleware = (req, res, next) => {
  try {
    const decoded = verifyAccessToken(req); // ✅ only verify access tokens
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid or expired token", details: error.message });
  }
};

export default authMiddleware;
