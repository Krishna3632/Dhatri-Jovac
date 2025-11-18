import { Outlet, useNavigate } from "react-router-dom";
import SideBar from "../../SideBar";
import { Home, Users, BarChart2, UserCircle } from "lucide-react";
import { ToastContainer , toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function AppLayout() {
  const navigate = useNavigate();

 
  const sidebarNavItems = [
    { id: "home", icon: <Home />, path: "/doctor/home" },
    { id: "users", icon: <Users />, path: "/doctor/users" },
    { id: "stats", icon: <BarChart2 />, path: "/doctor/stats" },
  ];
  
 
  const userNavItem = {
    id: "profile",
    icon: <UserCircle />,
    path: "/profile",
  };

  return (
    <div className="flex">
      <SideBar
        sidebarNavItems={sidebarNavItems}
        userNavItem={userNavItem} 
        onNavigate={(path) => navigate(`${path}`)} 
      />

      <main className="flex-1 p-6">
        <Outlet /> 
      </main>
      <ToastContainer position="bottom-right" autoClose={2000} />
    </div>
  );
}

export default AppLayout;