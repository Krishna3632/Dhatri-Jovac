import React, { useState } from "react";

// --- SVG Icons (replacing lucide-react for a self-contained file) ---

const IconHeart = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
  </svg>
);

const IconSettings = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 0 2l-.15.08a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.38a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1 0-2l.15-.08a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path><circle cx="12" cy="12" r="3"></circle>
  </svg>
);

const IconLogOut = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line>
  </svg>
);

const IconLayoutDashboard = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="7" height="9" x="3" y="3" rx="1"></rect><rect width="7" height="5" x="14" y="3" rx="1"></rect><rect width="7" height="9" x="14" y="12" rx="1"></rect><rect width="7" height="5" x="3" y="16" rx="1"></rect>
    </svg>
);

const IconUser = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle>
    </svg>
);

const IconCalendar = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect><line x1="16" x2="16" y1="2" y2="6"></line><line x1="8" x2="8" y1="2" y2="6"></line><line x1="3" x2="21" y1="10" y2="10"></line>
    </svg>
);
export default function HomePage() {
  const KPI_data = [
    { id: 1, title: "Total Patients", value: "1,234", change: "+5%" },
    { id: 2, title: "Total Appointments", value: "567", change: "+3%" },
    { id: 3, title: "Avg. Hours/Week", value: "38", change: "+8%" },
  ];

  const appointmentsData = [
    { day: "Mon", value: 4 },
    { day: "Tue", value: 8 },
    { day: "Wed", value: 12 },
    { day: "Thu", value: 6 },
    { day: "Fri", value: 10 },
    { day: "Sat", value: 5 },
    { day: "Sun", value: 2 },
  ];

  const upcomingAppointments = [
    { id: 1, patient: "John Doe", time: "09:00 AM", date: "Mon, 16 Sep" },
    { id: 2, patient: "Jane Smith", time: "11:30 AM", date: "Tue, 17 Sep" },
    { id: 3, patient: "Alex Johnson", time: "02:00 PM", date: "Wed, 18 Sep" },
    { id: 4, patient: "Emily Brown", time: "04:15 PM", date: "Wed, 18 Sep" },
  ];

  const maxValue = Math.max(...appointmentsData.map((d) => d.value), 1);
  const normalizedData = appointmentsData.map((d) => ({
    ...d,
    value: (d.value / maxValue) * 100,
  }));

  return (
    <div className="ml-20 p-6 bg-gray-50/50 min-h-screen">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800">Hey, Krishna!</h1>
        <p className="text-gray-500">Glad to have you back, here's your clinic's status.</p>
      </header>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {KPI_data.map((kpi) => (
                <div key={kpi.id} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1">
                    <h2 className="text-lg font-medium text-gray-600">{kpi.title}</h2>
                    <p className="text-3xl font-bold text-gray-900 mt-1">{kpi.value}</p>
                    <p className={`mt-2 text-sm font-medium ${kpi.change.startsWith("+") ? "text-green-500" : "text-red-500"}`}>
                    {kpi.change} since last month
                    </p>
                </div>
                ))}
            </div>

            {/* Appointments This Week Chart */}
            <div className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Appointments This Week</h3>
                <div className="flex justify-between items-end h-48 space-x-2">
                {normalizedData.map((d) => (
                    <div key={d.day} className="flex flex-col items-center flex-1 group">
                        <div className="w-full h-full flex items-end">
                            <div
                                className="w-full bg-blue-200 group-hover:bg-blue-400 transition-all duration-300 rounded-t-lg"
                                style={{ height: `${d.value}%` }}
                                title={`${d.day}: ${appointmentsData.find(ap => ap.day === d.day).value} appointments`}
                            />
                        </div>
                        <p className="text-xs text-gray-500 mt-2">{d.day}</p>
                    </div>
                ))}
                </div>
            </div>
        </div>

        {/* Right Column (Upcoming Appointments) */}
        <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Upcoming</h2>
            <ul className="space-y-4">
            {upcomingAppointments.map((app) => (
                <li key={app.id} className="bg-gray-50 p-4 rounded-lg flex justify-between items-center hover:bg-gray-100 transition-colors">
                <div>
                    <p className="font-medium text-gray-800">{app.patient}</p>
                    <p className="text-sm text-gray-500">{app.date}</p>
                </div>
                <span className="text-sm font-semibold text-blue-600 bg-blue-100 px-3 py-1 rounded-full">{app.time}</span>
                </li>
            ))}
            </ul>
        </div>
      </div>
    </div>
  );
}