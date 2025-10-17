import { createContext, useContext, useEffect, useState } from "react";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [patients, setPatients] = useState([]);

  const fetchPatients = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/patients/getAll");
      if (!response.ok) throw new Error("Failed to fetch patients");
      const data = await response.json();
      const filteredData = Array.isArray(data)
        ? data.filter(p => p.role === "patient")
        : [];
      setPatients(filteredData);
    } catch (error) {
      console.error("Error fetching patients:", error);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []); 

  return (
    <DataContext.Provider value={{ patients, refreshPatients: fetchPatients }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
