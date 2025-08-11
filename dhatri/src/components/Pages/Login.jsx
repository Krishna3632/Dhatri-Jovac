import React from "react";
import { useNavigate } from "react-router-dom";

function Login({ setIsLoggedIn }) {
  const navigate = useNavigate();

  const handleLogin = () => {
    // TODO: Add actual authentication logic
    setIsLoggedIn(true);
    navigate("/home");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <input type="text" placeholder="Username" className="border p-2 mb-2" />
      <input type="password" placeholder="Password" className="border p-2 mb-4" />
      <button onClick={handleLogin} className="bg-blue-600 text-white px-4 py-2 rounded">Login</button>
    </div>
  );
}

export default Login;
