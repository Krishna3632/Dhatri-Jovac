# JWT Authentication - Quick Reference

## 🚀 Quick Start

```bash
# Install dependencies
cd server && npm install

# Setup environment
cp .env.example .env
# Edit .env with your settings

# Start server
npm run dev
```

## 📝 API Endpoints Cheat Sheet

| Endpoint | Method | Auth | Description |
|----------|--------|------|-------------|
| `/api/auth/register` | POST | ❌ | Create account |
| `/api/auth/login` | POST | ❌ | Login |
| `/api/auth/refresh` | POST | 🔵 Cookie | Get new access token |
| `/api/auth/logout` | POST | ❌ | Logout current device |
| `/api/auth/logout-all` | POST | ✅ | Logout all devices |
| `/api/auth/me` | GET | ✅ | Get current user |

**Legend:**
- ❌ = No auth required
- ✅ = Bearer token required
- 🔵 = Cookie required

## 🔑 Token Flow

```
Registration/Login
    ↓
Generate Access Token (15min) + Refresh Token (7d)
    ↓
Store Refresh Token in DB (hashed) + httpOnly Cookie
    ↓
Return Access Token to client
    ↓
Client stores in memory (NOT localStorage!)
    ↓
Include in API requests: Authorization: Bearer <token>
    ↓
Token expires? → POST /api/auth/refresh
    ↓
Old refresh token revoked, new ones issued
```

## 💻 Frontend Integration

### React Context Setup

```javascript
// AuthContext.jsx
import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Auto-refresh token every 14 minutes
  useEffect(() => {
    const refreshInterval = setInterval(async () => {
      if (accessToken) {
        try {
          const response = await fetch('/api/auth/refresh', {
            method: 'POST',
            credentials: 'include',
          });
          const data = await response.json();
          if (data.success) {
            setAccessToken(data.data.accessToken);
          }
        } catch (error) {
          console.error('Token refresh failed:', error);
          logout();
        }
      }
    }, 14 * 60 * 1000);

    return () => clearInterval(refreshInterval);
  }, [accessToken]);

  // Check if user is logged in on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/me', {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          },
          credentials: 'include',
        });
        
        if (response.ok) {
          const data = await response.json();
          setUser(data.data.user);
        }
      } catch (error) {
        console.error('Auth check failed:', error);
      } finally {
        setLoading(false);
      }
    };

    if (accessToken) {
      checkAuth();
    } else {
      setLoading(false);
    }
  }, [accessToken]);

  const login = async (email, password) => {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    
    if (!data.success) {
      throw new Error(data.message);
    }

    setAccessToken(data.data.accessToken);
    setUser(data.data.user);
    return data;
  };

  const register = async (userData) => {
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(userData),
    });

    const data = await response.json();
    
    if (!data.success) {
      throw new Error(data.message);
    }

    setAccessToken(data.data.accessToken);
    setUser(data.data.user);
    return data;
  };

  const logout = async () => {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setAccessToken(null);
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, accessToken, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
```

### Protected Route Component

```javascript
// ProtectedRoute.jsx
import { Navigate } from 'react-router-dom';
import { useAuth } from './useAuth';

export const ProtectedRoute = ({ children, requiredRole }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
};
```

### Custom Hook

```javascript
// useAuth.js
import { useContext } from 'react';
import { AuthContext } from './AuthContext';

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
```

### API Request Helper

```javascript
// api.js
export const apiRequest = async (url, options = {}) => {
  const { accessToken } = useAuth();

  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
      ...options.headers,
    },
    credentials: 'include',
  });

  // Handle token expiration
  if (response.status === 401) {
    // Try to refresh token
    const refreshResponse = await fetch('/api/auth/refresh', {
      method: 'POST',
      credentials: 'include',
    });

    if (refreshResponse.ok) {
      const data = await refreshResponse.json();
      // Update token and retry request
      // ... retry logic
    } else {
      // Redirect to login
      window.location.href = '/login';
    }
  }

  return response;
};
```

## 🔒 Security Checklist

- [ ] Use HTTPS in production
- [ ] Set `COOKIE_SECURE=true` in production
- [ ] Generate strong JWT secrets (32+ bytes)
- [ ] Never store tokens in localStorage
- [ ] Implement automatic token refresh
- [ ] Add rate limiting to all endpoints
- [ ] Validate all user inputs
- [ ] Hash passwords with bcrypt (12+ rounds)
- [ ] Implement account lockout after failed attempts
- [ ] Log all authentication events
- [ ] Regular security audits
- [ ] Keep dependencies updated

## 🐛 Common Issues

### "CORS Error"
```bash
# Check .env
CORS_ORIGIN=http://localhost:5173

# Check credentials in fetch
credentials: 'include'
```

### "Token Expired"
```javascript
// Implement auto-refresh (see AuthContext above)
// Refresh every 14 minutes (before 15min expiry)
```

### "Account Locked"
```javascript
// Wait 30 minutes or
// Admin can manually unlock in database:
db.users.updateOne(
  { email: "user@example.com" },
  { $set: { failedLoginAttempts: 0 }, $unset: { lockUntil: 1 } }
)
```

### "Rate Limit Exceeded"
```bash
# Wait for rate limit window to reset
# Or increase limits in security.config.js (not recommended)
```

## 📊 Useful MongoDB Queries

```javascript
// Find all active users
db.users.find({ isActive: true })

// Find locked accounts
db.users.find({ lockUntil: { $gt: new Date() } })

// Find users by role
db.users.find({ role: "doctor" })

// Get all refresh tokens for a user
db.refreshtokens.find({ userId: ObjectId("...") })

// Revoke all tokens for a user
db.refreshtokens.updateMany(
  { userId: ObjectId("...") },
  { $set: { isRevoked: true } }
)

// Get recent audit logs
db.auditlogs.find().sort({ timestamp: -1 }).limit(50)

// Find failed login attempts
db.auditlogs.find({ 
  action: "FAILED_LOGIN",
  timestamp: { $gte: new Date(Date.now() - 24*60*60*1000) }
})
```

## 🎯 Role-Based Access Examples

```javascript
// routes/patients.js
import { authMiddleware } from '../middleware/authMiddleware.js';
import { authorize } from '../middleware/roleMiddleware.js';

// Only doctors and admins can view all patients
router.get('/', authMiddleware, authorize('doctor', 'admin'), getAllPatients);

// Patients can only view their own profile
router.get('/:id', authMiddleware, checkOwnership('id'), getPatient);

// Only admins can delete patients
router.delete('/:id', authMiddleware, authorize('admin'), deletePatient);
```

## 📱 Postman Collection

```json
{
  "info": {
    "name": "Healthcare Auth API",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Register",
      "request": {
        "method": "POST",
        "url": "{{baseUrl}}/api/auth/register",
        "body": {
          "mode": "raw",
          "raw": "{\"name\":\"John Doe\",\"email\":\"john@example.com\",\"password\":\"SecurePass123!\",\"role\":\"patient\"}"
        }
      }
    },
    {
      "name": "Login",
      "request": {
        "method": "POST",
        "url": "{{baseUrl}}/api/auth/login",
        "body": {
          "mode": "raw",
          "raw": "{\"email\":\"john@example.com\",\"password\":\"SecurePass123!\"}"
        }
      }
    },
    {
      "name": "Get Current User",
      "request": {
        "method": "GET",
        "url": "{{baseUrl}}/api/auth/me",
        "header": [
          {
            "key": "Authorization",
            "value": "Bearer {{accessToken}}"
          }
        ]
      }
    }
  ]
}
```

## 🔗 Resources

- [JWT.io](https://jwt.io/) - JWT debugger
- [OWASP Authentication Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html)
- [HIPAA Security Rule](https://www.hhs.gov/hipaa/for-professionals/security/index.html)
- [Express Security Best Practices](https://expressjs.com/en/advanced/best-practice-security.html)

---

**Need help?** Check `AUTH_DOCUMENTATION.md` for detailed information.
