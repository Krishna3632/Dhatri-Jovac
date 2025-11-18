import express from "express";
import connectDB from "./config/db.js";
import doctorRoutes from "./routes/doctors.js";
import "./models/userModel.js";
import userRoutes from "./routes/users.js";
import patientRoutes from "./routes/patients.js";
import authRoutes from "./routes/auth.secure.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { errorHandler } from "./middleware/errorMiddleware.js";
import { generalLimiter } from "./middleware/rateLimitMiddleware.js";

const app = express();
const PORT = process.env.PORT || 4000;


app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:5173",
  credentials: true,
}));

// Apply general rate limiting to all routes
app.use(generalLimiter);

app.use("/api/patients", patientRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Server is running!" });
});

// Error handling middleware (must be last)
app.use(errorHandler);

app.listen(PORT, () => {
  connectDB();
  console.log(`Server running at http://localhost:${PORT}`);
});
