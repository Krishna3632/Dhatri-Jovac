import React, { useState } from "react";
import { Link } from "react-router-dom";
// --- SVG Icons ---

const IconSearch = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"></circle><path d="M21 21l-4.35-4.35"></path>
  </svg>
);

const IconFilter = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="22,3 2,3 10,12.46 10,19 14,21 14,12.46 22,3"></polygon>
  </svg>
);

const IconPlus = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line>
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

const IconUser = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle>
  </svg>
);

const IconEye = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle>
  </svg>
);

const IconEdit = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
  </svg>
);

const IconTrash = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3,6 5,6 21,6"></polyline><path d="M19,6v14a2,2 0 0,1 -2,2H7a2,2 0 0,1 -2,-2V6m3,0V4a2,2 0 0,1 2,-2h4a2,2 0 0,1 2,2v2"></path>
  </svg>
);

const IconMoreVertical = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle>
  </svg>
);

export default function PatientsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [viewMode, setViewMode] = useState("table"); // table or cards

  // Enhanced patient data with more details
  const patients = [
    { 
      id: 1, 
      name: "John Doe", 
      age: 34, 
      gender: "Male",
      phone: "+1 (555) 123-4567",
      email: "john.doe@email.com",
      lastVisit: "2025-09-10", 
      nextAppointment: "2025-09-25",
      status: "Active",
      condition: "Hypertension",
      doctor: "Dr. Smith"
    },
    { 
      id: 2, 
      name: "Jane Smith", 
      age: 28, 
      gender: "Female",
      phone: "+1 (555) 234-5678",
      email: "jane.smith@email.com",
      lastVisit: "2025-09-12", 
      nextAppointment: null,
      status: "Inactive",
      condition: "Routine Checkup",
      doctor: "Dr. Johnson"
    },
    { 
      id: 3, 
      name: "Alex Johnson", 
      age: 42, 
      gender: "Male",
      phone: "+1 (555) 345-6789",
      email: "alex.johnson@email.com",
      lastVisit: "2025-09-14", 
      nextAppointment: "2025-09-28",
      status: "Active",
      condition: "Diabetes",
      doctor: "Dr. Smith"
    },
    { 
      id: 4, 
      name: "Emily Brown", 
      age: 31, 
      gender: "Female",
      phone: "+1 (555) 456-7890",
      email: "emily.brown@email.com",
      lastVisit: "2025-09-15", 
      nextAppointment: "2025-09-22",
      status: "Active",
      condition: "Allergies",
      doctor: "Dr. Wilson"
    },
    { 
      id: 5, 
      name: "Michael Chen", 
      age: 39, 
      gender: "Male",
      phone: "+1 (555) 567-8901",
      email: "michael.chen@email.com",
      lastVisit: "2025-09-08", 
      nextAppointment: null,
      status: "Inactive",
      condition: "Back Pain",
      doctor: "Dr. Johnson"
    },
    { 
      id: 6, 
      name: "Sarah Wilson", 
      age: 45, 
      gender: "Female",
      phone: "+1 (555) 678-9012",
      email: "sarah.wilson@email.com",
      lastVisit: "2025-09-16", 
      nextAppointment: "2025-09-30",
      status: "Active",
      condition: "Anxiety",
      doctor: "Dr. Smith"
    }
  ];

  // Filter and sort patients
  let filteredPatients = patients.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         p.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         p.condition.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || p.status.toLowerCase() === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Sort patients
  filteredPatients.sort((a, b) => {
    if (sortBy === "name") return a.name.localeCompare(b.name);
    if (sortBy === "age") return a.age - b.age;
    if (sortBy === "lastVisit") return new Date(b.lastVisit) - new Date(a.lastVisit);
    return 0;
  });

  // Statistics
  const stats = {
    total: patients.length,
    active: patients.filter(p => p.status === "Active").length,
    inactive: patients.filter(p => p.status === "Inactive").length,
    appointments: patients.filter(p => p.nextAppointment).length
  };

  const handlePatientView = (patientId) => {
    // In a real app, this would navigate to /users/${patientId}
    alert(`Viewing patient ${patientId}`);
  };

  const handlePatientEdit = (patientId) => {
    alert(`Editing patient ${patientId}`);
  };

  const handlePatientDelete = (patientId) => {
    if (confirm("Are you sure you want to delete this patient?")) {
      alert(`Deleting patient ${patientId}`);
    }
  };

  return (
    <div className="ml-20 p-6 min-h-screen">
      {/* Header */}
      <header className="mb-8 flex flex-col lg:flex-row lg:justify-between lg:items-center space-y-4 lg:space-y-0">
        <div>
          <h1 className="text-4xl font-bold text-gray-800">Patients</h1>
          <p className="text-gray-500">
            Manage and view all registered patients here.
          </p>
        </div>
        <button className="flex items-center space-x-2 px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-md transition-all transform hover:-translate-y-0.5">
          <IconPlus className="w-4 h-4" />
          <span>Add Patient</span>
        </button>
      </header>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-50 rounded-lg">
              <IconUsers className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <h3 className="text-sm font-medium text-gray-600">Total Patients</h3>
          <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-green-50 rounded-lg">
              <IconUser className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <h3 className="text-sm font-medium text-gray-600">Active Patients</h3>
          <p className="text-3xl font-bold text-gray-900">{stats.active}</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-red-50 rounded-lg">
              <IconUser className="w-6 h-6 text-red-600" />
            </div>
          </div>
          <h3 className="text-sm font-medium text-gray-600">Inactive Patients</h3>
          <p className="text-3xl font-bold text-gray-900">{stats.inactive}</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-purple-50 rounded-lg">
              <IconCalendar className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <h3 className="text-sm font-medium text-gray-600">Upcoming Appointments</h3>
          <p className="text-3xl font-bold text-gray-900">{stats.appointments}</p>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white p-6 rounded-xl shadow-md mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-4">
          {/* Search Bar */}
          <div className="relative flex-1 max-w-md">
            <IconSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search patients by name, email, or condition..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>

          {/* Filters */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <IconFilter className="w-4 h-4 text-gray-600" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            >
              <option value="name">Sort by Name</option>
              <option value="age">Sort by Age</option>
              <option value="lastVisit">Sort by Last Visit</option>
            </select>
          </div>
        </div>
      </div>

      {/* Patient Table */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="px-6 py-4 text-sm font-semibold">Patient</th>
                <th className="px-6 py-4 text-sm font-semibold">Age/Gender</th>
                <th className="px-6 py-4 text-sm font-semibold">Contact</th>
                <th className="px-6 py-4 text-sm font-semibold">Last Visit</th>
                <th className="px-6 py-4 text-sm font-semibold">Next Appointment</th>
                <th className="px-6 py-4 text-sm font-semibold">Status</th>
                <th className="px-6 py-4 text-sm font-semibold">Condition</th>
                <th className="px-6 py-4 text-sm font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPatients.length > 0 ? (
                filteredPatients.map((patient) => (
                  <tr
                    key={patient.id}
                    className="border-b hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <IconUser className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">{patient.name}</p>
                          <p className="text-sm text-gray-500">ID: #{patient.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-gray-800">{patient.age} years</p>
                      <p className="text-sm text-gray-500">{patient.gender}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-gray-800 text-sm">{patient.phone}</p>
                      <p className="text-sm text-gray-500">{patient.email}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-gray-800">{patient.lastVisit}</p>
                      <p className="text-xs text-gray-500">{patient.doctor}</p>
                    </td>
                    <td className="px-6 py-4">
                      {patient.nextAppointment ? (
                        <p className="text-blue-600 font-medium">{patient.nextAppointment}</p>
                      ) : (
                        <p className="text-gray-400">None scheduled</p>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          patient.status === "Active"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {patient.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-gray-800 text-sm">{patient.condition}</p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end space-x-2">
                        <Link to={`/users/${patient.id}`}>
                        <button 
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="View Patient"
                        >
                          <IconEye className="w-4 h-4" />
                        </button>
                        </Link>
                        <button 
                          onClick={() => handlePatientEdit(patient.id)}
                          className="p-2 text-yellow-600 hover:bg-yellow-50 rounded-lg transition-colors"
                          title="Edit Patient"
                        >
                          <IconEdit className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handlePatientDelete(patient.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete Patient"
                        >
                          <IconTrash className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="8"
                    className="text-center py-12"
                  >
                    <div className="flex flex-col items-center space-y-3">
                      <IconUsers className="w-12 h-12 text-gray-300" />
                      <p className="text-gray-500 font-medium">No patients found</p>
                      <p className="text-sm text-gray-400">Try adjusting your search or filter criteria</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Results Summary */}
      {filteredPatients.length > 0 && (
        <div className="mt-6 text-center">
          <p className="text-gray-500">
            Showing {filteredPatients.length} of {patients.length} patients
          </p>
        </div>
      )}
    </div>
  );
}