require('dotenv').config();

module.exports = {
  // JWT Secrets
  accessTokenSecret: process.env.JWT_ACCESS_SECRET,
  refreshTokenSecret: process.env.JWT_REFRESH_SECRET,

  // Token Expiry
  accessTokenExpiry: process.env.JWT_ACCESS_EXPIRY || '15m',
  refreshTokenExpiry: process.env.JWT_REFRESH_EXPIRY || '7d',

  // Token Options
  accessTokenOptions: {
    expiresIn: process.env.JWT_ACCESS_EXPIRY || '15m',
    issuer: 'healthcare-platform',
    audience: 'healthcare-api',
  },

  refreshTokenOptions: {
    expiresIn: process.env.JWT_REFRESH_EXPIRY || '7d',
    issuer: 'healthcare-platform',
    audience: 'healthcare-api',
  },

  // Cookie Options for Refresh Token
  cookieOptions: {
    httpOnly: true, // Prevents XSS attacks
    secure: process.env.NODE_ENV === 'production', // HTTPS only in production
    sameSite: 'strict', // CSRF protection
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
    path: '/api/auth', // Restrict cookie to auth endpoints only
  },
};
