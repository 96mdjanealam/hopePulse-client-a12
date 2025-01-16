import React from "react";
import header_img from "../../assets/images/header_img.jpg";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="bg-gray-50 py-10">
      <div className="container mx-auto px-4 flex flex-col-reverse md:flex-row items-center">
        {/* Left Section */}
        <div className="md:w-1/2 text-center md:text-left mt-8 sm:mt-0">
          <h1 className="text-4xl font-bold text-red-600">
            Give Blood, Save Lives
          </h1>
          <p className="mt-4 text-gray-700 text-lg">
            Join the HopePulse initiative and make a difference in someone's
            life today. Your small act of kindness can bring a big change.
          </p>
          <Link to="/registration">
            <button className="mt-6 bg-red-600 text-white py-3 px-6 rounded-md shadow-lg hover:bg-red-700 transition">
              Become a Donor
            </button>
          </Link>
        </div>

        {/* Right Section */}
        <div className="md:w-1/2">
          <img
            src={header_img}
            alt="Blood Donation"
            className="w-full rounded-lg shadow-lg"
          />
        </div>
      </div>
    </header>
  );
}
