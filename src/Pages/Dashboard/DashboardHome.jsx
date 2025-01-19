import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { format } from "date-fns";

export default function DashboardHome() {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    axiosSecure
      .get(`/donationRequests?email=${user?.email}`)
      .then((res) => {
        setTableData(res.data);
      })
      .catch(() => {});
  }, [axiosSecure, user?.email]);

  console.log(tableData);

  return (
    <div>
      <h4 className="text-3xl mb-8">Welcome <span className="font-bold text-blue-500">{user?.displayName}</span></h4>
      <p className="mb-4 text-xl">Your donation requests</p>
      {/* table of donation requests */}
      <div className="overflow-x-auto">
        <table className="table-auto border border-gray-300">
          <thead>
            <tr className="bg-gray-100 text-left text-sm">
              <th className="border border-gray-300 px-4 py-2">Recipient Name</th>
              <th className="border border-gray-300 px-4 py-2">Recipient Location</th>
              <th className="border border-gray-300 px-4 py-2">Donation Date</th>
              <th className="border border-gray-300 px-4 py-2">Donation Time</th>
              <th className="border border-gray-300 px-4 py-2">Blood Group</th>
              <th className="border border-gray-300 px-4 py-2">Donor Information</th>
              <th className="border border-gray-300 px-4 py-2">Donation Status</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((item) => (
              <tr key={item._id}>
                <td className="border border-gray-300 px-4 py-2">{item.recipientName}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {`${item.upazilla}, ${item.district}`}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {format(new Date(item.date), "yyyy-MM-dd")}
                </td>
                <td className="border border-gray-300 px-4 py-2">{item.time}</td>
                <td className="border border-gray-300 px-4 py-2">{item.bloodGroup}</td>
                <td className="border border-gray-300 px-4 py-2">{item.donorInformation}</td>
                <td className="border border-gray-300 px-4 py-2">{item.donationStatus}</td>
                <td className="border border-gray-300 px-4 py-2 flex flex-wrap gap-2">
                  <button className="bg-green-500 text-white px-2 py-1 rounded">Done</button>
                  <button className="bg-red-500 text-white px-2 py-1 rounded">Cancel</button>
                  <button className="bg-blue-500 text-white px-2 py-1 rounded">Edit</button>
                  <button className="bg-gray-500 text-white px-2 py-1 rounded">Delete</button>
                  <button className="bg-purple-500 text-white px-2 py-1 rounded">View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
