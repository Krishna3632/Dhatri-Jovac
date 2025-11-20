import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';

function AdminLayout() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Navbar />
      <main className="flex-1 ml-20">
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;