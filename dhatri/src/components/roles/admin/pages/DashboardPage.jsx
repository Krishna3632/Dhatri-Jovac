import React, { useState } from 'react';
import { Search, Bell, Settings, TrendingUp, TrendingDown, Users, Calendar, FileText, Activity, Clock, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

function DashboardPage() {
  const [timeRange, setTimeRange] = useState('week');

  // Stats data
  const stats = [
    {
      title: 'Total Patients',
      value: '2,847',
      change: '+12.5%',
      trend: 'up',
      icon: Users,
      color: 'purple',
      bgColor: 'bg-purple-50',
      iconColor: 'text-purple-600'
    },
    {
      title: 'Appointments Today',
      value: '143',
      change: '+8.2%',
      trend: 'up',
      icon: Calendar,
      color: 'blue',
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600'
    },
    {
      title: 'Active Records',
      value: '1,284',
      change: '+23.1%',
      trend: 'up',
      icon: FileText,
      color: 'green',
      bgColor: 'bg-green-50',
      iconColor: 'text-green-600'
    },
    {
      title: 'Patient Satisfaction',
      value: '96.4%',
      change: '-2.3%',
      trend: 'down',
      icon: Activity,
      color: 'orange',
      bgColor: 'bg-orange-50',
      iconColor: 'text-orange-600'
    },
  ];

  // Recent appointments
  const recentAppointments = [
    {
      id: 1,
      patient: 'Myles Le',
      avatar: 'ML',
      time: '09:00 AM',
      doctor: 'Dr. Daniel McAdams',
      type: 'Follow-up',
      status: 'Confirmed'
    },
    {
      id: 2,
      patient: 'Diana Robinson',
      avatar: 'DR',
      time: '10:30 AM',
      doctor: 'Dr. Michael Lee',
      type: 'Consultation',
      status: 'Pending'
    },
    {
      id: 3,
      patient: 'Anita Smith',
      avatar: 'AS',
      time: '11:00 AM',
      doctor: 'Dr. Emily Johnson',
      type: 'Follow-up',
      status: 'Confirmed'
    },
    {
      id: 4,
      patient: 'Niklaus Kemp',
      avatar: 'NK',
      time: '02:00 PM',
      doctor: 'Dr. Sarah Williams',
      type: 'Therapy',
      status: 'Confirmed'
    },
  ];

  // Recent activity
  const recentActivity = [
    {
      id: 1,
      action: 'New patient registered',
      patient: 'Brett Lopez',
      time: '5 minutes ago',
      type: 'patient'
    },
    {
      id: 2,
      action: 'Appointment scheduled',
      patient: 'Kim Dowry',
      time: '12 minutes ago',
      type: 'appointment'
    },
    {
      id: 3,
      action: 'Medical record uploaded',
      patient: 'Tate Michael',
      time: '1 hour ago',
      type: 'record'
    },
    {
      id: 4,
      action: 'Prescription issued',
      patient: 'Nolan Keith',
      time: '2 hours ago',
      type: 'prescription'
    },
  ];

  const getStatusColor = (status) => {
    const colors = {
      'Confirmed': 'bg-green-100 text-green-700',
      'Pending': 'bg-yellow-100 text-yellow-700',
      'Scheduled': 'bg-blue-100 text-blue-700',
    };
    return colors[status] || 'bg-gray-100 text-gray-700';
  };

  const getActivityIcon = (type) => {
    const icons = {
      'patient': '👤',
      'appointment': '📅',
      'record': '📄',
      'prescription': '💊'
    };
    return icons[type] || '📌';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Bar */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-20">
        <div className="px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-6 flex-1">
            <h1 className="text-xl font-semibold text-gray-900">Dashboard</h1>
            
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search patients, appointments, records..."
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="year">This Year</option>
            </select>
            <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
              <Bell className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
              <Settings className="w-5 h-5" />
            </button>
            <div className="w-9 h-9 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-semibold cursor-pointer">
              A
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-8 py-6 space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className={`${stat.bgColor} p-3 rounded-lg`}>
                  <stat.icon className={`w-6 h-6 ${stat.iconColor}`} />
                </div>
                <div className={`flex items-center gap-1 text-sm font-medium ${
                  stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.trend === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                  {stat.change}
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
              <p className="text-sm text-gray-500">{stat.title}</p>
            </div>
          ))}
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Today's Appointments */}
          <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Today's Appointments</h2>
                <p className="text-sm text-gray-500 mt-0.5">4 appointments scheduled</p>
              </div>
              <Link
                to="/admin/appointments"
                className="text-sm text-purple-600 hover:text-purple-700 font-medium flex items-center gap-1"
              >
                View All
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="divide-y divide-gray-100">
              {recentAppointments.map((appointment) => (
                <div key={appointment.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 flex-1">
                      <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-semibold flex-shrink-0">
                        {appointment.avatar}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900">{appointment.patient}</p>
                        <p className="text-xs text-gray-500">{appointment.doctor}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Clock className="w-4 h-4 text-gray-400" />
                        {appointment.time}
                      </div>
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                        {appointment.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
              <p className="text-sm text-gray-500 mt-0.5">Latest updates</p>
            </div>
            <div className="divide-y divide-gray-100">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start gap-3">
                    <div className="text-2xl">{getActivityIcon(activity.type)}</div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-900">{activity.action}</p>
                      <p className="text-sm font-medium text-gray-700">{activity.patient}</p>
                      <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="px-6 py-3 bg-gray-50 border-t border-gray-200">
              <button className="text-sm text-purple-600 hover:text-purple-700 font-medium w-full text-center">
                View All Activity
              </button>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link
              to="/admin/patients"
              className="flex flex-col items-center justify-center p-6 rounded-lg border-2 border-gray-200 hover:border-purple-300 hover:bg-purple-50 transition-all group"
            >
              <Users className="w-8 h-8 text-gray-400 group-hover:text-purple-600 mb-2" />
              <span className="text-sm font-medium text-gray-700 group-hover:text-purple-700">View Patients</span>
            </Link>
            <Link
              to="/admin/appointments"
              className="flex flex-col items-center justify-center p-6 rounded-lg border-2 border-gray-200 hover:border-purple-300 hover:bg-purple-50 transition-all group"
            >
              <Calendar className="w-8 h-8 text-gray-400 group-hover:text-purple-600 mb-2" />
              <span className="text-sm font-medium text-gray-700 group-hover:text-purple-700">Appointments</span>
            </Link>
            <Link
              to="/admin/records"
              className="flex flex-col items-center justify-center p-6 rounded-lg border-2 border-gray-200 hover:border-purple-300 hover:bg-purple-50 transition-all group"
            >
              <FileText className="w-8 h-8 text-gray-400 group-hover:text-purple-600 mb-2" />
              <span className="text-sm font-medium text-gray-700 group-hover:text-purple-700">Medical Records</span>
            </Link>
            <Link
              to="/admin/reports"
              className="flex flex-col items-center justify-center p-6 rounded-lg border-2 border-gray-200 hover:border-purple-300 hover:bg-purple-50 transition-all group"
            >
              <Activity className="w-8 h-8 text-gray-400 group-hover:text-purple-600 mb-2" />
              <span className="text-sm font-medium text-gray-700 group-hover:text-purple-700">Reports</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
