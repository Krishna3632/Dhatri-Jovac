import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./components/Pages/LandingPage";
import Dashboard from "./components/Pages/Dashboard";
import Login from "./components/Auth/Login";
import SignupPage from "./components/Auth/SignUp";
import NotFound from "./components/Pages/NotFound";
import AppointmentsPage from "./components/Pages/Appointment";

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

        <Route
          path="/login"
          element={<Login/>}
        />
        <Route
          path="/signup"
          element={<SignupPage/>}
        />

        {/* Logged-in users see dashboard */}
        {/* <Route
          path="/dashboard"
          element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />}
        /> */}

        {/* Login page
        <Route
          path="/login"
          element={!isLoggedIn ? <DhatriLogin /> : <Navigate to="/dashboard" />}
        /> */}

        <Route
        path="/notfound"
        element={<NotFound/>}
        />
        <Route path="/appointments" element={<AppointmentsPage />} />
     </Routes>
    </Router>
  );
}

export default App;
