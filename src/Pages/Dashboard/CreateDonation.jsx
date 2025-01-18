import React, { useContext, useState } from "react";
import districts from "../../data/districts.json";
import upazillas from "../../data/upazillas.json";
import { AuthContext } from "../../providers/AuthProvider";

const allDistricts = districts[2]?.data;
const allUpazillas = upazillas[2]?.data;
const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

export default function CreateDonation() {
  const { user } = useContext(AuthContext);
  const [district, setDistrict] = useState({});

  const [districtUpazillas, setDistrictUpazillas] = useState([]);

  console.log(bloodGroups);

  const [time, setTime] = useState("");

  const handleChange = (e) => {
    setTime(e.target.value);
  };

  const handleDistrict = (e) => {
    e.preventDefault();
    const selectedId = e.target.value;
    const selectedDistrict = allDistricts.find(
      (item) => item.id === selectedId
    );
    const upazillas = allUpazillas.filter(
      (item) => item.district_id === selectedId
    );
    setDistrict(selectedDistrict);
    setDistrictUpazillas(upazillas);
  };

  return (
    <div>
      <div>
        <label htmlFor="time">Select Time:</label>
        <input type="time" id="time" value={time} onChange={handleChange} />
        <p>Selected Time: {time}</p>
      </div>

      <div className="bg-white p-6  rounded-lg shadow-lg w-full mt-8 sm:mt-0">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Create Donation request
        </h2>
        <form className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Requester Name
            </label>
            <input
              type="text"
              name="name"
              id=""
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 cursor-not-allowed bg-gray-200"
              value={user?.displayName}
              readOnly
            />
          </div>

          <div>
            <label htmlFor="" className="block text-gray-700 font-medium mb-2">
              requester Email
            </label>
            <input
              type="email"
              name="email"
              id=""
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 cursor-not-allowed bg-gray-200"
              value={user?.email}
              readOnly
            />
          </div>

          <div className="flex gap-4">
            <div className="w-1/2">
              <label
                htmlFor="district"
                className="block text-gray-700 font-medium mb-2"
              >
                Recipient district
              </label>
              <select
                id="district"
                name="district"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                defaultValue=""
                onChange={handleDistrict}
                required
              >
                <option value="" disabled>
                  Select district
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
                Recipient upazilla
              </label>
              <select
                id="upazilla"
                name="upazilla"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                defaultValue=""
                // onChange={handleUpazilla}
                required
              >
                <option value="" disabled>
                  Select upazilla
                </option>
                {districtUpazillas.map((item) => (
                  <option key={item.id} value={item.name}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="block text-gray-700 font-medium mb-2">
                Hospital name
              </label>
              <input
                type="text"
                name="hospital"
                id=""
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
              />
            </div>

            <div className=" w-1/2">
              <label
                htmlFor="bloodGroup"
                className="block text-gray-700 font-medium mb-2"
              >
                Blood group
              </label>
              <select
                name="bloodGroup"
                id="bloodGroup"
                defaultValue=""
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                required
              >
                <option value="" disabled>
                  Select blood group
                </option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Full Address
            </label>
            <input
              type="text"
              name="fullAddress"
              id=""
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
              placeholder="(like: Zahir Raihan Rd, Dhaka)"
            />
          </div>

          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="block text-gray-700 font-medium mb-2">
                Date
              </label>
              <input
                type="date"
                name="date"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
              />
            </div>

            <div className="w-1/2">
              <label className="block text-gray-700 font-medium mb-2">
                Time
              </label>
              <input
                type="time"
                name="time"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
              />
            </div>
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Requester Message
            </label>
            <textarea
              name="message"
              id=""
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
              placeholder="Write your message here."
              rows="2"
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-red-600 text-white py-3 px-6 rounded-lg hover:bg-red-700 transition "
          >
            Request
          </button>
        </form>
      </div>
    </div>
  );
}
