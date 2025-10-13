// src/components/AppLayout.jsx

import { Outlet, useNavigate } from "react-router-dom";
import SideBar from "../../SideBar";
import { Home, Users, BarChart2, UserCircle } from "lucide-react"; // ✨ Import UserCircle icon

function AppLayout() {
  const navigate = useNavigate();

  // Main navigation items
  const sidebarNavItems = [
    { id: "home", icon: <Home />, path: "/doctor/home" },
    { id: "users", icon: <Users />, path: "/doctor/users" },
    { id: "stats", icon: <BarChart2 />, path: "/doctor/stats" },
  ];
  
  // ✨ User profile navigation item
  const userNavItem = {
    id: "profile",
    icon: <UserCircle />,
    path: "/profile",
  };

  return (
    <div className="flex">
      <SideBar
        sidebarNavItems={sidebarNavItems}
        userNavItem={userNavItem} // ✨ Pass the user item as a prop
        onNavigate={(path) => navigate(`${path}`)} // ✨ Simplified navigation handler
      />

      <main className="flex-1 p-6">
        <Outlet /> {/* Renders the component for the current route */}
      </main>
    </div>
  );
}

export default AppLayout;