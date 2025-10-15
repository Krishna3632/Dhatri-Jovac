import React from 'react';
import { Outlet } from 'react-router-dom';
import { AuthProvider } from './auth/AuthContext';

function Root() {
  // This component now sits inside the Router's context,
  // so the AuthProvider (and its use of useNavigate) will work correctly.
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  );
}

export default Root;