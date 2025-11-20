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
import PatientHome from "./components/roles/patient/Pages/PatientHome";
import UserLayout from "./components/roles/patient/layouts/UserLayout";
// import Home from "./components/roles/admin/Pages/Home";
import Home from "./components/roles/admin/Home";
import AdminDashboard from "./components/roles/admin/Home";
import AdminLayout from "./components/roles/admin/layouts/AdminLayout";
import PatientsPage from "./components/roles/admin/pages/PatientsPage";
import AppointmentsPage from "./components/roles/admin/pages/AppointmentsPage";
import RecordsPage from "./components/roles/admin/pages/RecordsPage";
import DashboardPage from "./components/roles/admin/pages/DashboardPage";
import ProfilePage from "./components/roles/admin/pages/ProfilePage";
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
  
    {
        path: "/doctor",
        element: (
            <ProtectedRoute allowedRoles={["doctor"]}>
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
                element: <PatientHome />,
            },
            {
                path: "profile",
                element: <Profile />,
            }
        ]
    },
    {
        path: "/admin",
        element: (
            <ProtectedRoute allowedRoles={["admin"]}>
                <AdminLayout />
            </ProtectedRoute>
        ),
        children: [
            {
                path: "",
                element: <Navigate to="/admin/dashboard" replace />,
            },
            {
                path: "dashboard",
                element: <DashboardPage />,
            },
            {
                path: "patients",
                element: <PatientsPage />,
            },
            {
                path: "appointments",
                element: <AppointmentsPage />,
            },
            {
                path: "records",
                element: <RecordsPage />,
            },
            {
                path: "reports",
                element: <Home />,
            },
            {
                path: "profile",
                element: <ProfilePage />,
            },
            {
                path: "settings",
                element: <Home />,
            },
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
