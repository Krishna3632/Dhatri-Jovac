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
    // <AuthProvider>
    <Router>
      <Routes>
        {/* Non-logged-in users see landing page */}
        <Route
          path="/"
          Component={LandingPage}
        />
                <Route
          path="/doctors"
          Component={DoctorsPage}
        />
        <Route
          path="/patients"
          Component={Patient}
        />
        <Route
          path="/login"
          Component={Login}
        />
    
        <Route
          path="/signup"
          Component={SignupPage}
        />
        {/* Doctors Routes  */}

        <Route
          path="/doctors/dashboard"
          Component={Dashboard}
        />

        {/* Logged-in users see dashboard */}
        <Route
          path="/dashboard"
          Component={<Dashboard />}
        />



        <Route
        path="/notfound"
        element={<NotFound/>}
        />
        <Route path="/appointments" Component={AppointmentsPage} />
        <Route path="/doctor/profile"
           Component={DoctorProfilePage}
        />
        {/* <Route path="/patient" Component={Patient} /> */}
        <Route path="/patients/profile/:id" Component={UserProfile} />
     </Routes>
    </Router>
    // </AuthProvider>
  );
}

export default App;
