import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import MainRoutes from './router';
import { RouterProvider } from "react-router-dom";
import { DataProvider } from './context/DataContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <DataProvider>
      <RouterProvider router={MainRoutes} />
    </DataProvider>
  </React.StrictMode>
)
