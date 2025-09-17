import { Outlet, useNavigate } from "react-router-dom";
import SideBar from "../SideBar";
import { Home, Users, BarChart2, UserCircle } from "lucide-react";

function AppLayout() {
  const navigate = useNavigate();

  const sidebarNavItems = [
    { id: "home", icon: <Home />, path: "home" },
    { id: "users", icon: <Users />, path: "users" },
    { id: "stats", icon: <BarChart2 />, path: "stats" },
  ];
  
  // ✨ The user profile item now points to the correct relative path
  const userNavItem = {
    id: "profile",
    icon: <UserCircle />,
    path: "profile", // Changed from "/profile" to make it relative
  };

  return (
    <div className="flex">
      <SideBar
        sidebarNavItems={sidebarNavItems}
        userNavItem={userNavItem}
        onNavigate={(path) => navigate(path)}
      />

      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;