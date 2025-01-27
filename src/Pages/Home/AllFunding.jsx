import React from "react";
import useAllFunding from "../../hooks/useAllfunding";
import { format } from "date-fns";
import { FaHandHoldingHeart } from "react-icons/fa"; // Import the donation icon

export default function AllFunding() {
  const [allFunding] = useAllFunding();

  return (
    <div className="w-11/12 mx-auto py-8">
      <h2 className="text-center text-3xl font-semibold text-gray-600 mb-8">
        Record of Funding by Big Hearted People
      </h2>
      <hr className="mb-10 border-2" />

      <div className="space-y-6 max-w-2xl mx-auto">
        {allFunding.map((item) => (
          <div
            key={item._id}
            className="bg-white  p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <div className="flex items-center space-x-4">
              {/* Donation Icon */}
              <FaHandHoldingHeart className="text-2xl text-red-600" />
              <p className="text-lg text-gray-700">
                Amount: USD{" "}
                <span className="font-bold text-blue-600">{item.amount}</span>
              </p>
            </div>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
              <p className="text-lg text-gray-700 mt-2">
                Donation by:{" "}
                <span className="text-green-500 font-semibold">{item.name}</span>
              </p>
              <p className="text-sm font-semibold text-gray-500 mt-2">
                Date: {format(new Date(item.date), "MM-dd-yyyy")}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}