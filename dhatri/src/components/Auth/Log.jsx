import React, { useEffect, useState } from "react";
import AnimatedLoader from "../UI/LoadingSpinner";
import axios from "axios";
import checkToken from "../../utils/checkToken";
function Log() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [redirecting, setRedirecting] = useState(false);

useEffect(() => {
  document.title = "Login - Dhatri";

  const verifyToken = async () => {
    const data = await checkToken();
    if (!data.error) {
      setRedirecting(true); // show redirect loader
      setTimeout(() => {
        window.location.href = "/doctors";
      }, 1500); // show loader for 1.5s
    }
  };

  verifyToken();
}, []);


  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const res = await fetch(`http://localhost:5000/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      const data = await res.json();

      setLoading(false);

      if (res.ok) {
        localStorage.setItem("token", data.token);
        setRedirecting(true);

        setTimeout(() => {
          window.location.href = "/doctors";
        }, 2000);
      } else {
        alert(data.message || "Login failed");
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
      alert("Something went wrong");
    }
  };
  
  // if (loading) {
  //   return <AnimatedLoader state="loading" />;
  // }

  // if (redirecting) {
  //   return <AnimatedLoader state="redirecting" />;
  // }

return (
  <div className="relative min-h-screen">
    <form
      onSubmit={handleSubmit}
      className="flex flex-col w-80 mx-auto mt-20 gap-4"
    >
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="border p-2 rounded"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className="border p-2 rounded"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        Login
      </button>
    </form>

   
{(loading || redirecting) && (
  <div className="fixed inset-0 backdrop-blur-sm bg-opacity-50 flex items-center justify-center z-50">
    <AnimatedLoader 
      state={loading ? "loading" : "redirecting"} 
      pagename={loading ? "Login" : "Doctors"} 
    />
  </div>
)}

  </div>
);
}



export default Log;