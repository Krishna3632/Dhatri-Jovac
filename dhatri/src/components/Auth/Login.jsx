import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import checkToken from "../../utils/checkToken";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("patient"); // Default role is 'patient'
  const [loading, setLoading] = useState(false);
  const [redirecting, setRedirecting] = useState(true); // Start with true to check token
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // On component mount, check if the user is already logged in
  useEffect(() => {
    document.title = "Login - Dhatri";

    const verifyTokenAndRedirect = async () => {
      const data = await checkToken();
      if (!data.error) {
        // If token is valid, redirect based on role
        const userRole = data.user.role;
        const redirectPath = userRole === "doctor" ? `/${userRole}/` : `/${userRole}/home`;
        setTimeout(() => navigate(redirectPath), 1500); // Show redirecting message briefly
      } else {
        // If no valid token, allow user to log in
        setRedirecting(false);
      }
    };

    verifyTokenAndRedirect();
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(""); // Reset previous errors

    try {
      const response = await fetch(`http://localhost:5000/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Send email, password, AND role to the backend
        credentials: true,
        body: JSON.stringify({ email, password, role }),
      });

      const data = await response.json();
      setLoading(false);

      if (response.ok) {
        // On successful login
        localStorage.setItem("token", data.token);
        setRedirecting(true);
        
        // Redirect based on role from the API response
        const userRole = data.user.role;
        const redirectPath = userRole === "doctor" ? `/${userRole}/home` : `/${userRole}/home`;
        
        setTimeout(() => navigate(redirectPath), 1500);
      } else {
        // On failed login
        setError(data.message || "Login failed. Please check your credentials.");
      }
    } catch (err) {
      setLoading(false);
      setError("Something went wrong. Please try again later.");
      console.error(err);
    }
  };



  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
          <p className="mt-2 text-sm text-gray-600">Please select your role</p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          {/* Role Selection */}
          <div className="flex justify-center space-x-4">
            <label className="flex items-center px-4 py-2 border rounded-md cursor-pointer">
              <input
                type="radio"
                name="role"
                value="patient"
                checked={role === "patient"}
                onChange={(e) => setRole(e.target.value)}
                className="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
              />
              <span className="ml-3 text-sm font-medium text-gray-700">Patient</span>
            </label>
            <label className="flex items-center px-4 py-2 border rounded-md cursor-pointer">
              <input
                type="radio"
                name="role"
                value="doctor"
                checked={role === "doctor"}
                onChange={(e) => setRole(e.target.value)}
                className="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
              />
              <span className="ml-3 text-sm font-medium text-gray-700">Doctor</span>
            </label>
          </div>

          {/* Input Fields */}
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <input
                id="email-address"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
            </div>
            <div>
              <input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>

          {/* Error Message */}
          {error && <p className="text-sm text-center text-red-600">{error}</p>}

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={loading}
              className="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md group hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400"
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </div>
        </form>
      </div>

      {/* Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-75 backdrop-blur-sm">
          <AnimatedLoader state="loading" pagename="Login" />
        </div>
      )}
    </div>
  );
}

export default Login;