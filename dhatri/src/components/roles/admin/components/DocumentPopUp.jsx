import React from 'react';
import { FileText, Calendar, User, Clock, CheckCircle } from 'lucide-react';

function DocumentPopUp({ record }) {
  if (!record) return null;

  return (
    <div className="space-y-6">
      {/* Document Preview Area */}
      <div className="bg-gray-50 rounded-xl border-2 border-dashed border-gray-300 p-12 flex flex-col items-center justify-center min-h-[400px]">
        <FileText className="w-20 h-20 text-gray-400 mb-4" />
        <p className="text-lg font-semibold text-gray-900 mb-2">{record.recordName}</p>
        <p className="text-sm text-gray-500 mb-4">{record.format} Document • {record.fileSize}</p>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors">
            Open Document
          </button>
          <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
            Preview
          </button>
        </div>
      </div>

      {/* Document Details */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
              <Calendar className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Date Created</p>
              <p className="text-sm font-semibold text-gray-900">
                {new Date(record.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
              <User className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Ordering Doctor</p>
              <p className="text-sm font-semibold text-gray-900">{record.doctorName}</p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Status</p>
              <p className="text-sm font-semibold text-gray-900">{record.status}</p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Record Type</p>
              <p className="text-sm font-semibold text-gray-900">{record.recordType}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Information */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="text-sm font-semibold text-blue-900 mb-2">Document Information</h3>
        <p className="text-sm text-blue-700">
          This medical record is securely stored and encrypted. Access is logged for compliance and security purposes.
          Any modifications to this document will be tracked in the audit log.
        </p>
      </div>
    </div>
  );
}

export default DocumentPopUp;