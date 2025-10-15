import { createBrowserRouter, Navigate } from "react-router-dom";
import HomePage from "./components/roles/doctor/Pages/HomePage";
import PatientsPage from "./components/roles/doctor/Pages/PatientsPage";
import StatisticsPage from "./components/roles/doctor/Pages/StatisticsPage";
import UserLayout from "./components/roles/doctor/layouts/dashboard/UserLayout";
import UserProfile from "./components/roles/doctor/Pages/PatientProfile";
import AppLayout from "./components/roles/doctor/layouts/dashboard/AppLayout";
import Login from "./components/Auth/Login";
const DoctorRoutes = createBrowserRouter([
  {
    path:"/",
    children: [
      {
        path: "login",
        Component: Login
      }
    ]
  },
  {
    path: "/doctor",
    element: <AppLayout />,
    children: [

      { path: "", Component: <Navigate to="home" replace /> },

      {
        path: "home",
        Component: HomePage
      },
      {
        path: "users",
        element: <UserLayout />,
        children: [
          { path: "", Component: PatientsPage },
          { path: ":id", Component: UserProfile },
        ],
      },
      { path: "stats", Component: StatisticsPage},
    ],
  },
]);

export default DoctorRoutes;
