import React from "react";
import { Outlet } from "react-router-dom";

export default function UserLayout() {
  return (
    <div className="ml-10 min-h-screen">

      <Outlet />
    </div>
  );
}
