import React, { useEffect, useState } from "react";

// --- SVG Icons ---

const IconTrendingUp = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="22,7 13.5,15.5 8.5,10.5 2,17"></polyline><polyline points="16,7 22,7 22,13"></polyline>
  </svg>
);

const IconUsers = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
  </svg>
);

const IconCalendar = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect><line x1="16" x2="16" y1="2" y2="6"></line><line x1="8" x2="8" y1="2" y2="6"></line><line x1="3" x2="21" y1="10" y2="10"></line>
  </svg>
);

const IconClock = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle><polyline points="12,6 12,12 16,14"></polyline>
  </svg>
);

const IconDollarSign = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
  </svg>
);

const IconActivity = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="22,12 18,12 15,21 9,3 6,12 2,12"></polyline>
  </svg>
);

export default function StatisticsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  useEffect(() => {
    document.title = "Doctor - Statistics";
  },[]);
  const mainStats = [
    { 
      id: 1, 
      title: "Total Patients", 
      value: "1,234", 
      change: "+12%", 
      icon: IconUsers,
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    { 
      id: 2, 
      title: "Total Appointments", 
      value: "2,567", 
      change: "+8%", 
      icon: IconCalendar,
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    { 
      id: 3, 
      title: "Revenue This Month", 
      value: "$45,230", 
      change: "+15%", 
      icon: IconDollarSign,
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    },
    { 
      id: 4, 
      title: "Average Wait Time", 
      value: "12 min", 
      change: "-5%", 
      icon: IconClock,
      color: "text-orange-600",
      bgColor: "bg-orange-50"
    }
  ];

  const monthlyData = [
    { month: "Jan", patients: 85, appointments: 180, revenue: 28000 },
    { month: "Feb", patients: 92, appointments: 195, revenue: 31500 },
    { month: "Mar", patients: 78, appointments: 165, revenue: 25200 },
    { month: "Apr", patients: 110, appointments: 235, revenue: 38900 },
    { month: "May", patients: 125, appointments: 265, revenue: 42300 },
    { month: "Jun", patients: 118, appointments: 250, revenue: 40100 },
    { month: "Jul", patients: 135, appointments: 285, revenue: 45230 },
  ];

  const patientDemographics = [
    { age: "0-18", count: 180, percentage: 15 },
    { age: "19-35", count: 370, percentage: 30 },
    { age: "36-50", count: 445, percentage: 36 },
    { age: "51-65", count: 185, percentage: 15 },
    { age: "65+", count: 54, percentage: 4 },
  ];

  const topConditions = [
    { condition: "Hypertension", patients: 245, percentage: 20 },
    { condition: "Diabetes", patients: 198, percentage: 16 },
    { condition: "Anxiety", patients: 167, percentage: 14 },
    { condition: "Back Pain", patients: 134, percentage: 11 },
    { condition: "Allergies", patients: 123, percentage: 10 },
  ];

  const maxPatients = Math.max(...monthlyData.map(d => d.patients));
  const maxRevenue = Math.max(...monthlyData.map(d => d.revenue));

  return (
    <div className="ml-20 p-6 min-h-screen">
      {/* Header */}
      <header className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold text-gray-800">Statistics Dashboard</h1>
          <p className="text-gray-500">Comprehensive overview of your clinic's performance</p>
        </div>
        <div className="flex space-x-2">
          {['week', 'month', 'year'].map((period) => (
            <button
              key={period}
              onClick={() => setSelectedPeriod(period)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                selectedPeriod === period
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              {period.charAt(0).toUpperCase() + period.slice(1)}
            </button>
          ))}
        </div>
      </header>

      {/* Main Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {mainStats.map((stat) => {
          const IconComponent = stat.icon;
          return (
            <div key={stat.id} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                  <IconComponent className={`w-6 h-6 ${stat.color}`} />
                </div>
                <IconTrendingUp className="w-4 h-4 text-gray-400" />
              </div>
              <h2 className="text-sm font-medium text-gray-600 mb-1">{stat.title}</h2>
              <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
              <p className={`mt-2 text-sm font-medium flex items-center ${
                stat.change.startsWith("+") ? "text-green-500" : "text-red-500"
              }`}>
                {stat.change} vs last {selectedPeriod}
              </p>
            </div>
          );
        })}
      </div>

      {/* Charts and Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        
        {/* Monthly Trends Chart */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-xl font-semibold text-gray-800 mb-6">Monthly Trends</h3>
          <div className="space-y-6">
            
            {/* Patients Chart */}
            <div>
              <h4 className="text-sm font-medium text-gray-600 mb-3">New Patients</h4>
              <div className="flex justify-between items-end h-32 space-x-2">
                {monthlyData.map((data) => (
                  <div key={data.month} className="flex flex-col items-center flex-1 group">
                    <div className="w-full h-full flex items-end">
                      <div
                        className="w-full bg-blue-200 group-hover:bg-blue-400 transition-all duration-300 rounded-t"
                        style={{ height: `${(data.patients / maxPatients) * 100}%` }}
                        title={`${data.month}: ${data.patients} patients`}
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-2">{data.month}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Revenue Chart */}
            <div>
              <h4 className="text-sm font-medium text-gray-600 mb-3">Revenue</h4>
              <div className="flex justify-between items-end h-32 space-x-2">
                {monthlyData.map((data) => (
                  <div key={data.month} className="flex flex-col items-center flex-1 group">
                    <div className="w-full h-full flex items-end">
                      <div
                        className="w-full bg-green-200 group-hover:bg-green-400 transition-all duration-300 rounded-t"
                        style={{ height: `${(data.revenue / maxRevenue) * 100}%` }}
                        title={`${data.month}: $${data.revenue.toLocaleString()}`}
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-2">{data.month}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Patient Demographics */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-xl font-semibold text-gray-800 mb-6">Patient Demographics</h3>
          <div className="space-y-4">
            {patientDemographics.map((demo) => (
              <div key={demo.age} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 text-sm font-medium text-gray-600">{demo.age}</div>
                  <div className="flex-1 bg-gray-200 rounded-full h-2 min-w-[120px]">
                    <div
                      className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${demo.percentage * 2.5}%` }}
                    />
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold text-gray-900">{demo.count}</div>
                  <div className="text-xs text-gray-500">{demo.percentage}%</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Top Conditions */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-xl font-semibold text-gray-800 mb-6">Most Common Conditions</h3>
          <div className="space-y-4">
            {topConditions.map((condition, index) => (
              <div key={condition.condition} className="flex items-center space-x-4">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-sm font-bold text-blue-600">{index + 1}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-gray-800">{condition.condition}</span>
                    <span className="text-sm text-gray-600">{condition.patients} patients</span>
                  </div>
                  <div className="bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${condition.percentage * 4}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-xl font-semibold text-gray-800 mb-6">Quick Stats</h3>
          <div className="space-y-6">
            
            <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
              <IconActivity className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-900">94.5%</div>
              <div className="text-sm text-blue-600">Patient Satisfaction</div>
            </div>
            
            <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg">
              <IconTrendingUp className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-900">23%</div>
              <div className="text-sm text-green-600">Growth Rate</div>
            </div>
            
            <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg">
              <IconClock className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-purple-900">2.3</div>
              <div className="text-sm text-purple-600">Avg Visits/Patient</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}