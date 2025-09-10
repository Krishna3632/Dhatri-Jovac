import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import auth from './routes/auth.js';
import UserSchema from './models/UserSchema.js';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/api/auth', auth); // 👈 Use the imported variable here

app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on http://localhost:${PORT}`);
});