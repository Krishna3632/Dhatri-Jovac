import express from 'express';
import connectDB from './config/db.js';
import doctorRoutes from './routes/doctors.js';
import "./models/userModel.js"; // <-- register User schema globally
import userRoutes from './routes/users.js';
import cors from 'cors';
import patientRoutes from './routes/patients.js';
const app = express();
const PORT = process.env.PORT || 4000;
import authRoutes from "./routes/auth.js";
import cookieParser from "cookie-parser";
app.use(express.json());
app.use(cookieParser());

// ✅ Allow cookies from React frontend
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
}));
app.use("/api/patients", patientRoutes);
app.use("/api/auth", authRoutes);
// ✅ Mount the doctor routes
app.use('/api/doctors', doctorRoutes);

app.use('/api/users', userRoutes);
app.get('/', (req, res) => {
  res.json({ message: 'Server is running!' });
});

app.listen(PORT, () => {
  connectDB();
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
