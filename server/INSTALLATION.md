# Healthcare JWT Authentication System - Installation & Setup

## 📋 Prerequisites

- Node.js v18+ installed
- MongoDB running locally or MongoDB Atlas account
- npm or yarn package manager

## 🚀 Installation Steps

### 1. Install Dependencies

```bash
cd server
npm install
```

This will install:
- `express` - Web framework
- `mongoose` - MongoDB ODM
- `bcryptjs` - Password hashing
- `jsonwebtoken` - JWT generation/verification
- `express-rate-limit` - Rate limiting
- `cookie-parser` - Cookie parsing
- `cors` - CORS middleware
- `dotenv` - Environment variables

### 2. Setup Environment Variables

Create a `.env` file in the `server` directory:

```bash
cp .env.example .env
```

**CRITICAL**: Update these values for production:

```env
# Generate strong secrets (minimum 256 bits)
JWT_ACCESS_SECRET=$(openssl rand -base64 32)
JWT_REFRESH_SECRET=$(openssl rand -base64 32)

# Update MongoDB URI
MONGODB_URI=mongodb://localhost:27017/healthcare_db
# OR for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/healthcare_db

# Production settings
NODE_ENV=production
CORS_ORIGIN=https://yourdomain.com
COOKIE_SECURE=true
```

### 3. Database Setup

Ensure MongoDB is running:

```bash
# Local MongoDB
mongod

# Or use MongoDB Atlas (cloud)
# Update MONGODB_URI in .env with Atlas connection string
```

### 4. Update server.js

Replace or update your `server/server.js` with the secure version:

```javascript
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import helmet from "helmet"; // Add this dependency

// Import middlewares
import { errorHandler, notFoundHandler, handleUncaughtException } from "./middleware/errorMiddleware.js";
import { generalLimiter } from "./middleware/rateLimitMiddleware.js";
import { sanitizeBody, sanitizeQuery } from "./middleware/validationMiddleware.js";

// Import routes
import authRoutes from "./routes/auth.secure.js";
import userRoutes from "./routes/users.js";
import doctorRoutes from "./routes/doctors.js";
import patientRoutes from "./routes/patients.js";

// Handle uncaught exceptions
handleUncaughtException();

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Security middlewares
app.use(helmet()); // Security headers
app.use(cors({
  origin: process.env.CORS_ORIGIN || "http://localhost:5173",
  credentials: true,
  optionsSuccessStatus: 200,
}));

// Body parsing
app.use(express.json({ limit: "10kb" })); // Limit body size
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(cookieParser());

// Sanitization
app.use(sanitizeBody);
app.use(sanitizeQuery);

// Rate limiting
app.use("/api/", generalLimiter);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/patients", patientRoutes);

// Health check
app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is running",
    timestamp: new Date().toISOString(),
  });
});

// 404 handler
app.use(notFoundHandler);

// Global error handler (must be last)
app.use(errorHandler);

// Database connection
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("✅ Connected to MongoDB");
    
    // Start server
    const server = app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`🔒 Environment: ${process.env.NODE_ENV}`);
    });

    // Handle unhandled rejections
    process.on("unhandledRejection", (err) => {
      console.error("UNHANDLED REJECTION! 💥 Shutting down...");
      console.error(err);
      server.close(() => {
        process.exit(1);
      });
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  });

export default app;
```

### 5. Start the Server

Development mode:
```bash
npm run dev
```

Production mode:
```bash
npm start
```

## 🧪 Testing the API

### Register a new user

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "SecurePass123!",
    "role": "patient"
  }'
```

### Login

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "SecurePass123!"
  }' \
  -c cookies.txt
```

### Access Protected Route

```bash
curl -X GET http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

### Refresh Token

```bash
curl -X POST http://localhost:5000/api/auth/refresh \
  -b cookies.txt \
  -c cookies.txt
```

### Logout

```bash
curl -X POST http://localhost:5000/api/auth/logout \
  -b cookies.txt
```

## 📊 Database Indexes

The system automatically creates indexes on:
- `users.email` (unique)
- `users.role`
- `users.isActive`
- `refreshTokens.userId`
- `refreshTokens.expiresAt` (TTL index)
- `auditLogs.userId`
- `auditLogs.timestamp` (TTL index - 7 years)

## 🔐 Security Checklist

- [x] Passwords hashed with bcrypt (12 rounds)
- [x] JWT tokens with short expiry (15 min)
- [x] Refresh token rotation
- [x] HttpOnly cookies for refresh tokens
- [x] Rate limiting on all endpoints
- [x] Brute force protection
- [x] Account locking after failed attempts
- [x] Input validation and sanitization
- [x] Role-based access control
- [x] Audit logging (HIPAA compliance)
- [x] CORS protection
- [x] XSS protection
- [x] CSRF protection

## 🚨 Important Notes

1. **Never commit `.env` file** - Add it to `.gitignore`
2. **Use strong secrets** - Generate with `openssl rand -base64 32`
3. **Enable HTTPS in production** - Set `COOKIE_SECURE=true`
4. **Monitor audit logs** - Check for suspicious activity
5. **Backup database regularly** - Healthcare data is critical
6. **Keep dependencies updated** - Run `npm audit` regularly

## 📝 Next Steps

1. Implement password reset functionality
2. Add email verification
3. Set up 2FA (Two-Factor Authentication)
4. Implement session management UI
5. Add password history (prevent reuse)
6. Set up automated backups
7. Implement rate limiting with Redis (for distributed systems)
8. Add comprehensive logging (Winston/Morgan)
9. Set up monitoring (Prometheus/Grafana)
10. Implement HIPAA compliance audit reports
