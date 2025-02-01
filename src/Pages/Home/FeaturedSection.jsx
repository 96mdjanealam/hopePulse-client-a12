import React from "react";
import { Link } from "react-router-dom";
import { FaHeartbeat, FaMedkit, FaUsers } from "react-icons/fa"; // Importing icons from Font Awesome

export default function FeaturedSection() {
  return (
    <section className="bg-red-100 py-12">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-red-600">
          Why Donate Blood?
        </h2>
        <p className="mt-4 text-gray-700 text-lg">
          Every 2 seconds, someone in the world needs blood. By donating, you can save up to three lives with a single donation.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          {/* Card 1 */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <div className="flex justify-center">
              <FaHeartbeat className="text-blue-600 text-4xl" /> {/* Icon for Save Lives */}
            </div>
            <h3 className="text-xl font-semibold text-blue-600 mt-4">
              Save Lives
            </h3>
            <p className="mt-2 text-gray-600">
              Your donation can provide critical support to accident victims, cancer patients, and those undergoing surgery.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <div className="flex justify-center">
              <FaMedkit className="text-green-600 text-4xl" /> {/* Icon for Health Benefits */}
            </div>
            <h3 className="text-xl font-semibold text-green-600 mt-4">
              Health Benefits
            </h3>
            <p className="mt-2 text-gray-600">
              Regular blood donation can improve cardiovascular health and reduce harmful iron stores in your body.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <div className="flex justify-center">
              <FaUsers className="text-red-600 text-4xl" /> {/* Icon for Community Impact */}
            </div>
            <h3 className="text-xl font-semibold text-red-600 mt-4">
              Community Impact
            </h3>
            <p className="mt-2 text-gray-600">
              Join a global movement to ensure that no one suffers due to a lack of blood. Be a hero in your community.
            </p>
          </div>
        </div>

        <div className="mt-8">
          
        </div>
      </div>
    </section>
  );
}