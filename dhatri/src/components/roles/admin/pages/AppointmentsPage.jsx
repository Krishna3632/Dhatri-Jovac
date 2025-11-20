import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, Bell, Settings, Download, Calendar, Clock, Filter, Plus } from 'lucide-react';

function AppointmentsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDate, setSelectedDate] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(10);

  // Mock appointments data
  const mockAppointments = useMemo(() => [
    {
      id: 1,
      patientName: 'Myles Le',
      patientAvatar: 'ML',
      doctorName: 'Dr. Daniel McAdams',
      specialty: 'Gastroenterologist',
      date: '2025-11-20',
      time: '09:00 AM',
      duration: '30 min',
      type: 'Follow-up',
      status: 'Confirmed',
      reason: 'Regular checkup'
    },
    {
      id: 2,
      patientName: 'Diana Robinson',
      patientAvatar: 'DR',
      doctorName: 'Dr. Michael Lee',
      specialty: 'Ophthalmologist',
      date: '2025-11-20',
      time: '10:30 AM',
      duration: '45 min',
      type: 'Consultation',
      status: 'Pending',
      reason: 'Eye examination'
    },
    {
      id: 3,
      patientName: 'Anita Smith',
      patientAvatar: 'AS',
      doctorName: 'Dr. Emily Johnson',
      specialty: 'Cardiologist',
      date: '2025-11-20',
      time: '11:00 AM',
      duration: '30 min',
      type: 'Follow-up',
      status: 'Confirmed',
      reason: 'Heart monitoring'
    },
    {
      id: 4,
      patientName: 'Niklaus Kemp',
      patientAvatar: 'NK',
      doctorName: 'Dr. Sarah Williams',
      specialty: 'Psychiatrist',
      date: '2025-11-21',
      time: '02:00 PM',
      duration: '60 min',
      type: 'Therapy',
      status: 'Confirmed',
      reason: 'Mental health session'
    },
    {
      id: 5,
      patientName: 'Brett Lopez',
      patientAvatar: 'BL',
      doctorName: 'Dr. Daniel McAdams',
      specialty: 'Gastroenterologist',
      date: '2025-11-21',
      time: '03:30 PM',
      duration: '30 min',
      type: 'Procedure',
      status: 'Scheduled',
      reason: 'Colonoscopy prep'
    },
    {
      id: 6,
      patientName: 'Nolan Keith',
      patientAvatar: 'NK',
      doctorName: 'Dr. Emily Johnson',
      specialty: 'Cardiologist',
      date: '2025-11-22',
      time: '09:30 AM',
      duration: '45 min',
      type: 'Consultation',
      status: 'Confirmed',
      reason: 'Angioplasty follow-up'
    },
    {
      id: 7,
      patientName: 'Tate Michael',
      patientAvatar: 'TM',
      doctorName: 'Dr. Michael Lee',
      specialty: 'Orthopedic Surgeon',
      date: '2025-11-22',
      time: '01:00 PM',
      duration: '30 min',
      type: 'Follow-up',
      status: 'Cancelled',
      reason: 'Post X-ray consultation'
    },
    {
      id: 8,
      patientName: 'Kim Dowry',
      patientAvatar: 'KD',
      doctorName: 'Dr. Daniel McAdams',
      specialty: 'Gastroenterologist',
      date: '2025-11-23',
      time: '10:00 AM',
      duration: '30 min',
      type: 'Follow-up',
      status: 'Confirmed',
      reason: 'Post-procedure checkup'
    },
  ], []);

  // Filter appointments
  const filteredAppointments = useMemo(() => {
    let filtered = mockAppointments;

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(apt => 
        apt.patientName.toLowerCase().includes(query) ||
        apt.doctorName.toLowerCase().includes(query) ||
        apt.reason.toLowerCase().includes(query)
      );
    }

    if (selectedDate !== 'all') {
      filtered = filtered.filter(apt => apt.date === selectedDate);
    }

    if (selectedStatus !== 'all') {
      filtered = filtered.filter(apt => apt.status === selectedStatus);
    }

    return filtered;
  }, [mockAppointments, searchQuery, selectedDate, selectedStatus]);

  // Pagination
  const totalPages = Math.ceil(filteredAppointments.length / rowsPerPage);
  const paginatedAppointments = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return filteredAppointments.slice(start, start + rowsPerPage);
  }, [filteredAppointments, currentPage, rowsPerPage]);

  const getStatusColor = (status) => {
    const colors = {
      'Confirmed': 'bg-green-100 text-green-700',
      'Pending': 'bg-yellow-100 text-yellow-700',
      'Scheduled': 'bg-blue-100 text-blue-700',
      'Cancelled': 'bg-red-100 text-red-700',
      'Completed': 'bg-purple-100 text-purple-700',
    };
    return colors[status] || 'bg-gray-100 text-gray-700';
  };

  const getTypeColor = (type) => {
    const colors = {
      'Follow-up': 'bg-blue-50 text-blue-600 border-blue-200',
      'Consultation': 'bg-purple-50 text-purple-600 border-purple-200',
      'Therapy': 'bg-green-50 text-green-600 border-green-200',
      'Procedure': 'bg-orange-50 text-orange-600 border-orange-200',
    };
    return colors[type] || 'bg-gray-50 text-gray-600 border-gray-200';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Bar */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-20">
        <div className="px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-6 flex-1">
            <h1 className="text-xl font-semibold text-gray-900">Appointments</h1>
            
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search patient, doctor, or reason..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
              <Bell className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
              <Settings className="w-5 h-5" />
            </button>
             <Link to="/admin/profile">
            <div className="w-9 h-9 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-semibold cursor-pointer" >
             A
            </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-8 py-6">
        {/* Filters and Actions */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors flex items-center gap-2">
              <Plus className="w-4 h-4" />
              New Appointment
            </button>
            
            <select
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="all">All Dates</option>
              <option value="2025-11-20">Nov 20, 2025</option>
              <option value="2025-11-21">Nov 21, 2025</option>
              <option value="2025-11-22">Nov 22, 2025</option>
              <option value="2025-11-23">Nov 23, 2025</option>
            </select>

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="all">All Status</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Pending">Pending</option>
              <option value="Scheduled">Scheduled</option>
              <option value="Cancelled">Cancelled</option>
            </select>

            <button className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors flex items-center gap-2">
              <Filter className="w-4 h-4" />
              More Filters
            </button>
          </div>

          <button className="px-4 py-2 bg-purple-50 text-purple-600 rounded-lg text-sm font-semibold hover:bg-purple-100 transition-colors flex items-center gap-2">
            <Download className="w-4 h-4" />
            Download
          </button>
        </div>

        {/* Appointments Table */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Patient
                  </th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Doctor
                  </th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Date & Time
                  </th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Reason
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {paginatedAppointments.map((appointment) => (
                  <tr key={appointment.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-semibold flex-shrink-0">
                          {appointment.patientAvatar}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{appointment.patientName}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm font-medium text-gray-900">{appointment.doctorName}</p>
                      <p className="text-xs text-gray-500">{appointment.specialty}</p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-sm text-gray-900">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span>{new Date(appointment.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                        <Clock className="w-3 h-3" />
                        <span>{appointment.time} ({appointment.duration})</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getTypeColor(appointment.type)}`}>
                        {appointment.type}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(appointment.status)}`}>
                        {appointment.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-gray-700">{appointment.reason}</p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Showing {((currentPage - 1) * rowsPerPage) + 1} to {Math.min(currentPage * rowsPerPage, filteredAppointments.length)} of {filteredAppointments.length} appointments
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>

              <div className="flex items-center gap-1">
                {[...Array(totalPages)].map((_, idx) => {
                  const pageNum = idx + 1;
                  if (pageNum === 1 || pageNum === totalPages || (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)) {
                    return (
                      <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
                          currentPage === pageNum ? 'bg-purple-600 text-white' : 'text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  } else if (pageNum === currentPage - 2 || pageNum === currentPage + 2) {
                    return <span key={pageNum} className="px-1 text-gray-400">...</span>;
                  }
                  return null;
                })}
              </div>

              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 text-sm text-purple-600 hover:bg-purple-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AppointmentsPage;
