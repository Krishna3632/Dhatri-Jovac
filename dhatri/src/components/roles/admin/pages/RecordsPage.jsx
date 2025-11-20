import React, { useState, useMemo } from 'react';
import { Search, Bell, Settings, Download, FileText, Upload, Eye, MoreVertical, Filter } from 'lucide-react';
import DocumentPopUp from '../components/DocumentPopUp';

function RecordsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedDate, setSelectedDate] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(10);
  const [showDocumentPopup, setShowDocumentPopup] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  // Mock medical records data
  const mockRecords = useMemo(() => [
    {
      id: 1,
      patientName: 'Myles Le',
      patientAvatar: 'ML',
      recordType: 'Lab Report',
      recordName: 'Complete Blood Count (CBC)',
      date: '2025-11-18',
      doctorName: 'Dr. Daniel McAdams',
      fileSize: '2.3 MB',
      format: 'PDF',
      status: 'Available'
    },
    {
      id: 2,
      patientName: 'Diana Robinson',
      patientAvatar: 'DR',
      recordType: 'Imaging',
      recordName: 'Eye Scan - LASIK Pre-op',
      date: '2025-11-17',
      doctorName: 'Dr. Michael Lee',
      fileSize: '5.8 MB',
      format: 'DICOM',
      status: 'Available'
    },
    {
      id: 3,
      patientName: 'Anita Smith',
      patientAvatar: 'AS',
      recordType: 'Prescription',
      recordName: 'Heart Medication - Monthly',
      date: '2025-11-16',
      doctorName: 'Dr. Emily Johnson',
      fileSize: '0.5 MB',
      format: 'PDF',
      status: 'Available'
    },
    {
      id: 4,
      patientName: 'Niklaus Kemp',
      patientAvatar: 'NK',
      recordType: 'Progress Note',
      recordName: 'Psychiatric Evaluation',
      date: '2025-11-15',
      doctorName: 'Dr. Sarah Williams',
      fileSize: '1.2 MB',
      format: 'PDF',
      status: 'Available'
    },
    {
      id: 5,
      patientName: 'Brett Lopez',
      patientAvatar: 'BL',
      recordType: 'Procedure Report',
      recordName: 'Colonoscopy Results',
      date: '2025-11-14',
      doctorName: 'Dr. Daniel McAdams',
      fileSize: '3.4 MB',
      format: 'PDF',
      status: 'Pending'
    },
    {
      id: 6,
      patientName: 'Nolan Keith',
      patientAvatar: 'NK',
      recordType: 'Imaging',
      recordName: 'Cardiac CT Angiogram',
      date: '2025-11-13',
      doctorName: 'Dr. Emily Johnson',
      fileSize: '12.5 MB',
      format: 'DICOM',
      status: 'Available'
    },
    {
      id: 7,
      patientName: 'Tate Michael',
      patientAvatar: 'TM',
      recordType: 'Imaging',
      recordName: 'Chest X-Ray',
      date: '2025-11-12',
      doctorName: 'Dr. Michael Lee',
      fileSize: '4.1 MB',
      format: 'DICOM',
      status: 'Available'
    },
    {
      id: 8,
      patientName: 'Kim Dowry',
      patientAvatar: 'KD',
      recordType: 'Lab Report',
      recordName: 'Biopsy Results',
      date: '2025-11-11',
      doctorName: 'Dr. Daniel McAdams',
      fileSize: '1.8 MB',
      format: 'PDF',
      status: 'Available'
    },
  ], []);

  // Filter records
  const filteredRecords = useMemo(() => {
    let filtered = mockRecords;

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(record => 
        record.patientName.toLowerCase().includes(query) ||
        record.recordName.toLowerCase().includes(query) ||
        record.recordType.toLowerCase().includes(query)
      );
    }

    if (selectedType !== 'all') {
      filtered = filtered.filter(record => record.recordType === selectedType);
    }

    if (selectedDate !== 'all') {
      filtered = filtered.filter(record => record.date === selectedDate);
    }

    return filtered;
  }, [mockRecords, searchQuery, selectedType, selectedDate]);

  // Pagination
  const totalPages = Math.ceil(filteredRecords.length / rowsPerPage);
  const paginatedRecords = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return filteredRecords.slice(start, start + rowsPerPage);
  }, [filteredRecords, currentPage, rowsPerPage]);

  const getRecordTypeColor = (type) => {
    const colors = {
      'Lab Report': 'bg-blue-100 text-blue-700',
      'Imaging': 'bg-purple-100 text-purple-700',
      'Prescription': 'bg-green-100 text-green-700',
      'Progress Note': 'bg-yellow-100 text-yellow-700',
      'Procedure Report': 'bg-orange-100 text-orange-700',
      'Discharge Summary': 'bg-pink-100 text-pink-700',
    };
    return colors[type] || 'bg-gray-100 text-gray-700';
  };

  const getStatusColor = (status) => {
    const colors = {
      'Available': 'bg-green-100 text-green-700',
      'Pending': 'bg-yellow-100 text-yellow-700',
      'Processing': 'bg-blue-100 text-blue-700',
      'Archived': 'bg-gray-100 text-gray-700',
    };
    return colors[status] || 'bg-gray-100 text-gray-700';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Bar */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-20">
        <div className="px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-6 flex-1">
            <h1 className="text-xl font-semibold text-gray-900">Medical Records</h1>
            
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search patient, record name, or type..."
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
            <div className="w-9 h-9 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-semibold cursor-pointer">
              A
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-8 py-6">
        {/* Filters and Actions */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors flex items-center gap-2">
              <Upload className="w-4 h-4" />
              Upload Record
            </button>
            
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="all">All Types</option>
              <option value="Lab Report">Lab Report</option>
              <option value="Imaging">Imaging</option>
              <option value="Prescription">Prescription</option>
              <option value="Progress Note">Progress Note</option>
              <option value="Procedure Report">Procedure Report</option>
            </select>

            <select
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="all">All Dates</option>
              <option value="2025-11-18">Nov 18, 2025</option>
              <option value="2025-11-17">Nov 17, 2025</option>
              <option value="2025-11-16">Nov 16, 2025</option>
              <option value="2025-11-15">Nov 15, 2025</option>
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

        {/* Records Table */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Patient
                  </th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Record Name
                  </th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Doctor
                  </th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    File Info
                  </th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {paginatedRecords.map((record) => (
                  <tr key={record.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-semibold flex-shrink-0">
                          {record.patientAvatar}
                        </div>
                        <p className="text-sm font-medium text-gray-900">{record.patientName}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-gray-400" />
                        <p className="text-sm font-medium text-gray-900">{record.recordName}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getRecordTypeColor(record.recordType)}`}>
                        {record.recordType}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-gray-900">
                        {new Date(record.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-gray-900">{record.doctorName}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-xs text-gray-500">{record.format}</p>
                      <p className="text-xs text-gray-400">{record.fileSize}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(record.status)}`}>
                        {record.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => {
                            setSelectedRecord(record);
                            setShowDocumentPopup(true);
                          }}
                          className="p-1.5 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-1.5 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors">
                          <Download className="w-4 h-4" />
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
            <div className="text-sm text-gray-600">
              Showing {((currentPage - 1) * rowsPerPage) + 1} to {Math.min(currentPage * rowsPerPage, filteredRecords.length)} of {filteredRecords.length} records
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

      {/* Document Popup Modal */}
      {showDocumentPopup && selectedRecord && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">{selectedRecord.recordName}</h2>
                <p className="text-sm text-gray-500 mt-0.5">{selectedRecord.patientName} • {selectedRecord.recordType}</p>
              </div>
              <button
                onClick={() => {
                  setShowDocumentPopup(false);
                  setSelectedRecord(null);
                }}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
              <DocumentPopUp record={selectedRecord} />
            </div>
            
            <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between bg-gray-50">
              <div className="text-sm text-gray-600">
                <span className="font-medium">{selectedRecord.format}</span> • {selectedRecord.fileSize} • {selectedRecord.doctorName}
              </div>
              <div className="flex gap-2">
                <button className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  Download
                </button>
                <button className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors">
                  Print
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default RecordsPage;
