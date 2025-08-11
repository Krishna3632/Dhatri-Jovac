import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./components/Pages/LandingPage";
import Dashboard from "./components/Pages/Dashboard";
import Login from "./components/Auth/Login";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check if token exists in localStorage (dummy auth)
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <Router>
      <Routes>
        {/* Non-logged-in users see landing page */}
        <Route
          path="/"
          element={!isLoggedIn ? <LandingPage /> : <Navigate to="/dashboard" />}
        />

        {/* Logged-in users see dashboard */}
        <Route
          path="/dashboard"
          element={isLoggedIn ? <Dashboard /> : <Navigate to="/" />}
        />

        {/* Login page */}
        <Route
          path="/login"
          element={!isLoggedIn ? <Login /> : <Navigate to="/dashboard" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
