// src/components/Patient.jsx
import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
// const patients = await axios.get("http://localhost:5000/api/patients/getAll");
// const patients = [
//   {
//     id: 1,
//     name: "John Doe",
//     age: 32,
//     gender: "Male",
//     condition: "Diabetes",
//     lastVisit: "2025-07-15",
//   },
//   {
//     id: 2,
//     name: "Sarah Johnson",
//     age: 45,
//     gender: "Female",
//     condition: "Hypertension",
//     lastVisit: "2025-07-28",
//   },
//   {
//     id: 3,
//     name: "Michael Lee",
//     age: 29,
//     gender: "Male",
//     condition: "Asthma",
//     lastVisit: "2025-08-05",
//   },
// ];

function Patient() {
    const [patients, setPatients] = useState([]);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/patients/getAll");
        setPatients(res.data);
      } catch (err) {
        console.error("Error fetching patients:", err);
      }
    };

    fetchPatients();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Patients</h1>
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="w-full border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                Name
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                Age
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                Gender
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                Condition
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                Last Visit
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {patients.map((patient) => (
              <tr key={patient.id} className="border-t hover:bg-gray-50">
                <td className="px-6 py-4 text-sm">{patient.name}</td>
                {/* <td className="px-6 py-4 text-sm">{patient.age}</td> */}
                {/* <td className="px-6 py-4 text-sm">{patient.gender}</td> */}
                <td className="px-6 py-4 text-sm">condition</td>
                <td className="px-6 py-4 text-sm">lastVisit</td>
                <td className="px-6 py-4 text-sm">
                  <button className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 mr-2">
                    <Link to={`/patients/profile/${patient._id}`}>View</Link>
                  </button>
                  <button className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 mr-2">
                    <Link to={`/patients/edit/${patient._id}`}>Edit</Link>
                  </button>
                  <button className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600">
                    <Link to={`/patients/delete/${patient._id}`}>Delete</Link>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Patient;
