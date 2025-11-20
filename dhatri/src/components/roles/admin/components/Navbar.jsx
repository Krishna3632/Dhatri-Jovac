import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, Calendar, ClipboardList, FileText, User } from 'lucide-react';

function Navbar() {
  const navItems = [
    { id: 'dashboard', path: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'patients', path: '/admin/patients', icon: Users, label: 'Patients' },
    { id: 'appointments', path: '/admin/appointments', icon: Calendar, label: 'Appointments' },
    { id: 'records', path: '/admin/records', icon: ClipboardList, label: 'Records' },
    { id: 'profile', path: '/admin/profile', icon: User, label: 'Profile' },
  ];

  return (
    <nav className="fixed left-0 top-0 h-screen w-20 bg-white border-r border-gray-200 flex flex-col items-center py-6 shadow-sm z-50">
      {/* Logo/Brand */}
      <div className="mb-8 flex items-center justify-center">
        <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
          <span className="text-white font-bold text-lg">D</span>
        </div>
      </div>

      {/* Navigation Items */}
      <div className="flex-1 flex flex-col items-center space-y-2 w-full px-3">
        {navItems.map((item) => (
          <NavLink
            key={item.id}
            to={item.path}
            className={({ isActive }) =>
              `w-14 h-14 flex items-center justify-center rounded-xl transition-all duration-200 group relative ${
                isActive
                  ? 'bg-purple-50 text-purple-600 shadow-md max-width'
                  : 'text-gray-400 hover:bg-gray-50 hover:text-gray-600'
              }`
            }
            title={item.label}
          >
            {({ isActive }) => (
              <>
                <item.icon className="w-10 h-5" strokeWidth={isActive ? 2.5 : 2} />
                
                {/* Tooltip */}
                <div className="absolute left-full ml-4 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
                  {item.label}
                  <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-gray-900"></div>
                </div>
              </>
            )}
          </NavLink>
        ))}
      </div>

      {/* Bottom Divider (optional) */}
      <div className="w-12 h-px bg-gray-200 my-4"></div>
    </nav>
  );
}

export default Navbar;
