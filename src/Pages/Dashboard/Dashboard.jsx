import React, { useContext, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../../providers/AuthProvider";
import useAdmin from "../../hooks/useAdmin";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const { userInfo, logOut } = useContext(AuthContext);
  console.log(userInfo);

  const navigate = useNavigate();

  const [isAdmin] = useAdmin();

  console.log(isAdmin);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogOut = () => {
    logOut();
    navigate("/");
  };

  // const [isAdmin, setIsAdmin] = useState(false)

  // console.log(userInfo.role);
  // if(userInfo.role==="admin"){
  //   setIsAdmin(true)
  // }

  const links = (
    <>
      <ul className="text-lg">
        <li className="mb-4">
          <Link onClick={toggleSidebar} to="/" className="hover:text-gray-200">
            Home Page
          </Link>
        </li>
        <li className="mb-4">
          <Link
            onClick={toggleSidebar}
            to="/dashboard/profile"
            className="hover:text-gray-200"
          >
            Profile
          </Link>
        </li>
        {isAdmin && (
          <li className="mb-4">
            <Link
              onClick={toggleSidebar}
              to="/dashboard/all-users"
              className="hover:text-gray-200"
            >
              All Users
            </Link>
          </li>
        )}
        {(isAdmin || userInfo?.role === "Volunteer") && (
          <>
            <li className="mb-4">
              <Link
                onClick={toggleSidebar}
                to="/dashboard/all-donation-requests"
                className="hover:text-gray-200"
              >
                All Donation Requests
              </Link>
            </li>
            <li className="mb-4">
              <Link
                onClick={toggleSidebar}
                to="/dashboard/content-management"
                className="hover:text-gray-200"
              >
                Content Management
              </Link>
            </li>
          </>
        )}

        <li className="mb-4">
          <Link
            onClick={toggleSidebar}
            to="/dashboard/createDonation"
            className="hover:text-gray-200"
          >
            Create Donation Request
          </Link>
        </li>

        {!(isAdmin || userInfo?.role === "Volunteer") && (
          <li className="mb-4">
            <Link
              onClick={toggleSidebar}
              to="/dashboard/my-donation-requests"
              className="hover:text-gray-200"
            >
              My Donation Requests
            </Link>
          </li>
        )}
        <li className="mb-4">
          <Link
            onClick={toggleSidebar}
            to="/settings"
            className="hover:text-gray-200"
          >
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
        <Link onClick={toggleSidebar} to="/dashboard">
          <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
        </Link>

        <nav>{links}</nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1">
        {/* Top Bar */}
        <header className="bg-white shadow-md p-4 flex justify-between items-center md:hidden">
          <Link to="/dashboard">
            <h1 className="text-lg font-bold cursor-pointer">Dashboard</h1>
          </Link>

          <button onClick={toggleSidebar}>
            <FontAwesomeIcon
              className="text-lg w-6"
              icon={isSidebarOpen ? faXmark : faBars}
            />
          </button>
        </header>
        <div
          onClick={() => navigate("/")}
          className="flex justify-end w-11/12 mx-auto mt-4 gap-4"
        >
          <button className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-300">
            Go Home
          </button>
          <button
            onClick={handleLogOut}
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            logOut
          </button>
        </div>

        {/* Mobile Sidebar */}
        <aside
          id="mobileSidebar"
          className={`bg-blue-700 text-white w-64 p-4 fixed top-0 left-0 h-full z-50 transition-transform duration-300 ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:hidden`}
        >
          <Link onClick={toggleSidebar} to="/dashboard">
            <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
          </Link>

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
