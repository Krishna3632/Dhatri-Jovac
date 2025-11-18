import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";

const AuthContext = createContext();

const API_BASE_URL = "http://localhost:5000/api";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Logout user
  const logout = useCallback(async () => {
    try {
      await fetch(`${API_BASE_URL}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setAccessToken(null);
      setUser(null);
      toast.info("Logged out successfully");
    }
  }, []);

  // Fetch current user details
  const fetchCurrentUser = useCallback(async (token) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/me`, {
        headers: {
          Authorization: `Bearer ${token || accessToken}`,
        },
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.data.user);
      } else {
        setUser(null);
        setAccessToken(null);
      }
    } catch (error) {
      console.error("Failed to fetch user:", error);
      setUser(null);
      setAccessToken(null);
    }
  }, [accessToken]);

  // Refresh access token
  const refreshAccessToken = useCallback(async () => {
    if (refreshing) return;

    setRefreshing(true);
    try {
      const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        setAccessToken(data.data.accessToken);
        return data.data.accessToken;
      } else {
        // Refresh token expired, logout
        await logout();
        return null;
      }
    } catch (error) {
      console.error("Token refresh failed:", error);
      await logout();
      return null;
    } finally {
      setRefreshing(false);
    }
  }, [refreshing, logout]);

  // Auto-refresh token every 14 minutes (before 15min expiry)
  useEffect(() => {
    let refreshInterval;

    if (accessToken && !refreshing) {
      refreshInterval = setInterval(async () => {
        await refreshAccessToken();
      }, 14 * 60 * 1000); // 14 minutes
    }

    return () => {
      if (refreshInterval) clearInterval(refreshInterval);
    };
  }, [accessToken, refreshing, refreshAccessToken]);

  // Check authentication on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Try to refresh token to get access token
        const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
          method: "POST",
          credentials: "include",
        });

        if (response.ok) {
          const data = await response.json();
          setAccessToken(data.data.accessToken);
          await fetchCurrentUser(data.data.accessToken);
        }
      } catch (error) {
        console.error("Auth check failed:", error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [fetchCurrentUser]);

  // Register new user
  const register = async (userData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message || "Registration failed");
      }

      setAccessToken(data.data.accessToken);
      setUser(data.data.user);
      toast.success("Registration successful!");
      return data;
    } catch (error) {
      toast.error(error.message || "Registration failed");
      throw error;
    }
  };

  // Login user
  const login = async (email, password) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message || "Login failed");
      }

      setAccessToken(data.data.accessToken);
      setUser(data.data.user);
      toast.success("Login successful!");
      return data;
    } catch (error) {
      toast.error(error.message || "Login failed");
      throw error;
    }
  };

  // Logout from all devices
  const logoutAllDevices = async () => {
    try {
      await fetch(`${API_BASE_URL}/auth/logout-all`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        credentials: "include",
      });

      setAccessToken(null);
      setUser(null);
      toast.info("Logged out from all devices");
    } catch (error) {
      console.error("Logout all devices error:", error);
      toast.error("Failed to logout from all devices");
    }
  };

  // API request helper with automatic token refresh
  const apiRequest = useCallback(
    async (url, options = {}) => {
      const makeRequest = async (token) => {
        const response = await fetch(`${API_BASE_URL}${url}`, {
          ...options,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            ...options.headers,
          },
          credentials: "include",
        });

        return response;
      };

      try {
        let response = await makeRequest(accessToken);

        // If token expired, try to refresh and retry
        if (response.status === 401) {
          const newToken = await refreshAccessToken();
          if (newToken) {
            response = await makeRequest(newToken);
          } else {
            throw new Error("Authentication failed");
          }
        }

        return response;
      } catch (error) {
        console.error("API request failed:", error);
        throw error;
      }
    },
    [accessToken, refreshAccessToken]
  );

  const value = {
    user,
    accessToken,
    loading,
    login,
    register,
    logout,
    logoutAllDevices,
    refreshAccessToken,
    apiRequest,
    isAuthenticated: !!user && !!accessToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
