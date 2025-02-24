import { useContext, useState } from "react";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faXmark,
  faHome,
  faUser,
  faUsers,
  faEdit,
  faPlusCircle,
  faListAlt,
  faFileAlt,
  faCogs,
} from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../../providers/AuthProvider";
import useAdmin from "../../hooks/useAdmin";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { userInfo, logOut } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [isAdmin] = useAdmin();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogOut = () => {
    logOut();
    navigate("/");
  };

  const isSelected = (path) => {
<<<<<<< HEAD
    return location.pathname === path ? "bg-blue-800" : "";
=======
    return location.pathname === path ? "border-2 border-red-500/40 bg-red-700/20" : "";
>>>>>>> source-repo/main
  };

  const links = (
    <>
      <ul className="text-lg">
        <li className="mb-4">
          <Link
            onClick={toggleSidebar}
            to="/"
<<<<<<< HEAD
            className={`hover:text-gray-200 flex items-center p-2 rounded ${isSelected("/")}`}
=======
            className={`hover:text-gray-200 flex  items-center p-2 rounded ${isSelected(
              "/"
            )}`}
>>>>>>> source-repo/main
          >
            <FontAwesomeIcon icon={faHome} className="mr-2" />
            Home Page
          </Link>
        </li>
        <li className="mb-4">
          <Link
            onClick={toggleSidebar}
            to="/dashboard/profile"
<<<<<<< HEAD
            className={`hover:text-gray-200 flex items-center p-2 rounded ${isSelected("/dashboard/profile")}`}
=======
            className={`hover:text-gray-200 flex items-center p-2 rounded ${isSelected(
              "/dashboard/profile"
            )}`}
>>>>>>> source-repo/main
          >
            <FontAwesomeIcon icon={faUser} className="mr-2" />
            Profile
          </Link>
        </li>
        {isAdmin && (
          <li className="mb-4">
            <Link
              onClick={toggleSidebar}
              to="/dashboard/all-users"
<<<<<<< HEAD
              className={`hover:text-gray-200 flex items-center p-2 rounded ${isSelected("/dashboard/all-users")}`}
=======
              className={`hover:text-gray-200 flex items-center p-2 rounded ${isSelected(
                "/dashboard/all-users"
              )}`}
>>>>>>> source-repo/main
            >
              <FontAwesomeIcon icon={faUsers} className="mr-2" />
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
<<<<<<< HEAD
                className={`hover:text-gray-200 flex items-center p-2 rounded ${isSelected("/dashboard/all-donation-requests")}`}
=======
                className={`hover:text-gray-200 flex items-center p-2 rounded ${isSelected(
                  "/dashboard/all-donation-requests"
                )}`}
>>>>>>> source-repo/main
              >
                <FontAwesomeIcon icon={faListAlt} className="mr-2" />
                All Donation Requests
              </Link>
            </li>
            <li className="mb-4">
              <Link
                onClick={toggleSidebar}
                to="/dashboard/content-management"
<<<<<<< HEAD
                className={`hover:text-gray-200 flex items-center p-2 rounded ${isSelected("/dashboard/content-management")}`}
=======
                className={`hover:text-gray-200 flex items-center p-2 rounded ${isSelected(
                  "/dashboard/content-management"
                )}`}
>>>>>>> source-repo/main
              >
                <FontAwesomeIcon icon={faEdit} className="mr-2" />
                Content Management
              </Link>
            </li>
          </>
        )}
<<<<<<< HEAD

=======
>>>>>>> source-repo/main
        <li className="mb-4">
          <Link
            onClick={toggleSidebar}
            to="/dashboard/createDonation"
<<<<<<< HEAD
            className={`hover:text-gray-200 flex items-center p-2 rounded ${isSelected("/dashboard/createDonation")}`}
=======
            className={`hover:text-gray-200 flex items-center p-2 rounded ${isSelected(
              "/dashboard/createDonation"
            )}`}
>>>>>>> source-repo/main
          >
            <FontAwesomeIcon icon={faPlusCircle} className="mr-2" />
            Create Donation Request
          </Link>
        </li>

        {!(isAdmin || userInfo?.role === "Volunteer") && (
          <li className="mb-4">
            <Link
              onClick={toggleSidebar}
              to="/dashboard/my-donation-requests"
<<<<<<< HEAD
              className={`hover:text-gray-200 flex items-center p-2 rounded ${isSelected("/dashboard/my-donation-requests")}`}
=======
              className={`hover:text-gray-200 flex items-center p-2 rounded ${isSelected(
                "/dashboard/my-donation-requests"
              )}`}
>>>>>>> source-repo/main
            >
              <FontAwesomeIcon icon={faFileAlt} className="mr-2" />
              My Donation Requests
            </Link>
          </li>
        )}
        <li className="mb-4">
          <Link
            onClick={toggleSidebar}
            to="/settings"
<<<<<<< HEAD
            className={`hover:text-gray-200 flex items-center p-2 rounded ${isSelected("/settings")}`}
=======
            className={`hover:text-gray-200 flex items-center p-2 rounded ${isSelected(
              "/settings"
            )}`}
>>>>>>> source-repo/main
          >
            <FontAwesomeIcon icon={faCogs} className="mr-2" />
            Settings
          </Link>
        </li>
      </ul>
    </>
  );

  return (
    <div className="font-ysabeau-infant flex min-h-screen bg-gray-100">
<<<<<<< HEAD
    
      <aside className="bg-blue-700 text-white w-64 p-4 hidden md:block">
        <Link onClick={toggleSidebar} to="/dashboard">
          <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
        </Link>

        <nav>{links}</nav>
      </aside>

   
      <div className="flex-1 overflow-x-auto">
      
=======
      <aside className="bg-gray-800 text-white w-64 p-4 hidden md:block sticky top-0">
        <Link onClick={toggleSidebar} to="/dashboard">
          <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
        </Link>
        <nav>{links}</nav>
      </aside>
      <div className="flex-1 overflow-x-auto">
>>>>>>> source-repo/main
        <header className="bg-white shadow-md p-4 flex justify-between items-center md:hidden">
          <Link to="/dashboard">
            <h1 className="text-lg font-bold cursor-pointer">Dashboard</h1>
          </Link>
<<<<<<< HEAD

=======
>>>>>>> source-repo/main
          <button onClick={toggleSidebar}>
            <FontAwesomeIcon
              className="text-lg w-6"
              icon={isSidebarOpen ? faXmark : faBars}
            />
          </button>
        </header>
        <div className="flex justify-end p-6 mx-auto gap-4 border-b-2 border-gray-300">
          <button
            onClick={() => navigate("/")}
            className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-300"
          >
            Go Home
          </button>
          <button
            onClick={handleLogOut}
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Log Out
          </button>
        </div>
<<<<<<< HEAD

      
        <aside
          id="mobileSidebar"
          className={`bg-blue-700 text-white w-64 p-4 fixed top-0 left-0 h-full z-50 transition-transform duration-300 ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:hidden`}
=======
        <aside
          id="mobileSidebar"
          className={`bg-gray-800 text-white w-64 p-4 fixed top-0 left-0 h-full z-50 transition-transform duration-300 ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:hidden sticky top-0`}
>>>>>>> source-repo/main
        >
          <Link onClick={toggleSidebar} to="/dashboard">
            <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
          </Link>

          <nav>{links}</nav>
        </aside>
<<<<<<< HEAD

       
        <main className="p-6">
=======
        <main className="">
>>>>>>> source-repo/main
          <Outlet></Outlet>
        </main>
      </div>
    </div>
  );
};

<<<<<<< HEAD
export default Dashboard;
=======
export default Dashboard;
>>>>>>> source-repo/main
