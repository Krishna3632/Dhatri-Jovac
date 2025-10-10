import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./components/Pages/LandingPage";
import Dashboard from "./components/Pages/Dashboard";
import Login from "./components/Auth/Login";
import SignupPage from "./components/Auth/SignUp";
import NotFound from "./components/Pages/NotFound";
import AppointmentsPage from "./components/Pages/Appointment";
import DoctorsPage from "./components/Pages/Doctors";
import Patient from "./components/Pages/Patient";
import DoctorProfilePage from "./components/roles/doctor/Pages/DoctorProfile";
import UserProfile from "./components/roles/doctor/Pages/PatientProfile";
// import { AuthProvider } from "./context/AuthContext";
// import ProtectedRoute from "./components/ProtectedRoutes";
import Log from "./components/Auth/Log";
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
                        {/* <Route
          path="/patient"
          element={<Patient/>}
        /> */}
        <Route
          path="/log"
          Component={Log}
        />
        <Route
          path="/login"
          Component={Login}
        />
        <Route
          path="/signup"
          Component={SignupPage}
        />

        {/* Logged-in users see dashboard */}
        <Route
          path="/dashboard"
          Component={<Dashboard />}
        />

        {/* Login page
        <Route
          path="/login"
          element={!isLoggedIn ? <DhatriLogin /> : <Navigate to="/dashboard" />}
        /> */}

        <Route
        path="/notfound"
        element={<NotFound/>}
        />
        <Route path="/appointments" Component={AppointmentsPage} />
        <Route path="/doctor/profile"
           Component={DoctorProfilePage}
        />
        <Route path="/patient" Component={Patient} />
        <Route path="/patient/profile/:id" Component={UserProfile} />
     </Routes>
    </Router>
    // </AuthProvider>
  );
}

export default App;
