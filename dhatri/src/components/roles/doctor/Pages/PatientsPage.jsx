import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useData } from "../../../../context/DataContext";
import { toast }  from "react-toastify";
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
  const [showLoader, setShowLoader] = useState(true);
  const { patients , refreshPatients } = useData();

  // local state for rendering / modifications
  const [patientData, setPatientsData] = useState(Array.isArray(patients) ? patients : []);
  const [deleteForm, setDeleteForm] = useState(false);
  const [patientIdToDelete, setPatientIdToDelete] = useState(null);
  const [prescribeForm, setPrescribeForm] = useState(false);

  useEffect(() => {
    document.title = "Doctor - Patients";
  }, []);

  // sync loader
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoader(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // sync local patientData when context patients change
  useEffect(() => {
    if (Array.isArray(patients)) {
      setPatientsData(patients);
      console.log("Patients data from context:", patients);
    } else {
      setPatientsData([]);
    }
  }, [patients]);

  if (showLoader) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32"></div>
      </div>
    );
  }

  // ensure we have an array to work with
  const patientsArray = Array.isArray(patients) ? patients : [];

  // Filter and sort patients safely
  const filteredPatients = patientsArray.filter((p) => {
    const matchesSearch =
      (p.name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (p.email || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (p.condition || "").toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || (p.status || "").toLowerCase() === statusFilter;
    return matchesSearch && matchesStatus;
  });

  filteredPatients.sort((a, b) => {
    if (sortBy === "name") return (a.name || "").localeCompare(b.name || "");
    if (sortBy === "age") return (a.age || 0) - (b.age || 0);
    if (sortBy === "lastVisit") return new Date(b.lastVisit || 0) - new Date(a.lastVisit || 0);
    return 0;
  });

  const stats = {
    total: patientsArray.length,
    active: patientsArray.filter(p => p.isActive === true).length,
    inactive: patientsArray.filter(p => p.isActive === false).length,
    appointments: "-",
  };

  const handlePatientView = (patientId) => {
    // alert(`Viewing patient ${patientId}`);
  };

  const handlePrescribe = (patientId) => {
    console.log("Prescribe for", patientId);
    setPrescribeForm(true);
  };

  const handlePatientDelete = (patientId) => {
    fetch(`http://localhost:5000/api/patients/delete/${patientId}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
      .then((response) => {
        if (response.ok) {
          toast.success("User deleted", { autoClose: 5000 });
          
          if (typeof refreshPatients === "function") refreshPatients();
        } else {
          toast.error("Failed to delete patient.");
        }
      })
      .catch((error) => {
        console.error("Error deleting patient:", error);
        toast.error("Error deleting patient.");
      });
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
      </header>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1">
          <h3 className="text-sm font-medium text-gray-600">Total Patients</h3>
          <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1">
          <h3 className="text-sm font-medium text-gray-600">Active Patients</h3>
          <p className="text-3xl font-bold text-gray-900">{stats.active}</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1">
          <h3 className="text-sm font-medium text-gray-600">Inactive Patients</h3>
          <p className="text-3xl font-bold text-gray-900">{stats.inactive}</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1">
          <h3 className="text-sm font-medium text-gray-600">Upcoming Appointments</h3>
          <p className="text-3xl font-bold text-gray-900">{stats.appointments}</p>
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
              {patientData.length > 0 ? (
                patientData.map((patient) => (
                  <tr
                    key={patient._id}
                    className="border-b hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <IconUser className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">{patient.name}</p>
                          <p className="text-sm text-gray-500">ID: #{patient._id}</p>
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
                        <Link to={`/doctor/users/${patient._id}`}>
                          <button
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="View Patient"
                            onClick={() => handlePatientView(patient._id)}
                          >
                            <IconEye className="w-4 h-4" />
                          </button>
                        </Link>
                        <button
                          onClick={() => handlePrescribe(patient._id)}
                          className="p-2 text-yellow-600 hover:bg-yellow-50 rounded-lg transition-colors"
                          title="Prescribe Patient"
                        >
                          <IconEdit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            setDeleteForm(true);
                            setPatientIdToDelete(patient._id);
                          }}
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
            Showing {filteredPatients.length} of {patientsArray.length} patients
          </p>
        </div>
      )}

      {prescribeForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Prescribe Medication</h2>
            <p className="text-gray-600 mb-6">Prescribing functionality is under development.</p>
            <div className="flex justify-end">
              <button
                onClick={() => setPrescribeForm(false)}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {deleteForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Confirm Deletion</h2>
            <p className="text-gray-600 mb-6">Are you sure you want to delete this patient? This action cannot be undone.</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => {
                  setDeleteForm(false);
                  handlePatientDelete(patientIdToDelete);
                }}
                className="px-4 py-2 bg-red-600 text-white rounded-lg"
              >
                Delete
              </button>
              <button
                onClick={() => setDeleteForm(false)}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}