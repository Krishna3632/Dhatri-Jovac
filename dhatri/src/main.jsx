import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import MainRoutes from './router';
import { RouterProvider } from "react-router-dom";
import { DataProvider } from './context/DataContext';
import { AuthProvider } from './context/AuthContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <DataProvider>
        <RouterProvider router={MainRoutes} />
      </DataProvider>
    </AuthProvider>
  </React.StrictMode>
)
AuthProvider