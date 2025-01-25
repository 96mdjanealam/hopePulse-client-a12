import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { format } from "date-fns";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { FaUsers, FaDollarSign, FaHandHoldingHeart } from "react-icons/fa";
import useAllUsers from "../../hooks/useAllUsers";
import useAllDonationRequests from "../../hooks/useAllDonationRequests";
import useAdmin from "../../hooks/useAdmin";
import { useQuery } from "@tanstack/react-query";

export default function DashboardHome() {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [tableData, setTableData] = useState([]);
  const allUsers = useAllUsers();

  const { data: donationRequestsDB = [] } = useQuery({
    queryKey: ["donationRequestsDB"],
    queryFn: useAllDonationRequests(),
  });

  const { userInfo } = useContext(AuthContext);
  const [isAdmin] = useAdmin();

  useEffect(() => {
    axiosSecure
      .get(`/donationRequests?email=${user?.email}`)
      .then((res) => {
        setTableData(res.data);
      })
      .catch(() => {});
  }, [axiosSecure, user?.email]);

  const handleDone = (id) => {
    axiosSecure
      .patch(`/request-status-update/${id}`, { status: "done" })
      .then((res) => {
        console.log(res.data);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleCancel = (id) => {
    axiosSecure
      .patch(`/request-status-update/${id}`, { status: "canceled" })
      .then((res) => {
        console.log(res.data);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/requestDelete/${id}`)
          .then((res) => {
            console.log(res.data);
            setTableData((prevData) =>
              prevData.filter((item) => item._id !== id)
            );
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  };

  return (
    <div className="md:p-6 w-full sm:mt-0">
      <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 md:mb-6">
        Welcome {user?.displayName}
      </h2>
      {!(isAdmin || userInfo?.role === "Volunteer")&& <p className="mb-4">Your latest blood donation requests</p>}

      {(isAdmin || userInfo?.role === "Volunteer") ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 p-4 md:p-6">
          {/* Total Users Card */}
          <div className="bg-white shadow-lg rounded-lg p-4 md:p-6 flex items-center">
            <div className="text-blue-500 text-3xl md:text-4xl">
              <FaUsers />
            </div>
            <div className="ml-4">
              <h3 className="text-sm md:text-lg font-semibold text-gray-700">
                Total Users
              </h3>
              <p className="text-xl md:text-2xl font-bold text-gray-900">
                {allUsers.length}
              </p>
            </div>
          </div>

          {/* Total Funding Card */}
          <div className="bg-white shadow-lg rounded-lg p-4 md:p-6 flex items-center">
            <div className="text-green-500 text-3xl md:text-4xl">
              <FaDollarSign />
            </div>
            <div className="ml-4">
              <h3 className="text-sm md:text-lg font-semibold text-gray-700">
                Total Funding
              </h3>
              <p className="text-xl md:text-2xl font-bold text-gray-900">$567,890</p>
            </div>
          </div>

          {/* Total Blood Donation Requests Card */}
          <div className="bg-white shadow-lg rounded-lg p-4 md:p-6 flex items-center">
            <div className="text-red-500 text-3xl md:text-4xl">
              <FaHandHoldingHeart />
            </div>
            <div className="ml-4">
              <h3 className="text-sm md:text-lg font-semibold text-gray-700">
                Blood Donation Requests
              </h3>
              <p className="text-xl md:text-2xl font-bold text-gray-900">
                {donationRequestsDB?.length}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow-md overflow-hidden">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-2 py-2 md:px-4 md:py-3 text-left text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Recipient Name
                </th>
                <th className="px-2 py-2 md:px-4 md:py-3 text-left text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Recipient Location
                </th>
                <th className="px-2 py-2 md:px-4 md:py-3 text-left text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Donation Date
                </th>
                <th className="px-2 py-2 md:px-4 md:py-3 text-left text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Donation Time
                </th>
                <th className="px-2 py-2 md:px-4 md:py-3 text-left text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Blood Group
                </th>
                <th className="px-2 py-2 md:px-4 md:py-3 text-left text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Donor Information
                </th>
                <th className="px-2 py-2 md:px-4 md:py-3 text-left text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Donation Status
                </th>
                <th className="px-2 py-2 md:px-4 md:py-3 text-center text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {tableData.map((item) => (
                <tr key={item._id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-2 py-2 md:px-4 md:py-4 whitespace-nowrap text-xs md:text-sm text-gray-900">
                    {item.recipientName}
                  </td>
                  <td className="px-2 py-2 md:px-4 md:py-4 whitespace-nowrap text-xs md:text-sm text-gray-900">
                    {`${item.upazilla}, ${item.district}`}
                  </td>
                  <td className="px-2 py-2 md:px-4 md:py-4 whitespace-nowrap text-xs md:text-sm text-gray-900">
                    {format(new Date(item.date), "MM-dd-yyyy")}
                  </td>
                  <td className="px-2 py-2 md:px-4 md:py-4 whitespace-nowrap text-xs md:text-sm text-gray-900">
                    {item.time}
                  </td>
                  <td className="px-2 py-2 md:px-4 md:py-4 whitespace-nowrap text-xs md:text-sm text-gray-900">
                    {item.bloodGroup}
                  </td>
                  <td className="px-2 py-2 md:px-4 md:py-4 whitespace-nowrap text-xs md:text-sm text-gray-900">
                    {item.donorName},<br />{item.donorEmail}
                  </td>
                  <td className="px-2 py-2 md:px-4 md:py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        item.donationStatus === "done"
                          ? "bg-green-100 text-green-800"
                          : item.donationStatus === "canceled"
                          ? "bg-red-100 text-red-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {item.donationStatus}
                    </span>
                  </td>
                  <td className="px-2 py-2 md:px-4 md:py-4 whitespace-nowrap text-xs md:text-sm text-center">
                    <div className="flex flex-wrap justify-center gap-1 md:gap-2">
                      {item?.donationStatus === "inprogress" && (
                        <>
                          <button
                            onClick={() => handleDone(item._id)}
                            className="bg-green-500 text-white px-2 py-1 md:px-3 md:py-1 rounded-md hover:bg-green-600 transition-colors text-xs md:text-sm"
                          >
                            Done
                          </button>
                          <button
                            onClick={() => handleCancel(item._id)}
                            className="bg-red-500 text-white px-2 py-1 md:px-3 md:py-1 rounded-md hover:bg-red-600 transition-colors text-xs md:text-sm"
                          >
                            Cancel
                          </button>
                        </>
                      )}
                      <Link to={`/dashboard/request/edit/${item._id}`}>
                        <button className="bg-blue-500 text-white px-2 py-1 md:px-3 md:py-1 rounded-md hover:bg-blue-600 transition-colors text-xs md:text-sm">
                          Edit
                        </button>
                      </Link>
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="bg-gray-500 text-white px-2 py-1 md:px-3 md:py-1 rounded-md hover:bg-gray-600 transition-colors text-xs md:text-sm"
                      >
                        Delete
                      </button>
                      <Link to={`/dashboard/request/view/${item._id}`}>
                        <button className="bg-purple-500 text-white px-2 py-1 md:px-3 md:py-1 rounded-md hover:bg-purple-600 transition-colors text-xs md:text-sm">
                          View
                        </button>
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}