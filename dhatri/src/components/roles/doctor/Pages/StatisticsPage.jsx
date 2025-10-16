import React, { useEffect } from "react";

export default function StatisticsPage() {
  useEffect(() => {
    document.title = "Statistics - Dhatri";
  }, []);
  return (
    <div className="ml-20 p-6 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Statistics Dashboard</h1>
      <p>Under development</p>
    </div>
  );
}