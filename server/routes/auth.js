// routes/auth.js
import express from "express";
import { generateAccessToken, generateRefreshToken } from "../utils/jwtUtils.js";
import authMiddleware from "../middlewares/auth.js";
import UserSchema from "../models/UserSchema.js";

const auth = express.Router();

// LOGIN
auth.post('/register', async (req, res) => { const { name, email, password, isDoctor } = req.body; const existingUser = await UserSchema.findOne({ email: email }); if (existingUser) { return res.status(400).json({ error: "Email already in use" }); } const newUser = new UserSchema({ name, email, password, isDoctor }); await newUser.save(); res.status(201).json({ message: "User registered successfully" }); });



auth.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await UserSchema.findOne({ email, password });
  if (!user) {
    return res.status(401).json({ error: "Invalid email or password" });
  }

  const userPayload = { id: user._id, email: user.email, isDoctor: user.isDoctor };

  const accessToken = generateAccessToken(userPayload);
  const refreshToken = generateRefreshToken(userPayload);

  // Save refresh token in DB
  user.refreshToken = refreshToken;
  await user.save();

  res.json({
    accessToken,
    refreshToken,
    user: userPayload,
  });
});

// REFRESH TOKEN
auth.post("/refresh", async (req, res) => {
  const refreshToken = req.cookies?.refreshToken;
  if (!refreshToken) return res.status(403).json({ error: "Refresh token required" });

  try {
    const user = await UserSchema.findOne({ refreshToken });
    if (!user) return res.status(403).json({ error: "Invalid refresh token" });

    const payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

    const newAccessToken = generateAccessToken({
      id: payload.id,
      email: payload.email,
      isDoctor: payload.isDoctor,
    });

    res.json({ accessToken: newAccessToken });
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired refresh token" });
  }
});


auth.post("/logout", async (req, res) => {
  const refreshToken = req.cookies?.refreshToken;
  if (refreshToken) {
    const user = await UserSchema.findOne({ refreshToken });
    if (user) {
      user.refreshToken = null;
      await user.save();
    }
  }

  res.clearCookie("refreshToken");
  res.json({ message: "Logged out successfully" });
});

auth.get("/protected", authMiddleware, async (req, res) => {
  try {
    const user = await UserSchema.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({
      message: "This is protected data",
      user,
      refreshToken: user.refreshToken, 
    });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
});


export default auth;
