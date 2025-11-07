import { createContext, useContext, useEffect, useState } from "react";
// import checkToken  from "../utils/checkToken";
import checkToken from "../utils/checkToken";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            const isValid = await checkToken();
            if (!isValid) {
                setUser(null);
                return;
            }  

            try {
                const response = await fetch("http://localhost:5000/api/auth/getUser", {
                    credentials: "include",
                    method: "GET",
                });
                const data = await response.json();
                setUser(data.user);
            } catch (err) {
                console.error("Error fetching user:", err);
                setUser(null);
            }
        };

        fetchUser();
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
