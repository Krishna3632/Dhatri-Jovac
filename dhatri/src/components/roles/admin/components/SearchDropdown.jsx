import React from 'react';
import { User } from 'lucide-react';

function SearchDropdown({ query, onClose }) {
  // Mock search results
  const mockResults = [
    { id: 1, name: 'Dia Hemphery', mrn: 'MRN: 87256321', ssn: 'SSN: 3572789745', type: 'patient' },
    { id: 2, name: 'Diana Robinson', mrn: 'MRN: 3498712', ssn: 'SSN: 6487789945', type: 'patient' },
    { id: 3, name: 'Diane Kemp', mrn: 'MRN: 7677457', ssn: 'SSN: 784574587', type: 'patient' },
    { id: 4, name: 'Diandre Keith', mrn: 'MRN: 5465856', ssn: 'SSN: 877845124', type: 'patient' },
    { id: 5, name: 'Dianore Bean', mrn: 'MRN: 4578567', ssn: 'SSN: 954786138', type: 'patient' },
  ];

  const filteredResults = mockResults.filter(result => 
    result.name.toLowerCase().includes(query.toLowerCase()) ||
    result.mrn.toLowerCase().includes(query.toLowerCase()) ||
    result.ssn.toLowerCase().includes(query.toLowerCase())
  );

  if (filteredResults.length === 0) {
    return (
      <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg p-4 text-sm text-gray-500">
        No results found
      </div>
    );
  }

  return (
    <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden z-50">
      <div className="max-h-96 overflow-y-auto">
        {filteredResults.map((result) => (
          <div
            key={result.id}
            onClick={onClose}
            className="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                <User className="w-4 h-4 text-purple-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{result.name}</p>
                <p className="text-xs text-gray-500 truncate">
                  {result.mrn} • {result.ssn}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchDropdown;
