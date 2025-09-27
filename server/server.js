import express from 'express';
import connectDB from './config/db.js';
import doctorRoutes from './routes/doctors.js';
import "./models/userModel.js"; // <-- register User schema globally
import userRoutes from './routes/users.js';
const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());

// ✅ Mount the doctor routes
app.use('/api', doctorRoutes);

app.use('/api/users',userRoutes);
app.get('/', (req, res) => {
  res.json({ message: 'Server is running!' });
});

app.listen(PORT, () => {
  connectDB();
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
