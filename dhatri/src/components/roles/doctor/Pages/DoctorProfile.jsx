import React from 'react';
import { UserCircle, Mail, Phone, Edit } from 'lucide-react';

// You can fetch this data from an API in a real app
const doctorInfo = {
  name: 'Dr. Evelyn Reed',
  email: 'evelyn.reed@clinic.com',
  phone: '+1 (555) 123-4567',
  specialty: 'Cardiology',
  bio: 'Dr. Reed is a board-certified cardiologist with over 15 years of experience in treating cardiovascular diseases. She is dedicated to providing compassionate and comprehensive care to all her patients.',
};

function DoctorProfilePage() {
  return (
    <div className="bg-white p-8 rounded-lg shadow-md max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800">My Profile</h1>
        <button className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
          <Edit className="w-4 h-4 mr-2" />
          Edit Profile
        </button>
      </div>

      <div className="flex items-center space-x-6">
        <div className="flex-shrink-0">
          <UserCircle className="w-32 h-32 text-gray-300" />
        </div>
        <div className="flex-grow">
          <h2 className="text-2xl font-semibold text-gray-900">{doctorInfo.name}</h2>
          <p className="text-lg text-indigo-500">{doctorInfo.specialty}</p>
          <div className="mt-4 space-y-2 text-gray-600">
            <div className="flex items-center">
              <Mail className="w-5 h-5 mr-3 text-gray-400" />
              <span>{doctorInfo.email}</span>
            </div>
            <div className="flex items-center">
              <Phone className="w-5 h-5 mr-3 text-gray-400" />
              <span>{doctorInfo.phone}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-gray-200">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">About Me</h3>
        <p className="text-gray-600 leading-relaxed">{doctorInfo.bio}</p>
      </div>
    </div>
  );
}

export default DoctorProfilePage;