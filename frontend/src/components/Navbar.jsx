import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 backdrop-blur-md shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <i className="fas fa-graduation-cap text-white text-2xl mr-2"></i>
              <span className="text-white font-bold text-xl">Student Fee Manager</span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Link 
                  to="/students" 
                  className="text-white hover:text-gray-200 transition-all duration-300 ease-in-out"
                >
                  All Students
                </Link>
                <Link 
                  to="/profile" 
                  className="text-white hover:text-gray-200 transition-all duration-300 ease-in-out"
                >
                  Profile
                </Link>
                <button 
                  onClick={handleLogout}
                  className="bg-white bg-opacity-20 hover:bg-opacity-30 text-black px-4 py-2 rounded-lg transition-all duration-300 ease-in-out"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="text-white hover:text-gray-200 transition-all duration-300 ease-in-out"
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="bg-white text-purple-600 hover:bg-blue-200 px-4 py-2 rounded-lg transition-all duration-300 ease-in-out"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;