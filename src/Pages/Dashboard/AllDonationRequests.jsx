import React, { useEffect, useState } from "react";
import useAllDonationRequests from "../../hooks/useAllDonationRequests";
import { format } from "date-fns";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function AllDonationRequests() {
  const axiosSecure = useAxiosSecure();

  const { data: donationRequestsDB = [], refetch } = useQuery({
    queryKey: ["donationRequestsDB"],
    queryFn: useAllDonationRequests(),
  });

  const handleDone = (id) => {
    axiosSecure
      .patch(`/request-status-update/${id}`, { status: "done" })
      .then((res) => {
        console.log(res.data);
        refetch();
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
        refetch();
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
            refetch();
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
    <div className="bg-white p-6  rounded-lg shadow-lg w-full mt-8 sm:mt-0">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        All donation requests
      </h2>
      <div className="overflow-x-auto">
        <table className="table-auto border border-gray-300">
          <thead>
            <tr className="bg-gray-100 text-left text-sm">
              <th className="border border-gray-300 px-4 py-2">
                Recipient Name
              </th>
              <th className="border border-gray-300 px-4 py-2">
                Recipient Location
              </th>
              <th className="border border-gray-300 px-4 py-2">
                Donation Date
              </th>
              <th className="border border-gray-300 px-4 py-2">
                Donation Time
              </th>
              <th className="border border-gray-300 px-4 py-2">Blood Group</th>
              <th className="border border-gray-300 px-4 py-2">
                Donor Information
              </th>
              <th className="border border-gray-300 px-4 py-2">
                Donation Status
              </th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {donationRequestsDB.map((item) => (
              <tr key={item._id}>
                <td className="border border-gray-300 px-4 py-2">
                  {item.recipientName}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {`${item.upazilla}, ${item.district}`}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {format(new Date(item.date), "MM-dd-yyyy")}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {item.time}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {item.bloodGroup}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {item.donorName}, <br />
                  {item.donorEmail}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {item.donationStatus}
                </td>
                <td className="border border-gray-300 px-4 py-2 flex flex-wrap gap-2">
                  {item.donationStatus === "done" ? (
                    <button
                      onClick={() => handleCancel(item._id)}
                      className="bg-red-500 text-white px-2 py-1 rounded"
                    >
                      Cancel
                    </button>
                  ) : (
                    <button
                      onClick={() => handleDone(item._id)}
                      className="bg-green-500 text-white px-2 py-1 rounded"
                    >
                      Done
                    </button>
                  )}
                  <Link to={`/dashboard/request/edit/${item._id}`}>
                    <button className="bg-blue-500 text-white px-2 py-1 rounded">
                      Edit
                    </button>
                  </Link>

                  <button
                    onClick={() => handleDelete(item._id)}
                    className="bg-gray-500 text-white px-2 py-1 rounded"
                  >
                    Delete
                  </button>

                  <Link to={`/dashboard/request/view/${item._id}`}>
                    <button className="bg-purple-500 text-white px-2 py-1 rounded">
                      View
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
