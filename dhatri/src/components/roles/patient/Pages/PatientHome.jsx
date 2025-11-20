import { useState, useEffect, useCallback, useMemo } from "react";
import { useAuth } from "../../../../context/AuthContext";
import { toast } from "react-toastify";
import { 
  Search, 
  MapPin, 
  Star, 
  Clock, 
  Calendar, 
  Award,
  Heart,
  Activity,
  AlertCircle,
  CheckCircle,
  X,
  Filter,
  ChevronRight,
  User,
  Stethoscope,
  Bell,
  Settings
} from "lucide-react";

const PatientHome = () => {
  const { user, apiRequest } = useAuth();
  const [doctors, setDoctors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("all");
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [loading, setLoading] = useState(true);
  const [bookingModal, setBookingModal] = useState(null);
  const [bookingForm, setBookingForm] = useState({
    date: "",
    time: "",
    reason: "",
  });
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);
  const [activeTab, setActiveTab] = useState("find-doctors");

  const specialties = [
    "all",
    "Cardiology",
    "Dermatology",
    "Neurology",
    "Pediatrics",
    "Orthopedics",
    "General Medicine",
    "Psychiatry",
    "ENT",
  ];

  const locations = [
    "all",
    "Downtown Medical Center",
    "City General Hospital",
    "Northside Clinic",
    "Westside Medical Plaza",
    "Eastside Health Center",
  ];

  // Mock upcoming appointments
  const mockAppointments = useMemo(() => [
    {
      id: 1,
      doctorName: "Dr. Sarah Williams",
      specialty: "Cardiology",
      date: "2025-11-22",
      time: "10:00 AM",
      location: "Downtown Medical Center",
      status: "Confirmed"
    },
    {
      id: 2,
      doctorName: "Dr. Michael Lee",
      specialty: "General Medicine",
      date: "2025-11-25",
      time: "02:00 PM",
      location: "City General Hospital",
      status: "Pending"
    }
  ], []);

  const fetchDoctors = useCallback(async () => {
    try {
      setLoading(true);
      const response = await apiRequest("/doctors");
      
      if (response.ok) {
        const data = await response.json();
        const doctorsList = data.doctors || data.data || [];
        
        // Add mock data to enhance doctors list
        const enhancedDoctors = doctorsList.map((doctor, idx) => ({
          ...doctor,
          rating: (4 + Math.random()).toFixed(1),
          reviews: Math.floor(Math.random() * 200) + 50,
          availability: idx % 3 === 0 ? "Available Today" : "Available Tomorrow",
          consultationFee: `$${(50 + Math.random() * 150).toFixed(0)}`
        }));
        
        setDoctors(enhancedDoctors);
      } else {
        toast.error("Failed to fetch doctors");
      }
    } catch (error) {
      console.error("Error fetching doctors:", error);
      toast.error("Error loading doctors");
    } finally {
      setLoading(false);
    }
  }, [apiRequest]);

  const fetchAppointments = useCallback(async () => {
    try {
      const response = await apiRequest("/appointments");
      if (response.ok) {
        const data = await response.json();
        setUpcomingAppointments(data.appointments || mockAppointments);
      } else {
        setUpcomingAppointments(mockAppointments);
      }
    } catch (error) {
      console.error("Error fetching appointments:", error);
      setUpcomingAppointments(mockAppointments);
    }
  }, [apiRequest, mockAppointments]);

  const filteredDoctors = useMemo(() => {
    let filtered = [...doctors];

    if (searchTerm) {
      const query = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (doctor) =>
          doctor.name?.toLowerCase().includes(query) ||
          doctor.specialty?.toLowerCase().includes(query) ||
          doctor.location?.toLowerCase().includes(query)
      );
    }

    if (selectedSpecialty !== "all") {
      filtered = filtered.filter(
        (doctor) => doctor.specialty === selectedSpecialty
      );
    }

    if (selectedLocation !== "all") {
      filtered = filtered.filter(
        (doctor) => doctor.location === selectedLocation
      );
    }

    return filtered;
  }, [doctors, searchTerm, selectedSpecialty, selectedLocation]);

  useEffect(() => {
    fetchDoctors();
    fetchAppointments();
  }, [fetchDoctors, fetchAppointments]);

  const handleBookAppointment = (doctor) => {
    setBookingModal(doctor);
    setBookingForm({
      date: "",
      time: "",
      reason: "",
    });
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();

    if (!bookingForm.date || !bookingForm.time || !bookingForm.reason) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      const response = await apiRequest("/appointments", {
        method: "POST",
        body: JSON.stringify({
          doctorId: bookingModal._id,
          patientId: user._id,
          date: bookingForm.date,
          time: bookingForm.time,
          reason: bookingForm.reason,
        }),
      });

      if (response.ok) {
        toast.success("Appointment booked successfully!");
        setBookingModal(null);
        setBookingForm({ date: "", time: "", reason: "" });
        fetchAppointments();
      } else {
        const data = await response.json();
        toast.error(data.message || "Failed to book appointment");
      }
    } catch (error) {
      console.error("Error booking appointment:", error);
      toast.error("Error booking appointment");
    }
  };

  const getMinDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 pb-20">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-600 to-green-600 text-white py-8 px-4 shadow-lg">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">
            Welcome back, {user?.name}! 👋
          </h1>
          <p className="text-blue-100">Find and book appointments with top doctors</p>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Search Bar */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search by name, specialty, or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <svg
                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>

            {/* Specialty Filter */}
            <div>
              <select
                value={selectedSpecialty}
                onChange={(e) => setSelectedSpecialty(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {specialties.map((specialty) => (
                  <option key={specialty} value={specialty}>
                    {specialty === "all"
                      ? "All Specialties"
                      : specialty}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-4 text-sm text-gray-600">
            {loading ? (
              "Loading doctors..."
            ) : (
              `Found ${filteredDoctors.length} doctor${
                filteredDoctors.length !== 1 ? "s" : ""
              }`
            )}
          </div>
        </div>

        {/* Doctors Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600"></div>
          </div>
        ) : filteredDoctors.length === 0 ? (
          <div className="text-center py-20">
            <svg
              className="mx-auto h-24 w-24 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="mt-4 text-xl font-medium text-gray-900">
              No doctors found
            </h3>
            <p className="mt-2 text-gray-500">
              Try adjusting your search criteria
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDoctors.map((doctor) => (
              <div
                key={doctor._id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all transform hover:-translate-y-1"
              >
                {/* Doctor Image */}
                <div className="h-48 bg-gradient-to-br from-blue-400 to-green-400 flex items-center justify-center">
                  <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center">
                    <svg
                      className="w-20 h-20 text-blue-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>

                {/* Doctor Info */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Dr. {doctor.name}
                  </h3>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-gray-600">
                      <svg
                        className="w-5 h-5 mr-2 text-blue-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                      <span className="text-sm">
                        {doctor.specialty || "General Medicine"}
                      </span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <svg
                        className="w-5 h-5 mr-2 text-green-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      <span className="text-sm">
                        {doctor.location || "City Hospital"}
                      </span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <svg
                        className="w-5 h-5 mr-2 text-yellow-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="text-sm">
                        {doctor.experience || "10"} years experience
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleBookAppointment(doctor)}
                    className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-green-600 text-white font-bold rounded-lg hover:from-blue-700 hover:to-green-700 transition-all transform hover:scale-[1.02]"
                  >
                    Book Appointment
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Booking Modal */}
      {bookingModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Book Appointment
              </h2>
              <button
                onClick={() => setBookingModal(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="mb-6 p-4 bg-blue-50 rounded-lg">
              <h3 className="font-semibold text-gray-900">
                Dr. {bookingModal.name}
              </h3>
              <p className="text-sm text-gray-600">
                {bookingModal.specialty || "General Medicine"}
              </p>
            </div>

            <form onSubmit={handleBookingSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Appointment Date
                </label>
                <input
                  type="date"
                  min={getMinDate()}
                  value={bookingForm.date}
                  onChange={(e) =>
                    setBookingForm({ ...bookingForm, date: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Preferred Time
                </label>
                <select
                  value={bookingForm.time}
                  onChange={(e) =>
                    setBookingForm({ ...bookingForm, time: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select time</option>
                  <option value="09:00">09:00 AM</option>
                  <option value="10:00">10:00 AM</option>
                  <option value="11:00">11:00 AM</option>
                  <option value="12:00">12:00 PM</option>
                  <option value="14:00">02:00 PM</option>
                  <option value="15:00">03:00 PM</option>
                  <option value="16:00">04:00 PM</option>
                  <option value="17:00">05:00 PM</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Reason for Visit
                </label>
                <textarea
                  value={bookingForm.reason}
                  onChange={(e) =>
                    setBookingForm({ ...bookingForm, reason: e.target.value })
                  }
                  rows="4"
                  placeholder="Describe your symptoms or reason for consultation..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  required
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setBookingModal(null)}
                  className="flex-1 py-3 px-4 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 px-4 bg-gradient-to-r from-blue-600 to-green-600 text-white font-bold rounded-lg hover:from-blue-700 hover:to-green-700 transition-all"
                >
                  Confirm Booking
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientHome;
