import express from 'express';
import connectDB from './config/db';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());


app.listen(PORT, () => {
    connectDB();
  console.log(`Server is running on http://localhost:${PORT}`);
});