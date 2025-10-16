import { createContext, useContext, useEffect, useState } from "react";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const [patients, setPatients] = useState([]);
        const fetchPatients = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/patients/getAll");
            const data = await response.json();
            setPatients(data);
        } catch (error) {
            console.error("Error fetching patients:", error);
        }
        };
    useEffect(() => {


        fetchPatients();
    }, [children]);

    return (
        <DataContext.Provider value={{ patients ,refreshPatients: fetchPatients}}>
            {children}
        </DataContext.Provider>
    );
};

export const useData = () => {
    return useContext(DataContext);
};
