import { createBrowserRouter } from "react-router-dom";
import Login from "./components/Auth/Login";
import SignupPage from "./components/Auth/SignUp";
import HomePage from "./components/roles/doctor/Pages/HomePage";
import StatisticsPage from "./components/roles/doctor/Pages/StatisticsPage";
import AppLayout from "./components/roles/doctor/layouts/dashboard/AppLayout";
import UsersPage from "./components/roles/doctor/Pages/PatientsPage";
import UserProfile from "./components/roles/doctor/Pages/PatientProfile";
const MainRoutes = createBrowserRouter([
    {
        path: "/auth",
        children: [
            {
                path: "login",
                Component: Login,
            },
            {
                path: "signup",
                Component: SignupPage,
            }
        ]
    },
    {
        path: "/doctor",
        Component: AppLayout,
        children: [
            {
                path: "",
                Navigate: "/doctor/home",
            },
            {
                path: "home",
                Component: HomePage,
            },
            {
                path: "stats",
                Component: StatisticsPage,
            },
            {
                path: "users",
                Component: UsersPage,
            },
            {
                path: "users/:id",
                Component: UserProfile,
            }
        ]
    },

]);

export default MainRoutes;
