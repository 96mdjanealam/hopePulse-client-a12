import React from "react";
import useAllDonationRequests from "../../hooks/useAllDonationRequests";
import { format } from "date-fns";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAdmin from "../../hooks/useAdmin";

export default function AllDonationRequests() {
  const axiosSecure = useAxiosSecure();
  const [isAdmin] = useAdmin();

  const { data: donationRequestsDB = [], refetch } = useQuery({
    queryKey: ["donationRequestsDB"],
    queryFn: useAllDonationRequests(),
  });

  const handleDone = (id) => {
    axiosSecure
      .patch(`/request-status-update/${id}`, { status: "done" })
      .then(() => {
        refetch();
      })
  };

  const handleCancel = (id) => {
    axiosSecure
      .patch(`/request-status-update/${id}`, { status: "canceled" })
      .then(() => {
        refetch();
      })
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
          .then(() => {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          })
      }
    });
  };

  return (
    <div className=" md:p-6 rounded-lg ">
      <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 md:mb-6">
        All Donation Requests
      </h2>
      <div className="overflow-x-auto shadow-md rounded-lg">
  <table className="w-full bg-white text-sm rounded-lg shadow-md">
    <thead className="bg-gray-50">
      <tr>
        <th className="px-2 py-1 text-left font-medium text-gray-500 uppercase">
          Recipient Name
        </th>
        <th className="px-2 py-1 text-left font-medium text-gray-500 uppercase">
          Recipient Location
        </th>
        <th className="px-2 py-1 text-left font-medium text-gray-500 uppercase">
          Donation Date
        </th>
        <th className="px-2 py-1 text-left font-medium text-gray-500 uppercase">
          Donation Time
        </th>
        <th className="px-2 py-1 text-left font-medium text-gray-500 uppercase">
          Blood Group
        </th>
        <th className="px-2 py-1 text-left font-medium text-gray-500 uppercase">
          Donor Information
        </th>
        <th className="px-2 py-1 text-left font-medium text-gray-500 uppercase">
          Donation Status
        </th>
        <th className="px-2 py-1 text-center font-medium text-gray-500 uppercase">
          Actions
        </th>
      </tr>
    </thead>
    <tbody className="divide-y divide-gray-200">
      {donationRequestsDB.map((item) => (
        <tr key={item._id} className="hover:bg-gray-50 transition-colors">
          <td className="px-2 py-1 whitespace-nowrap text-gray-900">
            {item.recipientName}
          </td>
          <td className="px-2 py-1 whitespace-nowrap text-gray-900">
            {`${item.upazilla}, ${item.district}`}
          </td>
          <td className="px-2 py-1 whitespace-nowrap text-gray-900">
            {format(new Date(item.date), "MM-dd-yyyy")}
          </td>
          <td className="px-2 py-1 whitespace-nowrap text-gray-900">
            {item.time}
          </td>
          <td className="px-2 py-1 whitespace-nowrap text-gray-900">
            {item.bloodGroup}
          </td>
          <td className="px-2 py-1 whitespace-nowrap text-gray-900">
            {item.donorName}, <br />
            {item.donorEmail}
          </td>
          <td className="px-2 py-1 whitespace-nowrap">
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
          <td className="py-1 whitespace-nowrap text-center">
            <div className="flex flex-wrap justify-center gap-1">
              {item.donationStatus === "done" ? (
                <button
                  onClick={() => handleCancel(item._id)}
                  className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600 transition-colors"
                >
                  Cancel
                </button>
              ) : (
                <button
                  onClick={() => handleDone(item._id)}
                  className="bg-green-500 text-white px-2 py-1 rounded-md hover:bg-green-600 transition-colors"
                >
                  Done
                </button>
              )}
              <Link to={`/dashboard/request/edit/${item._id}`}>
                <button className="bg-blue-500 text-white px-2 py-1 rounded-md hover:bg-blue-600 transition-colors">
                  Edit
                </button>
              </Link>
              {isAdmin && (
                <button
                  onClick={() => handleDelete(item._id)}
                  className="bg-gray-500 text-white px-2 py-1 rounded-md hover:bg-gray-600 transition-colors"
                >
                  Delete
                </button>
              )}
              <Link to={`/dashboard/request/view/${item._id}`}>
                <button className="bg-purple-500 text-white px-2 py-1 rounded-md hover:bg-purple-600 transition-colors">
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

    </div>
  );
}