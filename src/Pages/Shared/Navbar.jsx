import React, { useContext, useState } from "react";
import logo from "../../assets/images/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../../providers/AuthProvider";
import { Link, NavLink } from "react-router-dom";


export default function Navbar() {
  const { user, logOut, loading } = useContext(AuthContext);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleDashboard = () => {
    setIsDropdownOpen(false);
  };

  const handleLogout = () => {
    setIsDropdownOpen(false);
    logOut();
  };

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      {loading ? (
        <div className='w-full h-24 flex items-center justify-center'>
        <span className="loading loading-bars loading-md"></span>
    </div>
      ) : (
        <div>
          <nav className="bg-gray-800 text-white">
            <div className="container mx-auto px-4 flex justify-between items-center py-4">
              {/* Logo */}
              <div className="text-2xl font-bold flex gap-3">
                <img className="h-8" src={logo} alt="" />
                <Link to="/">HopePulse</Link>
              </div>

              {/* Desktop Links */}
              <div className="hidden md:flex space-x-6">
                <NavLink
                  to="/pending-donation-requests"
                  className={({ isActive }) =>
                    `hover:text-gray-300 ${
                      isActive ? "text-gray-300 font-bold" : "text-gray-400"
                    }`
                  }
                >
                  Donation Requests
                </NavLink>
                <NavLink
                  to="/blogs"
                  className={({ isActive }) =>
                    `hover:text-gray-300 ${
                      isActive ? "text-gray-300 font-bold" : "text-gray-400"
                    }`
                  }
                >
                  Blog
                </NavLink>
                <NavLink
                  to="/payment"
                  className={({ isActive }) =>
                    `hover:text-gray-300 ${
                      isActive ? "text-gray-300 font-bold" : "text-gray-400"
                    }`
                  }
                >
                  Funding
                </NavLink>
              </div>

              {/* User Avatar with Dropdown */}

              <div className="flex gap-4">
                <div className="relative">
                  {user && (
                    <button
                      className="flex items-center space-x-2"
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    >
                      <img
                        src={user?.photoURL}
                        alt="User Avatar"
                        className="w-10 h-10 rounded-full border-2 border-gray-300 object-cover"
                      />
                      <span className="hidden md:block">
                        {user?.displayName||""}
                      </span>
                    </button>
                  )}

                  {isDropdownOpen && user && (
                    <div className="absolute flex flex-col right-0 mt-2 w-48 bg-white text-gray-800 text-left rounded-md shadow-lg">
                      <Link
                        onClick={handleDashboard}
                        to="/dashboard"
                        className="px-4 py-2 rounded-md hover:bg-gray-100"
                      >
                        Dashboard
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="text-left px-4 py-2 rounded-md hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>

                {/* Hamburger Menu */}

                {!user && (
                  <Link to="login">
                    <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400">
                      Login
                    </button>
                  </Link>
                )}

                <button
                  className="md:hidden"
                  onClick={() => setIsOpen(!isOpen)}
                >
                  {isOpen ? (
                    <FontAwesomeIcon className="text-lg w-6" icon={faXmark} />
                  ) : (
                    <FontAwesomeIcon className="text-lg w-6" icon={faBars} />
                  )}
                </button>
              </div>
            </div>

            {/* Mobile Links */}
            {isOpen && (
              <div className="md:hidden bg-gray-700">
                <Link
                  to="/pending-donation-requests"
                  className="block px-4 py-2 hover:bg-gray-600"
                >
                  Donation Requests
                </Link>
                <Link to="/blogs" className="block px-4 py-2 hover:bg-gray-600">
                  Blog
                </Link>
                <Link
                  to="/payment"
                  className="block px-4 py-2 hover:bg-gray-600"
                >
                  Funding
                </Link>
              </div>
            )}
          </nav>
        </div>
      )}
    </div>
  );
}
