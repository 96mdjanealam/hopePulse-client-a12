import { useState } from "react";
import districts from "../../data/districts.json";
import upazillas from "../../data/upazillas.json";
import useAllUsers from "../../hooks/useAllUsers";

const allDistricts = districts[2]?.data || [];
const allUpazillas = upazillas[2]?.data || [];
const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

export default function Search() {
  const [districtUpazillas, setDistrictUpazillas] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedUpazilla, setSelectedUpazilla] = useState("");
  const [selectedBloodGroup, setSelectedBloodGroup] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);

  const allUsers = useAllUsers();

  // Handle district selection
  const handleDistrict = (e) => {
    const districtName = e.target.value;
    setSelectedDistrict(districtName);
    setSelectedUpazilla(""); // Reset upazilla when district changes

    // Find the selected district data
    const selectedDistrictData = allDistricts.find(
      (district) => district.name === districtName
    );

    if (selectedDistrictData) {
      // Filter upazillas based on the selected district
      const filteredUpazillas = allUpazillas.filter(
        (upazilla) => upazilla.district_id === selectedDistrictData.id
      );
      setDistrictUpazillas(filteredUpazillas);
    } else {
      setDistrictUpazillas([]);
    }
  };

  // Handle upazilla selection
  const handleUpazilla = (e) => {
    const upazillaName = e.target.value;
    setSelectedUpazilla(upazillaName);
  };

  // Handle blood group selection
  const handleBloodGroup = (e) => {
    const bloodGroup = e.target.value;
    setSelectedBloodGroup(bloodGroup);
  };

  // Handle search button click
  const handleSearch = () => {
    // Filter users based on the selected district, upazilla, and blood group
    const usersWithFilters = allUsers.filter(
      (user) =>
        (selectedDistrict ? user.district === selectedDistrict : true) &&
        (selectedUpazilla ? user.upazilla === selectedUpazilla : true) &&
        (selectedBloodGroup === user.bloodGroup)
    );
    console.log(usersWithFilters)
    setFilteredUsers(usersWithFilters);
  };

  return (
    <div className="p-8">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Search donors</h2>
        <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="block text-gray-700 font-medium mb-2">
                District
              </label>
              <select
                name="district"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                defaultValue=""
                onChange={handleDistrict}
                required
              >
                <option value="" disabled>
                  Select district
                </option>
                {allDistricts.map((item) => (
                  <option key={item.id} value={item.name}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-1/2">
              <label className="block text-gray-700 font-medium mb-2">
                Upazilla
              </label>
              <select
                name="upazilla"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                value={selectedUpazilla}
                onChange={handleUpazilla}
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
            <div className="w-full">
              <label className="block text-gray-700 font-medium mb-2">
                Blood Group
              </label>
              <select
                name="bloodGroup"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                defaultValue=""
                onChange={handleBloodGroup}
                required
              >
                <option value="" disabled>
                  Select blood group
                </option>
                {bloodGroups.map((group) => (
                  <option key={group} value={group}>
                    {group}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {/* Search Button */}
          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleSearch}
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
              Search
            </button>
          </div>
        </form>
      </div>

      {/* Display filtered users */}
      <div className="mt-8">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Filtered Users</h3>
        {filteredUsers.length > 0 ? (
          <ul className="space-y-4">
            {filteredUsers.map((user) => (
              <li key={user._id} className="bg-white p-4 rounded-lg shadow">
                <p className="text-gray-800 font-medium">{user.name}</p>
                <p className="text-gray-600">
                  Location: {user.district}, {user.upazilla}
                </p>
                <p className="text-gray-600">Blood Group: {user.bloodGroup}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">No users found.</p>
        )}
      </div>
    </div>
  );
}
