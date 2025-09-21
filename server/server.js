import express from 'express';
import connectDB from './config/db.js';
import doctorRoutes from './routes/doctorRoutes.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// ✅ Mount the doctor routes
app.use('/api', doctorRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Server is running!' });
});

app.listen(PORT, () => {
  connectDB();
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
