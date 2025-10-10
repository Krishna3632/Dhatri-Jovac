import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// ✅ Predefined user with hashed password (for testing)
const hashedPassword = await bcrypt.hash("password123", 10);
let users = [{ id: 1, email: "test@gmail.com", password: hashedPassword }];

// ✅ Helper to create JWT token
const createToken = (user) => {
  return jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
};

// ✅ REGISTER
router.post("/register", async (req, res) => {
  const { email, password } = req.body;

  const existing = users.find((u) => u.email === email);
  if (existing) return res.status(400).json({ message: "User already exists" });

  const hashed = await bcrypt.hash(password, 10);
  const newUser = { id: users.length + 1, email, password: hashed };
  users.push(newUser);

  res.status(201).json({ message: "User registered successfully" });
});

// ✅ LOGIN
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = users.find((u) => u.email === email);
  if (!user) return res.status(400).json({ message: "User not found" });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).json({ message: "Invalid credentials" });

  const token = createToken(user);

  // ✅ Set JWT in cookie
  res.cookie("token", token, {
    httpOnly: true,
    secure: false, // true in production (HTTPS)
    sameSite: "lax",
    maxAge: 60 * 60 * 1000, // 1 hour
  });

  res.json({ message: "Login successful" });
});

router.get("/check-token", (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.json({ message: "Token is valid", user: decoded });
    console.log(decoded);
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
});
// ✅ PROFILE (Protected)
router.get("/profile", authMiddleware, (req, res) => {
  res.json({ message: "Welcome to your profile!", user: req.user });
});

// ✅ LOGOUT
router.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out successfully" });
});

export default router;
