import { createBrowserRouter } from "react-router-dom";
import Login from "./components/Auth/Login";
import SignupPage from "./components/Auth/SignUp";
import HomePage from "./components/roles/doctor/Pages/HomePage";
import StatisticsPage from "./components/roles/doctor/Pages/StatisticsPage";
import AppLayout from "./components/roles/doctor/layouts/dashboard/AppLayout";
import UsersPage from "./components/roles/doctor/Pages/PatientsPage";
import UserProfile from "./components/roles/doctor/Pages/PatientProfile";
import Profile from "./components/roles/patient/Pages/Profile";
import UserBar from "./components/UI/UserBar";
import UserLayout from "./components/roles/patient/layouts/UserLayout";
import Text from "./components/roles/patient/layouts/Text";
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
    // {
    //     path: "*",
    //     Navigate: "/auth/login",
    // },
 {
    path: "/patients",
    // ✅ Wrap all patient pages with UserLayout
    children: [
      {
        path: "home",
        element: <UserLayout children={<Text />} />, // ⚠️ Not needed unless you want nested layout repetition
      },
    ],
  },
]);

export default MainRoutes;
