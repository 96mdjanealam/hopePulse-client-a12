import React, { useEffect, useState } from "react";
import bloodDrop_img from "../../assets/images/blood_drop.png";
import districts from "../../data/districts.json";
import upazillas from "../../data/upazillas.json";

export default function Registration() {
  const allDistricts = districts[2]?.data;
  const allUpazillas = upazillas[2]?.data;

  const [district, setDistrict] = useState({});
  const [upazilla, setUpazilla] = useState({});

  const [districtUpazillas, setDistrictUpazillas] = useState([])

  const handleDistrict = (e) => {
    e.preventDefault();
    const selectedId = e.target.value;
    const selectedDistrict = allDistricts.find((item) => item.id === selectedId);
    const upazillas = allUpazillas.filter((item)=>item.district_id === selectedId);
    setDistrict(selectedDistrict);
    setDistrictUpazillas(upazillas);
  };

  const handleUpazilla = (e) =>{
    e.preventDefault();
    const selectedId = e.target.value;
    const selectedUpazilla = districtUpazillas.find((item) => item.id === selectedId);
    setUpazilla(selectedUpazilla);

  }

  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const yourDistrict = district.name;
    const yourUpazilla = upazilla.name;

    console.log(name, password, email, yourDistrict, yourUpazilla);
  };

  return (
    <section className="bg-gray-50 py-10">
      <div className="container mx-auto px-4 flex flex-col-reverse md:flex-row items-center">
        {/* Left Section: Form */}
        <div className="md:w-1/2 bg-white p-6  rounded-lg shadow-lg w-full mt-8 sm:mt-0">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Create an Account
          </h2>
          <form onSubmit={handleRegister} className="space-y-4">
            {/* Name Input */}
            <div>
              <label
                htmlFor="name"
                className="block text-gray-700 font-medium mb-2"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                placeholder="Enter your name"
                required
              />
            </div>
            {/* Email Input */}
            <div>
              <label
                htmlFor="email"
                className="block text-gray-700 font-medium mb-2"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                placeholder="Enter your email"
                required
              />
            </div>
            {/* Password Input */}

            <div className=" flex gap-4">
              <div className="w-1/2">
                <label
                  htmlFor="district"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Your district
                </label>
                <select
                  id="district"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                  value={district?.id || ""}
                  onChange={handleDistrict}
                  required
                >
                  <option value="" disabled>
                    Select your district
                  </option>
                  {allDistricts.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="w-1/2">
                <label
                  htmlFor="upazilla"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Your upazilla
                </label>
                <select
                  id="upazilla"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                  value={upazilla?.id || ""}
                  onChange={handleUpazilla}
                  required
                >
                  <option value="" disabled>
                    Select your upazilla
                  </option>
                  {districtUpazillas.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-gray-700 font-medium mb-2"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                placeholder="Enter your password"
                required
              />
            </div>
            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-red-600 text-white py-3 px-6 rounded-lg hover:bg-red-700 transition"
            >
              Register
            </button>
          </form>
        </div>

        {/* Right Section: Image */}
        <div className="md:w-1/2 flex justify-center">
          <img
            src={bloodDrop_img}
            alt="Registration"
            className="w-full max-w-sm object-contain max-h-72 rounded-lg"
          />
        </div>
      </div>
    </section>
  );
}
