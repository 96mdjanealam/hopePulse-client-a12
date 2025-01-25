import { useContext, useEffect, useState } from "react";
import districts from "../../data/districts.json";
import upazillas from "../../data/upazillas.json";
import axios from "axios";
import { AuthContext } from "../../providers/AuthProvider";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import DotLoading from "./DotLoading";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
const allDistricts = districts[2]?.data || [];
const allUpazillas = upazillas[2]?.data || [];

export default function Profile() {
  const { user, updateProfileInfo } = useContext(AuthContext);
  const [userData, setUserData] = useState({});
  const [district, setDistrict] = useState({});
  const [loading, setLoading] = useState(false);
  const [districtUpazillas, setDistrictUpazillas] = useState([]);
  const [photo, setPhoto] = useState(null);
  const [photoURL, setPhotoURL] = useState("");

  const [isEditable, setIsEditable] = useState(false);
  const toggleEdit = () => {
    setIsEditable((prev) => !prev);
  };

  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/user?email=${user?.email}`)
        .then((res) => {
          setUserData(res?.data);
          setPhotoURL(res?.data?.image || "");
          const selectedDistrict = allDistricts.find(
            (item) => item.name === res?.data?.district
          );
          setDistrict(selectedDistrict || {});
          if (selectedDistrict) {
            const filteredUpazillas = allUpazillas.filter(
              (item) => item.district_id === selectedDistrict.id
            );
            setDistrictUpazillas(filteredUpazillas);
          }
        })
        .catch((err) => {
          console.error("Error fetching user data:", err);
        });
    }
  }, [user?.email, axiosSecure]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setPhoto(file);
  };

  const handleDistrict = (e) => {
    const selectedId = e.target.value;
    const selectedDistrict = allDistricts.find(
      (item) => item.id === selectedId
    );
    setDistrict(selectedDistrict || {});
    const filteredUpazillas = allUpazillas.filter(
      (item) => item.district_id === selectedId
    );
    setDistrictUpazillas(filteredUpazillas);
  };

  const handleRegister = async (e) => {
    setLoading(true);
    e.preventDefault();
    const form = e.target;

    const formData = new FormData();
    formData.append("image", photo);

    try {
      const response = await axios.post(image_hosting_api, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.success) {
        const updatedInfo = {
          name: form.name.value,
          bloodGroup: form.bloodGroup.value,
          district: district.name,
          upazilla: form.upazilla.value,
          role: "donor",
          status: "Active",
          image: response.data.data.display_url,
        };

        try {
          await updateProfileInfo(updatedInfo.name, updatedInfo.image);
          const res = await axiosSecure.patch(
            `/user-update/${userData._id}`,
            updatedInfo
          );
          if (res?.data?.modifiedCount) {
            Swal.fire({
              icon: "success",
              title: "Your work has been saved",
              showConfirmButton: false,
              timer: 1500,
            }).then(() => {
              setPhotoURL(updatedInfo.image);
              toggleEdit();
              window.location.reload();
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "No changes made!",
            });
          }
        } catch (error) {
          console.error("Error in profile update or patch request:", error);
        }
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
    setLoading(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {userData && Object.keys(userData).length > 0 && (
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/2 bg-white p-6 rounded-lg shadow-lg">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-4">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
                {isEditable ? "Update Profile" : "My Profile"}
              </h2>
              <span className="rounded-full px-4 py-2 text-sm bg-yellow-300">{userData.role}</span>
              </div>
              
              <button
                type="button"
                onClick={toggleEdit}
                className={`text-white py-2 px-4 rounded-lg ${
                  isEditable ? "bg-gray-600" : "bg-blue-500"
                } hover:bg-blue-600`}
              >
                {isEditable ? "Cancel Edit" : "Edit"}
              </button>
            </div>

            {loading ? (
              <div className="flex justify-center">
                <DotLoading />
              </div>
            ) : (
              <form onSubmit={handleRegister} className="space-y-6">
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
                    defaultValue={userData.name}
                    readOnly={!isEditable}
                    className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 ${
                      !isEditable ? "bg-gray-100" : ""
                    }`}
                    required
                  />
                </div>
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="w-full md:w-1/2">
                    <label
                      htmlFor="email"
                      className="block text-gray-700 font-medium mb-2"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      defaultValue={userData.email}
                      readOnly
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
                      required
                    />
                  </div>
                  <div className="w-full md:w-1/2">
                    <label
                      htmlFor="bloodGroup"
                      className="block text-gray-700 font-medium mb-2"
                    >
                      Blood Group
                    </label>
                    <select
                      id="bloodGroup"
                      name="bloodGroup"
                      defaultValue={userData.bloodGroup}
                      disabled={!isEditable}
                      className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 ${
                        !isEditable ? "bg-gray-100" : ""
                      }`}
                      required
                    >
                      <option value="" disabled>
                        Select your blood group
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
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="w-full md:w-1/2">
                    <label
                      htmlFor="district"
                      className="block text-gray-700 font-medium mb-2"
                    >
                      District
                    </label>
                    <select
                      id="district"
                      name="district"
                      defaultValue={district?.id || ""}
                      onChange={handleDistrict}
                      disabled={!isEditable}
                      className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 ${
                        !isEditable ? "bg-gray-100" : ""
                      }`}
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
                  <div className="w-full md:w-1/2">
                    <label
                      htmlFor="upazilla"
                      className="block text-gray-700 font-medium mb-2"
                    >
                      Upazilla
                    </label>
                    <select
                      id="upazilla"
                      name="upazilla"
                      defaultValue={userData?.upazilla || ""}
                      disabled={!isEditable}
                      className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 ${
                        !isEditable ? "bg-gray-100" : ""
                      }`}
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
                {isEditable && (
                  <div>
                    <label
                      htmlFor="profile-image"
                      className="block text-gray-700 font-medium mb-2"
                    >
                      Profile Image
                    </label>
                    <input
                      id="profile-image"
                      name="profile-image"
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      disabled={!isEditable}
                      className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 ${
                        !isEditable ? "bg-gray-100" : ""
                      }`}
                      required
                    />
                  </div>
                )}
                {isEditable && (
                  <button
                    type="submit"
                    className="w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    Save Changes
                  </button>
                )}
              </form>
            )}
          </div>

          <div className="w-full md:w-1/2 flex justify-center items-center">
            <div className="relative w-48 h-48 md:h-64 md:w-64 rounded-full overflow-hidden bg-gray-100">
              <img
                src={photoURL || ""}
                alt="Profile"
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}