import { createBrowserRouter, Navigate } from "react-router-dom";
// import AppLayout from "./components/layouts/AppLayout";
// // impor
// import AppLayout from "./components/layouts/AppLayout";
// import HomePage from "./components/Pages/HomePage";
// import PatientsPage from "./components/Pages/PatientsPage";
// import StatisticsPage from "./components/Pages/StatisticsPage";
// import UserLayout from "./components/layouts/UserLayout";
// import UserProfile from "./components/Pages/PatientProfile";
import HomePage from "./components/roles/doctor/Pages/HomePage";
import PatientsPage from "./components/roles/doctor/Pages/PatientsPage";
import StatisticsPage from "./components/roles/doctor/Pages/StatisticsPage";
import UserLayout from "./components/roles/doctor/layouts/dashboard/UserLayout";
import UserProfile from "./components/roles/doctor/Pages/PatientProfile";
import AppLayout from "./components/roles/doctor/layouts/dashboard/AppLayout";
const DoctorRoutes = createBrowserRouter([
  {
    path: "/doctor",
    element: <AppLayout />,
    children: [

      { path: "", element: <Navigate to="home" replace /> },

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
