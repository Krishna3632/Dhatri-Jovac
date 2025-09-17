import { createBrowserRouter, Navigate } from "react-router-dom";
// import Root from "../Root"; // ✨ 1. Import the new Root layout
import Root from "./Root";
// Auth & Pages
// import ProtectedRoute from "../auth/ProtectedRoute";
// import LoginPage from "../pages/LoginPage";
import ProtectedRoute from "./auth/ProtectedRoute";
// Doctor Routes
import LoginPage from "./pages/LoginPage";
// import AppLayout from "../components/roles/doctor/layouts/AppLayout";
// // ... other imports
import AppLayout from "./components/roles/doctor/layouts/AppLayout";
import HomePage from "./components/roles/doctor/Pages/HomePage";
import PatientsPage from "./components/roles/doctor/pages/PatientsPage";
import StatisticsPage from "./components/roles/doctor/Pages/StatisticsPage";
import UserLayout from "./components/roles/doctor/layouts/UserLayout";
import UserProfile from "./components/roles/doctor/Pages/PatientProfile";
import DoctorProfilePage from "./components/roles/doctor/Pages/DoctorProfile"; 
const routes = createBrowserRouter([
  // ✨ 2. Set the Root component as the main parent for all routes
  {
    path: "/",
    element: <Root />,
    children: [
      // All your previous routes now go inside this children array
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "doctor",
        element: <ProtectedRoute />,
        children: [
          {
            path: "",
            element: <AppLayout />,
            children: [
              { index: true, element: <Navigate to="home" replace /> },
              { path: "home", element: <HomePage />  },
              // ... other doctor child routes
               { path: "home", element: <HomePage /> },
      {
        path: "users",
        element: <UserLayout />,
        children: [
          { path: "", element: <PatientsPage /> },
          { path: ":id", element: <UserProfile /> },
        ],
      },
      { path: "stats", element: <StatisticsPage /> },
      // ✨ 2. Add the new route for the doctor's profile
      { path: "profile", element: <DoctorProfilePage /> },
            ],
          },
        ],
      },
      // Redirect from the root path "/" to the login page
      {
        index: true,
        element: <Navigate to="/login" replace />,
      },
    ],
  },
]);

export default routes;