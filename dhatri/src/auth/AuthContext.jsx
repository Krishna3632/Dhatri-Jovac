import React, { createContext, useState, useContext, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

// This is a FAKE API call. In a real app, you'd fetch from your backend.
const fakeApiLogin = async (email, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email === 'doctor@clinic.com' && password === 'password123') {
        resolve({
          user: { name: 'Dr. Evelyn Reed', email: 'doctor@clinic.com', role: 'doctor' },
          token: 'fake-jwt-token-for-demonstration',
        });
      } else {
        reject(new Error('Invalid email or password'));
      }
    }, 1000);
  });
};

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const navigate = useNavigate();

  const login = async (email, password) => {
    try {
      const { user, token } = await fakeApiLogin(email, password);
      setUser(user);
      setToken(token);
      localStorage.setItem('token', token); // Persist token
      navigate('/doctor'); // Redirect to the main app page
    } catch (error) {
      console.error('Login failed:', error);
      throw error; // Re-throw to be caught by the login form
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    navigate('/login');
  };

  // Memoize the value to prevent unnecessary re-renders
  const value = useMemo(
    () => ({
      user,
      token,
      isAuthenticated: !!token,
      login,
      logout,
    }),
    [user, token]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Custom hook to easily access the context
export const useAuth = () => {
  return useContext(AuthContext);
};