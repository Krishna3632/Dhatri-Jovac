# Healthcare JWT Authentication System - Complete Documentation

## 📚 Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Security Features](#security-features)
3. [API Endpoints](#api-endpoints)
4. [Authentication Flow](#authentication-flow)
5. [Error Codes](#error-codes)
6. [Best Practices](#best-practices)
7. [Common Pitfalls](#common-pitfalls)
8. [HIPAA Compliance](#hipaa-compliance)

---

## 🏗️ Architecture Overview

### Components

```
┌─────────────────────────────────────────────────────────┐
│                      Client Application                  │
│          (Stores Access Token in Memory)                 │
└────────────────────┬────────────────────────────────────┘
                     │
                     │ HTTPS (TLS 1.2+)
                     │
┌────────────────────▼────────────────────────────────────┐
│                    API Gateway / NGINX                    │
│            (Rate Limiting, SSL Termination)              │
└────────────────────┬────────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────────┐
│                  Express Server                          │
│  ┌──────────────────────────────────────────────────┐  │
│  │  Security Middleware Layer                       │  │
│  │  - Helmet (Security Headers)                     │  │
│  │  - CORS Protection                               │  │
│  │  - Rate Limiting                                 │  │
│  │  - Input Sanitization                            │  │
│  └────────────────┬─────────────────────────────────┘  │
│                   │                                      │
│  ┌────────────────▼─────────────────────────────────┐  │
│  │  Authentication Middleware                       │  │
│  │  - JWT Verification                              │  │
│  │  - User Validation                               │  │
│  │  - Role Check                                    │  │
│  └────────────────┬─────────────────────────────────┘  │
│                   │                                      │
│  ┌────────────────▼─────────────────────────────────┐  │
│  │  Business Logic Layer                            │  │
│  │  - Controllers                                   │  │
│  │  - Services                                      │  │
│  │  - Validation                                    │  │
│  └────────────────┬─────────────────────────────────┘  │
└───────────────────┼──────────────────────────────────────┘
                    │
┌───────────────────▼──────────────────────────────────────┐
│                   MongoDB Database                        │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │    Users     │  │RefreshTokens │  │  AuditLogs   │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
└───────────────────────────────────────────────────────────┘
```

### Token Flow

#### Access Token (Short-lived)
- **Lifespan**: 15 minutes
- **Storage**: Client memory (React state/context)
- **Transmission**: Authorization header (`Bearer <token>`)
- **Contains**: userId, email, role, type
- **Purpose**: API authentication

#### Refresh Token (Long-lived)
- **Lifespan**: 7 days
- **Storage**: HttpOnly cookie (cannot be accessed by JavaScript)
- **Transmission**: Automatic with cookie
- **Contains**: userId, tokenId (for rotation), type
- **Purpose**: Refresh access tokens

---

## 🔐 Security Features

### 1. Password Security
- **Hashing Algorithm**: bcrypt with 12 rounds
- **Minimum Requirements**:
  - 8+ characters
  - 1 uppercase letter
  - 1 lowercase letter
  - 1 number
  - 1 special character
- **Password Change Detection**: Invalidates tokens on password change

### 2. Token Security
- **Access Token**: Short expiry (15 min) prevents long-term exposure
- **Refresh Token**: 
  - Hashed before storage in database
  - Rotation on each use (old token invalidated)
  - Revocation support (logout, logout all devices)
  - HttpOnly cookie (XSS protection)
  - SameSite=strict (CSRF protection)

### 3. Brute Force Protection
- **Account Locking**: 5 failed attempts → 30-minute lock
- **Rate Limiting**:
  - Registration: 3/hour per IP
  - Login: 5/15min per IP
  - Token Refresh: 20/15min per IP
  - General API: 100/15min per IP

### 4. Input Validation & Sanitization
- **Email**: Regex validation + lowercase normalization
- **XSS Prevention**: Strip HTML tags and dangerous characters
- **SQL Injection**: MongoDB (NoSQL) + parameterized queries
- **ObjectId Validation**: Check format before database queries

### 5. Role-Based Access Control (RBAC)
```javascript
// Three roles
- patient: Access own medical records
- doctor: Access assigned patients' records
- admin: Full system access

// Middleware usage
router.get('/patients', authMiddleware, authorize('doctor', 'admin'), getPatients);
```

### 6. Audit Logging (HIPAA Compliance)
- **Logged Events**:
  - All authentication attempts (success/failure)
  - Data access (who accessed what, when)
  - Data modifications
  - Unauthorized access attempts
- **Retention**: 7 years (automatic deletion via TTL index)
- **Immutable**: Cannot be modified after creation

---

## 🌐 API Endpoints

### Authentication Endpoints

#### 1. Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123!",
  "role": "patient",
  "phone": "1234567890"
}

Response 201:
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": "507f1f77bcf86cd799439011",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "patient"
    },
    "accessToken": "eyJhbGciOiJIUzI1NiIs...",
    "expiresIn": "15m"
  }
}

Errors:
- 400: Validation error
- 409: User already exists
- 429: Rate limit exceeded
```

#### 2. Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "SecurePass123!"
}

Response 200:
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "507f1f77bcf86cd799439011",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "patient"
    },
    "accessToken": "eyJhbGciOiJIUzI1NiIs...",
    "expiresIn": "15m"
  }
}

Errors:
- 401: Invalid credentials
- 403: Account locked or deactivated
- 429: Rate limit exceeded
```

#### 3. Refresh Access Token
```http
POST /api/auth/refresh
Cookie: refreshToken=<token>

Response 200:
{
  "success": true,
  "message": "Token refreshed successfully",
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIs...",
    "expiresIn": "15m"
  }
}

Errors:
- 401: Invalid or expired refresh token
- 429: Rate limit exceeded
```

#### 4. Logout
```http
POST /api/auth/logout
Cookie: refreshToken=<token>

Response 200:
{
  "success": true,
  "message": "Logout successful"
}
```

#### 5. Logout All Devices
```http
POST /api/auth/logout-all
Authorization: Bearer <access_token>

Response 200:
{
  "success": true,
  "message": "Logged out from all devices successfully"
}

Errors:
- 401: Not authenticated
```

#### 6. Get Current User
```http
GET /api/auth/me
Authorization: Bearer <access_token>

Response 200:
{
  "success": true,
  "data": {
    "user": {
      "id": "507f1f77bcf86cd799439011",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "patient",
      "phone": "1234567890",
      "isActive": true,
      "isEmailVerified": false,
      "lastLogin": "2025-11-18T10:30:00.000Z",
      "createdAt": "2025-11-01T08:00:00.000Z"
    }
  }
}

Errors:
- 401: Not authenticated or token expired
```

### Protected Route Example

```http
GET /api/patients/:id
Authorization: Bearer <access_token>

# Requires:
# - Valid access token
# - User role: doctor or admin
# - OR user is accessing their own record
```

---

## 🔄 Authentication Flow

### Registration Flow
```
1. Client submits registration form
   ↓
2. Validation middleware checks input
   ↓
3. Check if user already exists
   ↓
4. Hash password with bcrypt (12 rounds)
   ↓
5. Create user in database
   ↓
6. Generate access token (15 min)
   ↓
7. Generate refresh token (7 days)
   ↓
8. Store hashed refresh token in database
   ↓
9. Set refresh token as httpOnly cookie
   ↓
10. Log event to audit log
   ↓
11. Return access token + user data to client
```

### Login Flow
```
1. Client submits email + password
   ↓
2. Find user by email
   ↓
3. Check if account is active
   ↓
4. Check if account is locked
   ↓
5. Compare password with bcrypt
   ├─ FAIL → Increment failed attempts
   │         └─ Lock account if >= 5 attempts
   └─ SUCCESS ↓
6. Reset failed login attempts
   ↓
7. Generate new access + refresh tokens
   ↓
8. Store hashed refresh token in DB
   ↓
9. Set refresh token as httpOnly cookie
   ↓
10. Log successful login to audit log
   ↓
11. Return access token + user data
```

### Token Refresh Flow
```
1. Client sends refresh token (via cookie)
   ↓
2. Verify refresh token signature
   ↓
3. Find token in database
   ├─ NOT FOUND → Return error
   ├─ EXPIRED → Return error
   └─ REVOKED → Return error
   ↓
4. Compare token with stored hash
   ↓
5. Find user by userId
   ↓
6. Generate NEW access token
   ↓
7. Generate NEW refresh token
   ↓
8. REVOKE old refresh token (rotation)
   ↓
9. Store new hashed refresh token
   ↓
10. Set new refresh token as cookie
   ↓
11. Log token refresh event
   ↓
12. Return new access token
```

### API Request Flow
```
1. Client sends request with Authorization header
   ↓
2. Extract Bearer token
   ↓
3. Verify JWT signature
   ├─ INVALID → 401 Unauthorized
   └─ EXPIRED → 401 Token Expired
   ↓
4. Check token type (must be "access")
   ↓
5. Find user from token payload
   ├─ NOT FOUND → 401 User not found
   └─ INACTIVE → 403 Account deactivated
   ↓
6. Check if account is locked
   ↓
7. Check if password changed after token issued
   ↓
8. Check user role (if route requires specific role)
   ↓
9. Attach user to req.user
   ↓
10. Proceed to route handler
```

---

## ⚠️ Error Codes

| Code | HTTP Status | Description | Solution |
|------|-------------|-------------|----------|
| `NO_TOKEN` | 401 | No authentication token provided | Include `Authorization: Bearer <token>` header |
| `INVALID_TOKEN` | 401 | Token is invalid or malformed | Login again to get new token |
| `TOKEN_EXPIRED` | 401 | Access token has expired | Use refresh token to get new access token |
| `PASSWORD_CHANGED` | 401 | Password changed after token issued | Login again |
| `USER_NOT_FOUND` | 401 | User doesn't exist | Check user ID |
| `ACCOUNT_DEACTIVATED` | 403 | Account has been deactivated | Contact administrator |
| `ACCOUNT_LOCKED` | 403 | Too many failed login attempts | Wait 30 minutes or contact support |
| `INSUFFICIENT_PERMISSIONS` | 403 | User role doesn't have access | Check role requirements |
| `NOT_AUTHORIZED` | 403 | Trying to access another user's resource | Access only your own resources |
| `USER_EXISTS` | 409 | Email already registered | Use different email or login |
| `VALIDATION_ERROR` | 400 | Input validation failed | Check error details for specific fields |
| `INVALID_CREDENTIALS` | 401 | Email or password incorrect | Check credentials |
| `RATE_LIMIT_EXCEEDED` | 429 | Too many requests | Wait before retrying |
| `BRUTE_FORCE_DETECTED` | 429 | Suspicious login pattern detected | Wait or contact support |

---

## ✅ Best Practices

### Client-Side (Frontend)

#### 1. Token Storage
```javascript
// ✅ CORRECT: Store access token in memory
const [accessToken, setAccessToken] = useState(null);

// ❌ WRONG: Never store tokens in localStorage
localStorage.setItem('token', accessToken); // Vulnerable to XSS
```

#### 2. Token Refresh
```javascript
// ✅ CORRECT: Automatic token refresh
useEffect(() => {
  const refreshInterval = setInterval(async () => {
    try {
      const response = await fetch('/api/auth/refresh', {
        method: 'POST',
        credentials: 'include', // Send cookies
      });
      const data = await response.json();
      setAccessToken(data.data.accessToken);
    } catch (error) {
      // Redirect to login if refresh fails
      navigate('/login');
    }
  }, 14 * 60 * 1000); // Refresh every 14 minutes

  return () => clearInterval(refreshInterval);
}, []);
```

#### 3. API Requests
```javascript
// ✅ CORRECT: Include token in headers
const fetchData = async () => {
  const response = await fetch('/api/patients', {
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    credentials: 'include', // Include cookies
  });
  
  if (response.status === 401) {
    // Token expired, try refresh
    await refreshToken();
    // Retry request
  }
  
  return response.json();
};
```

#### 4. Logout
```javascript
// ✅ CORRECT: Clear token and call logout endpoint
const logout = async () => {
  try {
    await fetch('/api/auth/logout', {
      method: 'POST',
      credentials: 'include',
    });
  } finally {
    setAccessToken(null);
    navigate('/login');
  }
};
```

### Server-Side (Backend)

#### 1. Never Log Sensitive Data
```javascript
// ❌ WRONG
console.log('User password:', password);
console.log('Token:', token);

// ✅ CORRECT
console.log('Login attempt for user:', email);
console.log('Token generated for user ID:', userId);
```

#### 2. Use Environment Variables
```javascript
// ❌ WRONG
const secret = 'my-secret-key';

// ✅ CORRECT
const secret = process.env.JWT_ACCESS_SECRET;
if (!secret) {
  throw new Error('JWT_ACCESS_SECRET not configured');
}
```

#### 3. Validate All Inputs
```javascript
// ✅ CORRECT: Always validate before processing
router.post('/users', validateInput, async (req, res) => {
  // Process only after validation passes
});
```

#### 4. Use HTTPS in Production
```javascript
// ✅ CORRECT
const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production', // HTTPS only in prod
  sameSite: 'strict',
};
```

---

## 🚫 Common Pitfalls & Solutions

### Pitfall 1: Storing Tokens in localStorage
**Problem**: Vulnerable to XSS attacks  
**Solution**: Store access token in memory, refresh token in httpOnly cookie

### Pitfall 2: Long Access Token Expiry
**Problem**: Increases attack window if token is stolen  
**Solution**: Keep access token short (15 min), use refresh tokens

### Pitfall 3: No Token Rotation
**Problem**: Replay attacks if refresh token is stolen  
**Solution**: Rotate refresh token on each use

### Pitfall 4: Weak Password Requirements
**Problem**: Easy to brute force  
**Solution**: Enforce strong password policy (8+ chars, mixed case, numbers, special)

### Pitfall 5: No Rate Limiting
**Problem**: Brute force and DoS attacks  
**Solution**: Implement strict rate limiting on auth endpoints

### Pitfall 6: Logging Sensitive Data
**Problem**: Passwords/tokens in logs  
**Solution**: Never log sensitive data, only metadata

### Pitfall 7: No Audit Trail
**Problem**: Cannot track security incidents  
**Solution**: Log all authentication events and data access

### Pitfall 8: Storing Passwords in Plain Text
**Problem**: Database breach exposes all passwords  
**Solution**: Always hash with bcrypt (12+ rounds)

### Pitfall 9: Same Secret for Access & Refresh
**Problem**: Single point of failure  
**Solution**: Use different secrets for each token type

### Pitfall 10: No HTTPS
**Problem**: Man-in-the-middle attacks  
**Solution**: Always use HTTPS in production, redirect HTTP to HTTPS

---

## 🏥 HIPAA Compliance

### Requirements Met

#### 1. Access Control (§164.312(a)(1))
- ✅ Unique user identification
- ✅ Emergency access procedure (admin override)
- ✅ Automatic logoff (token expiry)
- ✅ Encryption and decryption (TLS/HTTPS)

#### 2. Audit Controls (§164.312(b))
- ✅ Comprehensive audit logging
- ✅ 7-year retention period
- ✅ Immutable logs
- ✅ Tracks who accessed what and when

#### 3. Integrity (§164.312(c)(1))
- ✅ Data validation
- ✅ Tamper detection (JWT signatures)
- ✅ Version control for changes

#### 4. Person/Entity Authentication (§164.312(d))
- ✅ Multi-factor authentication ready
- ✅ Strong password requirements
- ✅ Account lockout mechanisms

#### 5. Transmission Security (§164.312(e)(1))
- ✅ Encryption in transit (HTTPS/TLS)
- ✅ Integrity controls (JWT signatures)

### Audit Log Query Examples

```javascript
// Get all access to a specific patient's record
const patientAccess = await AuditLog.find({
  resourceType: 'PATIENT',
  resourceId: patientId,
  action: { $in: ['PROFILE_VIEW', 'DATA_ACCESS'] }
}).sort({ timestamp: -1 });

// Get all failed login attempts in last 24 hours
const failedLogins = await AuditLog.getFailedLogins(24 * 60 * 60 * 1000);

// Get user activity history
const userActivity = await AuditLog.getUserActivity(userId, 100);
```

---

## 📊 Monitoring & Maintenance

### Regular Tasks

#### Daily
- Monitor failed login attempts
- Check rate limit violations
- Review error logs

#### Weekly
- Audit user access patterns
- Review locked accounts
- Check token cleanup

#### Monthly
- Security audit
- Update dependencies (`npm audit`)
- Review audit logs
- Backup database

#### Quarterly
- Rotate JWT secrets
- Review RBAC policies
- Penetration testing
- HIPAA compliance audit

---

## 🔧 Troubleshooting

### Issue: "Token Expired" errors too frequently
**Solution**: Implement automatic token refresh on client

### Issue: Users getting locked out
**Solution**: Review rate limits, check for bot activity

### Issue: Slow authentication
**Solution**: Add database indexes, enable MongoDB connection pooling

### Issue: CORS errors
**Solution**: Check `CORS_ORIGIN` in .env matches frontend URL

### Issue: Cookies not being sent
**Solution**: Ensure `credentials: 'include'` in fetch requests

---

## 📞 Support

For issues or questions:
1. Check this documentation
2. Review error codes section
3. Check audit logs for details
4. Contact development team

---

**Last Updated**: November 18, 2025  
**Version**: 1.0.0  
**Author**: Senior Backend Architect
