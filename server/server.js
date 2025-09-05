import express from "express";
// import connectDB from "./config/db.js"; // Uncomment when DB is ready

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Sample route
app.get("/", (req, res) => {
  res.send("Server is up and running!");
});

// Start server
app.listen(PORT, () => {
  // connectDB(); // Call your DB connection here
  console.log(`Server is running on http://localhost:${PORT}`);
});
