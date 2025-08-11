import React from "react";
import { Link } from "react-router-dom";
import '../index.css';

function NavBar() {
  return (

      <nav className="bg-white border-b-2 border-blue-100 top-0 left-0 w-full shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 gap-8">
            {/* Logo/Brand Section */}
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center ">
                {/* <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-3">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 2C5.58 2 2 5.58 2 10s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm1 11H9v-2h2v2zm0-4H9V5h2v4z" clipRule="evenodd" />
                  </svg>
                </div> */}
                <span className="text-2xl font-bold text-blue-800 justify-end">Dhatri</span>
                <span className="ml-2 text-sm text-gray-500 hidden sm:inline">Healthcare</span>
              </div>
            </div>

            {/* Navigation Links */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <Link 
                  to="/" 
                  className="text-gray-700 hover:text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                >
                  Home
                </Link>
                <Link 
                  to="/appointments" 
                  className="text-gray-700 hover:text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                >
                  Appointments
                </Link>
                <Link 
                  to="/patients" 
                  className="text-gray-700 hover:text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                >
                  Patients
                </Link>
                <Link 
                  to="/records" 
                  className="text-gray-700 hover:text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                >
                  Medical Records
                </Link>
                <Link 
                  to="/doctors" 
                  className="text-gray-700 hover:text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                >
                  Doctors
                </Link>
                <Link 
                  to="/about" 
                  className="text-gray-700 hover:text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                >
                  About
                </Link>
              </div>
            </div>

            {/* User Actions */}
            <div className="hidden md:block">
              <div className="ml-4 flex items-center md:ml-6 space-x-3">
                <Link
                   to="/login"
                >
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200">
                  Sign In
                </button>
                </Link>
                <Link
                   to="/signup"
                >
                <button className="border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200">
                  Register
                </button>
                </Link>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button className="text-gray-700 hover:text-blue-600 focus:outline-none focus:text-blue-600">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu (hidden by default) */}
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 bg-gray-50 border-t">
            <Link to="/" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md">Home</Link>
            <Link to="/appointments" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md">Appointments</Link>
            <Link to="/patients" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md">Patients</Link>
            <Link to="/records" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md">Medical Records</Link>
            <Link to="/doctors" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md">Doctors</Link>
            <Link to="/about" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md">About</Link>
            <div className="pt-3 border-t border-gray-200">
              <button className="block w-full text-left px-3 py-2 text-base font-medium bg-blue-600 text-white rounded-md mb-2">Sign In</button>
              <button className="block w-full text-left px-3 py-2 text-base font-medium border border-blue-600 text-blue-600 rounded-md">Register</button>
            </div>
          </div>
        </div>
      </nav>
    
  );
}

export default NavBar;