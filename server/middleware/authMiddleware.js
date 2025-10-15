import userModel from "../models/userModel.js";

export const authMiddleware = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: "Unauthorized: No token" });

  try {
    const secret = process.env.JWT_SECRET || "your-secret-key";
    const decoded = jwt.verify(token, secret);

    // Optional: fetch full user
    const user = await userModel.findById(decoded.userId);
    if (!user) return res.status(401).json({ message: "User not found" });

    req.user = user; // attach full user object
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
