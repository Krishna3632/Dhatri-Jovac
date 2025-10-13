// main.jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import routes from "./DoctorRoutes";
import './index.css'
import DoctorRoutes from './DoctorRoutes';
import { RouterProvider } from "react-router-dom";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={DoctorRoutes} />
    {/* <RouterProvider router={routes} /> */}
  </React.StrictMode>
)
