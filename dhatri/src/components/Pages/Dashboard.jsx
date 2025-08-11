import { FaUserMd, FaCalendarCheck, FaHeartbeat, FaNotesMedical, FaUserInjured } from "react-icons/fa";

function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-blue-900">Healthcare Dashboard</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
          + New Appointment
        </button>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card icon={<FaUserInjured size={30} />} title="Patients" value="245" color="bg-green-500" />
        <Card icon={<FaUserMd size={30} />} title="Doctors" value="32" color="bg-blue-500" />
        <Card icon={<FaCalendarCheck size={30} />} title="Appointments" value="58" color="bg-purple-500" />
        <Card icon={<FaHeartbeat size={30} />} title="Critical Cases" value="5" color="bg-red-500" />
      </div>

      {/* Upcoming Appointments */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Upcoming Appointments</h2>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="p-3 text-left">Patient</th>
              <th className="p-3 text-left">Doctor</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {[
              { patient: "John Doe", doctor: "Dr. Smith", date: "Aug 12, 2025", status: "Confirmed" },
              { patient: "Sarah Lee", doctor: "Dr. Brown", date: "Aug 14, 2025", status: "Pending" },
              { patient: "Michael Chen", doctor: "Dr. Davis", date: "Aug 15, 2025", status: "Confirmed" },
            ].map((appt, i) => (
              <tr key={i} className="border-b hover:bg-gray-50">
                <td className="p-3">{appt.patient}</td>
                <td className="p-3">{appt.doctor}</td>
                <td className="p-3">{appt.date}</td>
                <td className={`p-3 font-semibold ${appt.status === "Confirmed" ? "text-green-600" : "text-yellow-500"}`}>
                  {appt.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const Card = ({ icon, title, value, color }) => (
  <div className="bg-white rounded-lg shadow-md p-6 flex items-center space-x-4">
    <div className={`${color} text-white p-3 rounded-full`}>
      {icon}
    </div>
    <div>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  </div>
);

export default Dashboard;
