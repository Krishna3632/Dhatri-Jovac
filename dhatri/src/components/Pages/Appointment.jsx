import React, { useState } from 'react';
import { Calendar, Clock, User, Phone, MapPin, Plus, Search, Filter, Edit, Trash2, CheckCircle, XCircle } from 'lucide-react';

const AppointmentsPage = () => {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Sample appointments data
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      patientName: 'John Doe',
      patientPhone: '+1 234-567-8901',
      doctor: 'Dr. Sarah Wilson',
      department: 'Cardiology',
      date: '2025-08-10',
      time: '10:00 AM',
      status: 'confirmed',
      type: 'Regular Checkup',
      notes: 'Follow-up appointment for blood pressure monitoring'
    },
    {
      id: 2,
      patientName: 'Jane Smith',
      patientPhone: '+1 234-567-8902',
      doctor: 'Dr. Michael Chen',
      department: 'Dermatology',
      date: '2025-08-11',
      time: '2:30 PM',
      status: 'pending',
      type: 'Consultation',
      notes: 'New patient consultation for skin condition'
    },
    {
      id: 3,
      patientName: 'Robert Johnson',
      patientPhone: '+1 234-567-8903',
      doctor: 'Dr. Emily Davis',
      department: 'Orthopedics',
      date: '2025-08-12',
      time: '9:15 AM',
      status: 'confirmed',
      type: 'Surgery Follow-up',
      notes: 'Post-surgery check for knee replacement'
    },
    {
      id: 4,
      patientName: 'Maria Garcia',
      patientPhone: '+1 234-567-8904',
      doctor: 'Dr. Sarah Wilson',
      department: 'Cardiology',
      date: '2025-08-05',
      time: '11:00 AM',
      status: 'completed',
      type: 'Regular Checkup',
      notes: 'Annual cardiac screening completed successfully'
    }
  ]);

  const [newAppointment, setNewAppointment] = useState({
    patientName: '',
    patientPhone: '',
    doctor: '',
    department: '',
    date: '',
    time: '',
    type: '',
    notes: ''
  });

  const doctors = [
    { name: 'Dr. Sarah Wilson', department: 'Cardiology' },
    { name: 'Dr. Michael Chen', department: 'Dermatology' },
    { name: 'Dr. Emily Davis', department: 'Orthopedics' },
    { name: 'Dr. James Brown', department: 'Neurology' },
    { name: 'Dr. Lisa Anderson', department: 'Pediatrics' }
  ];

  const appointmentTypes = ['Regular Checkup', 'Consultation', 'Emergency', 'Surgery Follow-up', 'Diagnostic Test'];

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'confirmed': return <CheckCircle className="w-4 h-4" />;
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      case 'cancelled': return <XCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const filteredAppointments = appointments.filter(appointment => {
    const matchesSearch = appointment.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         appointment.doctor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         appointment.department.toLowerCase().includes(searchTerm.toLowerCase());
    
    const today = new Date().toISOString().split('T')[0];
    
    switch (activeTab) {
      case 'upcoming':
        return matchesSearch && (appointment.status === 'confirmed' || appointment.status === 'pending') && appointment.date >= today;
      case 'past':
        return matchesSearch && (appointment.status === 'completed' || appointment.date < today);
      case 'pending':
        return matchesSearch && appointment.status === 'pending';
      case 'all':
      default:
        return matchesSearch;
    }
  });

  const handleBookAppointment = (e) => {
    e.preventDefault();
    const newId = Math.max(...appointments.map(a => a.id)) + 1;
    const appointmentToAdd = {
      ...newAppointment,
      id: newId,
      status: 'pending'
    };
    setAppointments([...appointments, appointmentToAdd]);
    setNewAppointment({
      patientName: '',
      patientPhone: '',
      doctor: '',
      department: '',
      date: '',
      time: '',
      type: '',
      notes: ''
    });
    setShowBookingForm(false);
  };

  const updateAppointmentStatus = (id, newStatus) => {
    setAppointments(appointments.map(apt => 
      apt.id === id ? { ...apt, status: newStatus } : apt
    ));
  };

  const deleteAppointment = (id) => {
    setAppointments(appointments.filter(apt => apt.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Appointments</h1>
              <p className="text-gray-600 mt-1">Manage and schedule patient appointments</p>
            </div>
            <button
              onClick={() => setShowBookingForm(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors duration-200"
            >
              <Plus className="w-5 h-5" />
              Book Appointment
            </button>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by patient name, doctor, or department..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex gap-2">
              {['all', 'upcoming', 'pending', 'past'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-lg capitalize transition-colors duration-200 ${
                    activeTab === tab
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Appointments List */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">
              {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Appointments ({filteredAppointments.length})
            </h2>
          </div>
          
          <div className="divide-y divide-gray-200">
            {filteredAppointments.length === 0 ? (
              <div className="p-12 text-center">
                <Calendar className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No appointments found</h3>
                <p className="text-gray-500">Try adjusting your search or book a new appointment.</p>
              </div>
            ) : (
              filteredAppointments.map((appointment) => (
                <div key={appointment.id} className="p-6 hover:bg-gray-50 transition-colors duration-200">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{appointment.patientName}</h3>
                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                          {getStatusIcon(appointment.status)}
                          {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4" />
                          {appointment.doctor}
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          {appointment.department}
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4" />
                          {appointment.patientPhone}
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          {new Date(appointment.date).toLocaleDateString()}
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          {appointment.time}
                        </div>
                        <div className="text-blue-600 font-medium">
                          {appointment.type}
                        </div>
                      </div>
                      
                      {appointment.notes && (
                        <p className="mt-2 text-sm text-gray-500 italic">{appointment.notes}</p>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {appointment.status === 'pending' && (
                        <>
                          <button
                            onClick={() => updateAppointmentStatus(appointment.id, 'confirmed')}
                            className="bg-green-100 hover:bg-green-200 text-green-700 px-3 py-1 rounded-md text-sm transition-colors duration-200"
                          >
                            Confirm
                          </button>
                          <button
                            onClick={() => updateAppointmentStatus(appointment.id, 'cancelled')}
                            className="bg-red-100 hover:bg-red-200 text-red-700 px-3 py-1 rounded-md text-sm transition-colors duration-200"
                          >
                            Cancel
                          </button>
                        </>
                      )}
                      {appointment.status === 'confirmed' && (
                        <button
                          onClick={() => updateAppointmentStatus(appointment.id, 'completed')}
                          className="bg-blue-100 hover:bg-blue-200 text-blue-700 px-3 py-1 rounded-md text-sm transition-colors duration-200"
                        >
                          Mark Complete
                        </button>
                      )}
                      <button
                        onClick={() => deleteAppointment(appointment.id)}
                        className="text-red-600 hover:text-red-800 p-1 transition-colors duration-200"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Booking Form Modal */}
        {showBookingForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-2xl font-semibold text-gray-900">Book New Appointment</h2>
              </div>
              
              <form onSubmit={handleBookAppointment} className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Patient Name *</label>
                    <input
                      type="text"
                      required
                      value={newAppointment.patientName}
                      onChange={(e) => setNewAppointment({...newAppointment, patientName: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      value={newAppointment.patientPhone}
                      onChange={(e) => setNewAppointment({...newAppointment, patientPhone: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Doctor *</label>
                    <select
                      required
                      value={newAppointment.doctor}
                      onChange={(e) => {
                        const selectedDoctor = doctors.find(d => d.name === e.target.value);
                        setNewAppointment({
                          ...newAppointment, 
                          doctor: e.target.value,
                          department: selectedDoctor ? selectedDoctor.department : ''
                        });
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select Doctor</option>
                      {doctors.map((doctor) => (
                        <option key={doctor.name} value={doctor.name}>
                          {doctor.name} - {doctor.department}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                    <input
                      type="text"
                      value={newAppointment.department}
                      onChange={(e) => setNewAppointment({...newAppointment, department: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      readOnly
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Date *</label>
                    <input
                      type="date"
                      required
                      value={newAppointment.date}
                      onChange={(e) => setNewAppointment({...newAppointment, date: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Time *</label>
                    <input
                      type="time"
                      required
                      value={newAppointment.time}
                      onChange={(e) => setNewAppointment({...newAppointment, time: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Appointment Type *</label>
                    <select
                      required
                      value={newAppointment.type}
                      onChange={(e) => setNewAppointment({...newAppointment, type: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select Appointment Type</option>
                      {appointmentTypes.map((type) => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
                    <textarea
                      rows={3}
                      value={newAppointment.notes}
                      onChange={(e) => setNewAppointment({...newAppointment, notes: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Additional notes or special instructions..."
                    />
                  </div>
                </div>
                
                <div className="flex justify-end gap-3 pt-6">
                  <button
                    type="button"
                    onClick={() => setShowBookingForm(false)}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
                  >
                    Book Appointment
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AppointmentsPage;