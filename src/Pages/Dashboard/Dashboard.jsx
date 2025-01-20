import React, { useContext, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../../providers/AuthProvider";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const {userInfo} = useContext(AuthContext)
  console.log(userInfo);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const [isAdmin, setIsAdmin] = useState(true)

  // console.log(userInfo.role);
  // if(userInfo.role==="admin"){
  //   setIsAdmin(true)
  // }


  const links = (
    <>
      <ul className="text-lg">
        <li className="mb-4">
          <Link to="/" className="hover:text-gray-200">
            Home Page
          </Link>
        </li>
        <li className="mb-4">
          <Link to="/dashboard" className="hover:text-gray-200">
            Dashboard
          </Link>
        </li>
        <li className="mb-4">
          <Link to="/dashboard/profile" className="hover:text-gray-200">
            Profile
          </Link>
        </li>
        <li className="mb-4">
          <Link to="/dashboard/createDonation" className="hover:text-gray-200">
            Create Donation Request
          </Link>
        </li>
        <li className="mb-4">
          <Link to="/dashboard/my-donation-requests" className="hover:text-gray-200">
            My Donation Requests
          </Link>
        </li>
        <li className="mb-4">
          <Link to="/settings" className="hover:text-gray-200">
            Settings
          </Link>
        </li>
      </ul>
    </>
  );

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="bg-blue-700 text-white w-64 p-4 hidden md:block">
        <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
        <nav>{links}</nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1">
        {/* Top Bar */}
        <header className="bg-white shadow-md p-4 flex justify-between items-center md:hidden">
          <h1 className="text-lg font-bold">Dashboard</h1>
          <button onClick={toggleSidebar}>
            <FontAwesomeIcon
              className="text-lg w-6"
              icon={isSidebarOpen ? faXmark : faBars}
            />
          </button>
        </header>

        {/* Mobile Sidebar */}
        <aside
          id="mobileSidebar"
          className={`bg-blue-700 text-white w-64 p-4 fixed top-0 left-0 h-full z-50 transition-transform duration-300 ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:hidden`}
        >
          <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
          <nav>{links}</nav>
        </aside>

        {/* Content */}
        <main className="p-6">
          
          <Outlet></Outlet>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
