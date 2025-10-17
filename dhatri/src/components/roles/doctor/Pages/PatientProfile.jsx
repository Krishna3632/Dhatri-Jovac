import React, { useState , useEffect } from 'react';
import { useParams } from 'react-router-dom';
// import { toast } from 'react-toastify';
// --- SVG Icons ---

const IconUser = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle>
  </svg>
);

const IconCalendar = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect><line x1="16" x2="16" y1="2" y2="6"></line><line x1="8" x2="8" y1="2" y2="6"></line><line x1="3" x2="21" y1="10" y2="10"></line>
  </svg>
);

const IconPhone = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
  </svg>
);

const IconMail = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline>
  </svg>
);

const IconHeart = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
  </svg>
);

const IconActivity = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="22,12 18,12 15,21 9,3 6,12 2,12"></polyline>
  </svg>
);

const IconFileText = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"></path>
  </svg>
);

const IconMapPin = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle>
  </svg>
);

const IconEdit = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
  </svg>
);

export default function UserProfile() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('overview');
  const [patientData,setPatientData] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:5000/api/patients/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setPatientData(data);
        console.log(data);
      }
      )
      .catch((error) => console.error("Error fetching patient data:", error));
  }, [id]);

  const patient = patientData;

  const vitals = [
    { label: "Blood Pressure", value: "120/80", status: "normal", color: "text-green-600" },
    { label: "Heart Rate", value: "72 bpm", status: "normal", color: "text-green-600" },
    { label: "Temperature", value: "98.6°F", status: "normal", color: "text-green-600" },
    { label: "Oxygen Saturation", value: "98%", status: "normal", color: "text-green-600" },
  ];

  const [recentAppointments, setRecentAppointments] = useState([]);

  const [medications, setMedications] = useState([]);
  // const [medicalHistory, setMedicalHistory] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/api/patients/medications/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setMedications(data);
        console.log(data);
      })
      .catch((error) => console.error("Error fetching medications:", error));
  }, [id]);

  medications['prescribedBy'] = async function getDoctorName(doctorId) {
    try {
      const response = await fetch(`http://localhost:5000/api/doctors/${doctorId}`);
      const doctor = await response.json();
      return doctor.name;
    } catch (error) {
      console.error("Error fetching doctor name:", error);
      return "Unknown Doctor";
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: IconUser },
    { id: 'appointments', label: 'Appointments', icon: IconCalendar },
    { id: 'medications', label: 'Medications', icon: IconHeart },
    { id: 'history', label: 'Medical History', icon: IconFileText },
  ];

  return (
    <div className="ml-20 p-6 bg-gray-50/50 min-h-screen">
      {/* Header */}
      <header className="mb-8 flex justify-between items-start">
        <div className="flex items-center space-x-6">
          <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
            <IconUser className="w-10 h-10 text-blue-600" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-gray-800">{patient.name}</h1>
            <p className="text-gray-500">Patient ID: #{id}</p>
            <div className="flex items-center space-x-4 mt-2">  
              <span className="text-sm text-gray-600">{patient.age} years old</span>
              <span className="text-sm text-gray-600">•</span>
              <span className="text-sm text-gray-600">{patient.gender}</span>
              <span className="text-sm text-gray-600">•</span>
              <span className="text-sm text-gray-600">Blood Type: {patient.bloodType}</span>
            </div>
          </div>
        </div>

      </header>

      {/* Contact Information Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-all">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <IconPhone className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Phone</p>
              <p className="font-semibold text-gray-800">{patient.phoneNumber}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-all">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-50 rounded-lg">
              <IconMail className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Email</p>
              <p className="font-semibold text-gray-800">{patient.email}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-all">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-purple-50 rounded-lg">
              <IconMapPin className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Address</p>
              <p className="font-semibold text-gray-800 text-sm">{patient.address}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="mb-6">
        <div className="flex space-x-1 bg-white p-1 rounded-lg shadow-md w-fit">
          {tabs.map((tab) => {
            const IconComponent = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                }`}
              >
                <IconComponent className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {activeTab === 'overview' && (
          <>
            {/* Patient Details */}
            <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-semibold text-gray-800 mb-6">Patient Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">Date of Birth</label>
                    <p className="text-gray-800 font-semibold">{patient.dateOfBirth}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Height</label>
                    <p className="text-gray-800 font-semibold">{patient.height}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Weight</label>
                    <p className="text-gray-800 font-semibold">{patient.weight}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">Emergency Contact</label>
                    <p className="text-gray-800 font-semibold">{patient.emergencyContact}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Blood Type</label>
                    <p className="text-gray-800 font-semibold">{patient.bloodType}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Vital Signs */}
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-semibold text-gray-800 mb-6">Latest Vitals</h3>
              <div className="space-y-4">
                {vitals.map((vital, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="text-sm text-gray-600">{vital.label}</p>
                      <p className={`font-semibold ${vital.color}`}>{vital.value}</p>
                    </div>
                    <IconActivity className={`w-4 h-4 ${vital.color}`} />
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {activeTab === 'appointments' && (
          <div className="lg:col-span-3 bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">Appointment History</h3>
            <div className="space-y-4">
              {recentAppointments.map((appointment, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className="p-2 bg-blue-50 rounded-lg">
                      <IconCalendar className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">{appointment.type}</p>
                      <p className="text-sm text-gray-600">{appointment.doctor} • {appointment.date}</p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    appointment.status === 'Completed' 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-blue-100 text-blue-700'
                  }`}>
                    {appointment.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'medications' && (
          <div className="lg:col-span-3 bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">Current Medications</h3>
            <div className="space-y-4">
              {medications.map((medication, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="p-2 bg-red-50 rounded-lg">
                      <IconHeart className="w-5 h-5 text-red-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">{medication.medicationName}</p>
                      <p className="text-sm text-gray-600">{medication.dosage} • {medication.frequency}</p>
                      <p className="text-xs text-gray-500">Prescribed by {medication.prescribedBy}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'history' && (
          <div className="lg:col-span-3 bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">Medical History</h3>
            <div className="space-y-4">
              {medicalHistory.map((condition, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="p-2 bg-orange-50 rounded-lg">
                      <IconFileText className="w-5 h-5 text-orange-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">{condition.condition}</p>
                      <p className="text-sm text-gray-600">Diagnosed: {condition.diagnosedDate}</p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    condition.status === 'Ongoing' 
                      ? 'bg-red-100 text-red-700' 
                      : condition.status === 'Managed'
                      ? 'bg-yellow-100 text-yellow-700'
                      : 'bg-blue-100 text-blue-700'
                  }`}>
                    {condition.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}