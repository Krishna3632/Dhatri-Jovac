import React, { useState } from 'react';
import { User, Phone, Mail, MapPin, Stethoscope, Calendar, Clock, Star, Plus, Search, Filter, Edit, Trash2, Award, BookOpen, Users } from 'lucide-react';

const DoctorsPage = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [loader, setLoader] = useState(false);
  // Sample doctors data
  const [doctors, setDoctors] = useState([
    {
      id: 1,
      name: 'Dr. Sarah Wilson',
      specialty: 'Cardiology',
      department: 'Cardiology',
      email: 'sarah.wilson@dhatri.com',
      phone: '+1 234-567-8901',
      experience: '15 years',
      education: 'MD from Harvard Medical School',
      rating: 4.9,
      totalPatients: 1250,
      availability: 'Mon-Fri 9:00 AM - 5:00 PM',
      languages: ['English', 'Spanish'],
      bio: 'Specialized in interventional cardiology with extensive experience in cardiac catheterization and angioplasty procedures.',
      image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face',
      status: 'available',
      consultationFee: '$200',
      nextAvailable: '2025-08-10 10:00 AM'
    },
    {
      id: 2,
      name: 'Dr. Michael Chen',
      specialty: 'Dermatology',
      department: 'Dermatology',
      email: 'michael.chen@dhatri.com',
      phone: '+1 234-567-8902',
      experience: '12 years',
      education: 'MD from Johns Hopkins University',
      rating: 4.8,
      totalPatients: 980,
      availability: 'Tue-Sat 8:00 AM - 4:00 PM',
      languages: ['English', 'Mandarin'],
      bio: 'Expert in cosmetic dermatology and skin cancer treatment with a focus on minimally invasive procedures.',
      image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=face',
      status: 'available',
      consultationFee: '$180',
      nextAvailable: '2025-08-11 2:30 PM'
    },
    {
      id: 3,
      name: 'Dr. Emily Davis',
      specialty: 'Orthopedics',
      department: 'Orthopedics',
      email: 'emily.davis@dhatri.com',
      phone: '+1 234-567-8903',
      experience: '18 years',
      education: 'MD from Stanford University',
      rating: 4.9,
      totalPatients: 1450,
      availability: 'Mon-Thu 7:00 AM - 3:00 PM',
      languages: ['English', 'French'],
      bio: 'Orthopedic surgeon specializing in joint replacement and sports medicine injuries.',
      image: 'https://images.unsplash.com/photo-1594824919066-d17ede8e2d24?w=400&h=400&fit=crop&crop=face',
      status: 'busy',
      consultationFee: '$250',
      nextAvailable: '2025-08-15 9:00 AM'
    },
    {
      id: 4,
      name: 'Dr. James Brown',
      specialty: 'Neurology',
      department: 'Neurology',
      email: 'james.brown@dhatri.com',
      phone: '+1 234-567-8904',
      experience: '20 years',
      education: 'MD from Mayo Clinic College of Medicine',
      rating: 4.7,
      totalPatients: 1100,
      availability: 'Wed-Fri 10:00 AM - 6:00 PM',
      languages: ['English'],
      bio: 'Neurologist with expertise in epilepsy treatment and neurodegenerative disorders.',
      image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&h=400&fit=crop&crop=face',
      status: 'available',
      consultationFee: '$220',
      nextAvailable: '2025-08-12 11:00 AM'
    },
    {
      id: 5,
      name: 'Dr. Lisa Anderson',
      specialty: 'Pediatrics',
      department: 'Pediatrics',
      email: 'lisa.anderson@dhatri.com',
      phone: '+1 234-567-8905',
      experience: '10 years',
      education: 'MD from University of California, San Francisco',
      rating: 4.9,
      totalPatients: 850,
      availability: 'Mon-Fri 8:00 AM - 5:00 PM',
      languages: ['English', 'Portuguese'],
      bio: 'Pediatrician specializing in child development and adolescent medicine.',
      image: 'https://images.unsplash.com/photo-1651008376811-b98baee60c1f?w=400&h=400&fit=crop&crop=face',
      status: 'on_leave',
      consultationFee: '$150',
      nextAvailable: '2025-08-20 9:00 AM'
    }
  ]);

  const [newDoctor, setNewDoctor] = useState({
    name: '',
    specialty: '',
    department: '',
    email: '',
    phone: '',
    experience: '',
    education: '',
    bio: '',
    languages: [],
    consultationFee: '',
    availability: ''
  });

  const departments = ['Cardiology', 'Dermatology', 'Orthopedics', 'Neurology', 'Pediatrics', 'Oncology', 'Psychiatry', 'General Medicine'];
  const languages = ['English', 'Spanish', 'French', 'Mandarin', 'Portuguese', 'German', 'Italian'];

  const getStatusColor = (status) => {
    switch (status) {
      case 'available': return 'bg-green-100 text-green-800';
      case 'busy': return 'bg-yellow-100 text-yellow-800';
      case 'on_leave': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'available': return 'Available';
      case 'busy': return 'Busy';
      case 'on_leave': return 'On Leave';
      default: return 'Unknown';
    }
  };

  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doctor.department.toLowerCase().includes(searchTerm.toLowerCase());
    
    switch (activeTab) {
      case 'available':
        return matchesSearch && doctor.status === 'available';
      case 'busy':
        return matchesSearch && doctor.status === 'busy';
      case 'on_leave':
        return matchesSearch && doctor.status === 'on_leave';
      case 'all':
      default:
        return matchesSearch;
    }
  });

  const handleAddDoctor = (e) => {
    e.preventDefault();
    const newId = Math.max(...doctors.map(d => d.id)) + 1;
    const doctorToAdd = {
      ...newDoctor,
      id: newId,
      rating: 0,
      totalPatients: 0,
      status: 'available',
      image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=face',
      nextAvailable: new Date().toISOString().slice(0, -8)
    };
    setDoctors([...doctors, doctorToAdd]);
    setNewDoctor({
      name: '',
      specialty: '',
      department: '',
      email: '',
      phone: '',
      experience: '',
      education: '',
      bio: '',
      languages: [],
      consultationFee: '',
      availability: ''
    });
    setShowAddForm(false);
  };

  const deleteDoctor = (id) => {
    setDoctors(doctors.filter(doc => doc.id !== id));
  };

  const updateDoctorStatus = (id, newStatus) => {
    setDoctors(doctors.map(doc => 
      doc.id === id ? { ...doc, status: newStatus } : doc
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Doctors</h1>
              <p className="text-gray-600 mt-1">Manage healthcare professionals and their information</p>
            </div>
            <button
              onClick={() => setShowAddForm(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors duration-200"
            >
              <Plus className="w-5 h-5" />
              Add Doctor
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
                placeholder="Search by doctor name, specialty, or department..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex gap-2">
              {['all', 'available', 'busy', 'on_leave'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-lg capitalize transition-colors duration-200 ${
                    activeTab === tab
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {tab.replace('_', ' ')}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Doctors Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredDoctors.length === 0 ? (
            <div className="col-span-full bg-white rounded-lg shadow-sm p-12 text-center">
              <User className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No doctors found</h3>
              <p className="text-gray-500">Try adjusting your search or add a new doctor.</p>
            </div>
          ) : (
            filteredDoctors.map((doctor) => (
              <div key={doctor.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
                <div className="p-6">
                  {/* Doctor Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-200">
                        <img 
                          src={doctor.image} 
                          alt={doctor.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{doctor.name}</h3>
                        <p className="text-blue-600 font-medium">{doctor.specialty}</p>
                        <div className="flex items-center gap-1 mt-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-sm text-gray-600">{doctor.rating}</span>
                        </div>
                      </div>
                    </div>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(doctor.status)}`}>
                      {getStatusText(doctor.status)}
                    </span>
                  </div>

                  {/* Doctor Details */}
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin className="w-4 h-4" />
                      {doctor.department}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Mail className="w-4 h-4" />
                      {doctor.email}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Phone className="w-4 h-4" />
                      {doctor.phone}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Award className="w-4 h-4" />
                      {doctor.experience} experience
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Users className="w-4 h-4" />
                      {doctor.totalPatients} patients treated
                    </div>
                  </div>

                  {/* Bio */}
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">{doctor.bio}</p>

                  {/* Languages */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {doctor.languages.map((lang) => (
                      <span key={lang} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                        {lang}
                      </span>
                    ))}
                  </div>

                  {/* Consultation Fee */}
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-sm text-gray-600">Consultation Fee:</span>
                    <span className="text-lg font-semibold text-blue-600">{doctor.consultationFee}</span>
                  </div>

                  {/* Next Available */}
                  {doctor.status === 'available' && (
                    <div className="bg-green-50 rounded-lg p-3 mb-4">
                      <div className="flex items-center gap-2 text-sm text-green-800">
                        <Clock className="w-4 h-4" />
                        Next available: {doctor.nextAvailable}
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex gap-2 pt-4 border-t border-gray-200">
                    <button
                      onClick={() => setSelectedDoctor(doctor)}
                      className="flex-1 bg-blue-50 hover:bg-blue-100 text-blue-700 px-3 py-2 rounded-md text-sm transition-colors duration-200"
                    >
                      View Profile
                    </button>
                    <div className="flex gap-1">
                      <select
                        value={doctor.status}
                        onChange={(e) => updateDoctorStatus(doctor.id, e.target.value)}
                        className="text-xs border border-gray-300 rounded px-2 py-1"
                      >
                        <option value="available">Available</option>
                        <option value="busy">Busy</option>
                        <option value="on_leave">On Leave</option>
                      </select>
                      <button
                        onClick={() => deleteDoctor(doctor.id)}
                        className="text-red-600 hover:text-red-800 p-1 transition-colors duration-200"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Add Doctor Form Modal */}
        {/* Add Doctor Form Modal */}
{showAddForm && (
  <div className="fixed inset-0 bg-opacity-0 flex items-center justify-center p-4 z-50">
    <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-2xl font-semibold text-gray-900">Add New Doctor</h2>
      </div>

      {/* ✅ Added form tag here */}
      <form onSubmit={handleAddDoctor} className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* All your input fields stay the same here */}
          <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Doctor Name *</label>
                    <input
                      type="text"
                      required
                    
                     
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  
        </div>

        <div className="flex justify-end gap-3 pt-6">
          <button
            type="button"
            onClick={() => setShowAddForm(false)}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
          >
            Add Doctor
          </button>
        </div>
      </form>
      {/* ✅ Closing form tag now matches */}
    </div>
  </div>
)}


        {/* Doctor Profile Modal */}
        {selectedDoctor && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-semibold text-gray-900">Doctor Profile</h2>
                  <button
                    onClick={() => setSelectedDoctor(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-200">
                    <img 
                      src={selectedDoctor.image} 
                      alt={selectedDoctor.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{selectedDoctor.name}</h3>
                    <p className="text-blue-600 font-medium">{selectedDoctor.specialty}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-600">{selectedDoctor.rating} rating</span>
                      <span className="text-gray-400">•</span>
                      <span className="text-sm text-gray-600">{selectedDoctor.totalPatients} patients</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Contact Information</h4>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        {selectedDoctor.email}
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4" />
                        {selectedDoctor.phone}
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Professional Details</h4>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <Award className="w-4 h-4" />
                        {selectedDoctor.experience} of experience
                      </div>
                      <div className="flex items-center gap-2">
                        <BookOpen className="w-4 h-4" />
                        {selectedDoctor.education}
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        {selectedDoctor.availability}
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Biography</h4>
                    <p className="text-sm text-gray-600">{selectedDoctor.bio}</p>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Languages</h4>
                    <div className="flex flex-wrap gap-1">
                      {selectedDoctor.languages.map((lang) => (
                        <span key={lang} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">
                          {lang}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-gray-900">Consultation Fee</span>
                      <span className="text-xl font-bold text-blue-600">{selectedDoctor.consultationFee}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorsPage;