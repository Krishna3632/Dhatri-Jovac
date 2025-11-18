import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "./components/Auth/Login";
import SignupPage from "./components/Auth/SignUp";
import ProtectedRoute from "./components/Auth/ProtectedRoute";
import HomePage from "./components/roles/doctor/Pages/HomePage";
import StatisticsPage from "./components/roles/doctor/Pages/StatisticsPage";
import AppLayout from "./components/roles/doctor/layouts/dashboard/AppLayout";
import UsersPage from "./components/roles/doctor/Pages/PatientsPage";
import UserProfile from "./components/roles/doctor/Pages/PatientProfile";
import Profile from "./components/roles/patient/Pages/Profile";
import UserBar from "./components/UI/UserBar";
import UserLayout from "./components/roles/patient/layouts/UserLayout";
import Text from "./components/roles/patient/layouts/Text";
// import Diagram from "./components/Mermaid";
import LinearRegressionFromScratch from "./components/UI/LinearRegression";
const MainRoutes = createBrowserRouter([
    {
        path: "/",
        element: <Navigate to="/login" replace />,
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/signup",
        element: <SignupPage />,
    },
    // Legacy auth routes for backward compatibility
    {
        path: "/auth",
        children: [
            {
                path: "login",
                element: <Navigate to="/login" replace />,
            },
            {
                path: "signup",
                element: <Navigate to="/signup" replace />,
            }
        ]
    },
    {
        path: "/doctor",
        element: (
            <ProtectedRoute allowedRoles={["doctor", "admin"]}>
                <AppLayout />
            </ProtectedRoute>
        ),
        children: [
            {
                path: "",
                element: <Navigate to="/doctor/home" replace />,
            },
            {
                path: "home",
                element: <HomePage />,
            },
            {
                path: "stats",
                element: <StatisticsPage />,
            },
            {
                path: "users",
                element: <UsersPage />,
            },
            {
                path: "users/:id",
                element: <UserProfile />,
            }
        ]
    },
    {
        path: "/patient",
        element: (
            <ProtectedRoute allowedRoles={["patient"]}>
                <UserLayout />
            </ProtectedRoute>
        ),
        children: [
            {
                path: "",
                element: <Navigate to="/patient/home" replace />,
            },
            {
                path: "home",
                element: <UserLayout children={Text} />,
            },
            {
                path: "profile",
                element: <Profile />,
            }
        ]
    },
    // Legacy patient routes for backward compatibility
    {
        path: "/patients",
        children: [
            {
                path: "home",
                element: <Navigate to="/patient/home" replace />,
            },
        ],
    },
  
    {
        path: "*",
        element: <Navigate to="/login" replace />,
    }
]);

export default MainRoutes;
