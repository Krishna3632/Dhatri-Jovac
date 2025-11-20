import React, { useState, useMemo } from 'react';
import { Eye, MoreVertical } from 'lucide-react';

function PatientsTable({ searchQuery = '' }) {
  const [selectedRows, setSelectedRows] = useState(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Mock patient data
  const mockPatients = useMemo(() => [
    {
      id: 1,
      name: 'Myles Le',
      age: 68,
      gender: 'Male',
      avatar: 'ML',
      email: 'in.myles@gmail.com',
      phone: '+1 (347) 5356 357',
      mrn: 'MRN: 87256321',
      recentVisits: ['Fracture'],
      doctor: { name: 'Dr. Daniel McAdams', specialty: 'Gastroenterologist' }
    },
    {
      id: 2,
      name: 'Mylah Bean',
      age: 9,
      gender: 'Female',
      avatar: 'MB',
      email: 'mylan.m@gmail.com',
      phone: '+1 (473) 5587 328',
      mrn: 'MRN: 45673821',
      recentVisits: ['Pregnancy'],
      doctor: { name: 'Dr. Daniel McAdams', specialty: 'Gastroenterologist' }
    },
    {
      id: 3,
      name: 'Anita Smith',
      age: 61,
      gender: 'Female',
      avatar: 'AS',
      email: 'anita.smith@gmail.com',
      phone: '+1 (776) 3345 889',
      mrn: 'MRN: 23456789',
      recentVisits: ['CHF'],
      doctor: { name: 'Dr. Emily Johnson', specialty: 'Cardiologist' }
    },
    {
      id: 4,
      name: 'Niklaus Kemp',
      age: 40,
      gender: 'Male',
      avatar: 'NK',
      email: 'nike_kemp@gmail.com',
      phone: '+1 (667) 8667 778',
      mrn: 'MRN: 34567890',
      recentVisits: ['Psychiatry'],
      doctor: { name: 'Dr. Michael Lee', specialty: 'Orthopedic Surgeon' }
    },
    {
      id: 5,
      name: 'Brett Lopez',
      age: 9,
      gender: 'Male',
      avatar: 'BL',
      email: 'brett.lopez@gmail.com',
      phone: '+1 (332) 5673 926',
      mrn: 'MRN: 45678901',
      recentVisits: ['Colonoscopy'],
      doctor: { name: 'Dr. Daniel McAdams', specialty: 'Gastroenterologist' }
    },
    {
      id: 6,
      name: 'Nolan Keith',
      age: 48,
      gender: 'Male',
      avatar: 'NK',
      email: 'nolan.keith@gmail.com',
      phone: '+1 (667) 7787 448',
      mrn: 'MRN: 56789012',
      recentVisits: ['Angioplasty'],
      doctor: { name: 'Dr. Emily Johnson', specialty: 'Cardiologist' }
    },
    {
      id: 7,
      name: 'Tate Michael',
      age: 48,
      gender: 'Male',
      avatar: 'TM',
      email: 'tate.mike@gmail.com',
      phone: '+1 (776) 9887 339',
      mrn: 'MRN: 67890123',
      recentVisits: ['X-ray'],
      doctor: { name: 'Dr. Michael Lee', specialty: 'Orthopedic Surgeon' }
    },
    {
      id: 8,
      name: 'Diana Robinson',
      age: 48,
      gender: 'Female',
      avatar: 'DR',
      email: 'diana.rob@gmail.com',
      phone: '+1 (776) 9987 225',
      mrn: 'MRN: 78901234',
      recentVisits: ['LASIK Eye Surgery'],
      doctor: { name: 'Dr. Michael Lee', specialty: 'Ophthalmologist' }
    },
    {
      id: 9,
      name: 'Kim Dowry',
      age: 52,
      gender: 'Female',
      avatar: 'KD',
      email: 'kim.dowry@gmail.com',
      phone: '+1 (445) 7823 556',
      mrn: 'MRN: 89012345',
      recentVisits: ['Colonoscopy'],
      doctor: { name: 'Dr. Michael Lee', specialty: 'Gastroenterologist' }
    },
  ], []);

  // Filter patients based on search query
  const filteredPatients = useMemo(() => {
    if (!searchQuery) return mockPatients;
    
    const query = searchQuery.toLowerCase();
    return mockPatients.filter(patient => 
      patient.name.toLowerCase().includes(query) ||
      patient.mrn.toLowerCase().includes(query) ||
      patient.email.toLowerCase().includes(query) ||
      patient.phone.includes(query)
    );
  }, [mockPatients, searchQuery]);

  // Pagination
  const totalPages = Math.ceil(filteredPatients.length / rowsPerPage);
  const paginatedPatients = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return filteredPatients.slice(start, start + rowsPerPage);
  }, [filteredPatients, currentPage, rowsPerPage]);

  const toggleSelectAll = () => {
    if (selectedRows.size === paginatedPatients.length) {
      setSelectedRows(new Set());
    } else {
      setSelectedRows(new Set(paginatedPatients.map(p => p.id)));
    }
  };

  const toggleSelect = (id) => {
    const newSelected = new Set(selectedRows);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedRows(newSelected);
  };

  const getVisitBadgeColor = (visit) => {
    const colors = {
      'Fracture': 'bg-orange-100 text-orange-700',
      'Pregnancy': 'bg-purple-100 text-purple-700',
      'CHF': 'bg-blue-100 text-blue-700',
      'Psychiatry': 'bg-green-100 text-green-700',
      'Colonoscopy': 'bg-pink-100 text-pink-700',
      'Angioplasty': 'bg-red-100 text-red-700',
      'X-ray': 'bg-gray-100 text-gray-700',
      'LASIK Eye Surgery': 'bg-cyan-100 text-cyan-700',
    };
    return colors[visit] || 'bg-gray-100 text-gray-700';
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="w-12 px-6 py-3">
                <input
                  type="checkbox"
                  checked={selectedRows.size === paginatedPatients.length && paginatedPatients.length > 0}
                  onChange={toggleSelectAll}
                  className="w-4 h-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                />
              </th>
              <th className="text-left px-6 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Patient Name
              </th>
              <th className="text-left px-6 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Contact Info
              </th>
              <th className="text-left px-6 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Recent Visits
              </th>
              <th className="text-left px-6 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Assigned Doctor
              </th>
              <th className="text-left px-6 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {paginatedPatients.map((patient) => (
              <tr key={patient.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <input
                    type="checkbox"
                    checked={selectedRows.has(patient.id)}
                    onChange={() => toggleSelect(patient.id)}
                    className="w-4 h-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                  />
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-semibold flex-shrink-0">
                      {patient.avatar}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{patient.name}</p>
                      <p className="text-xs text-gray-500">{patient.age} y, {patient.gender}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm text-gray-900">{patient.email}</p>
                  <p className="text-xs text-gray-500">{patient.phone}</p>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-1.5">
                    {patient.recentVisits.map((visit, idx) => (
                      <span
                        key={idx}
                        className={`px-2.5 py-1 rounded-full text-xs font-medium ${getVisitBadgeColor(visit)}`}
                      >
                        {visit}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm font-medium text-gray-900">{patient.doctor.name}</p>
                  <p className="text-xs text-gray-500">{patient.doctor.specialty}</p>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button className="p-1.5 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span>Rows per page:</span>
          <select
            value={rowsPerPage}
            onChange={(e) => {
              setRowsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>

          {/* Page Numbers */}
          <div className="flex items-center gap-1">
            {[...Array(totalPages)].map((_, idx) => {
              const pageNum = idx + 1;
              if (
                pageNum === 1 ||
                pageNum === totalPages ||
                (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)
              ) {
                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
                      currentPage === pageNum
                        ? 'bg-purple-600 text-white'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              } else if (pageNum === currentPage - 2 || pageNum === currentPage + 2) {
                return (
                  <span key={pageNum} className="px-1 text-gray-400">
                    ...
                  </span>
                );
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
  );
}

export default PatientsTable;
