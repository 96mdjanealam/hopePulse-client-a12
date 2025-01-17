import React, { useContext, useEffect, useState } from "react";
import bloodDrop_img from "../../assets/images/blood_drop.png";
import districts from "../../data/districts.json";
import upazillas from "../../data/upazillas.json";
import axios from "axios";
import { AuthContext } from "../../providers/AuthProvider";

import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const allDistricts = districts[2]?.data || [];
const allUpazillas = upazillas[2]?.data || [];

export default function Profile() {
  const { user, createUser, updateProfileInfo } = useContext(AuthContext);
  const [userData, setUserData] = useState({});
  const [district, setDistrict] = useState({});
  const [districtUpazillas, setDistrictUpazillas] = useState([]);
  const [photo, setPhoto] = useState(null);

  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/user?email=${user?.email}`)
        .then((res) => {
          setUserData(res?.data);
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
          email: form.email.value,
          bloodGroup: form.bloodGroup.value,
          district: district.name,
          upazilla: form.upazilla.value,
          role: "donor",
          status: "active",
          image: response.data.data.display_url,
        };

        console.log(updatedInfo)
        // createUser(updatedInfo.email, form.password.value)
        //   .then((result) => {
        //     updateProfileInfo(updatedInfo.name, updatedInfo.image);
        //     axiosPublic.post("/users", updatedInfo).then((res) => {
        //       console.log(res);
        //     });
        //     Swal.fire({
        //       icon: "success",
        //       title: "User created successfully!",
        //       showConfirmButton: false,
        //       timer: 1500,
        //     }).then(() => {
        //       navigate("/");
        //     });
        //   })
        //   .catch((error) => {
        //     alert(error);
        //   });
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <div>
      {userData && Object.keys(userData).length > 0 && (
        <section className="bg-gray-50 py-10">
          <div className="container mx-auto px-4 flex flex-col-reverse md:flex-row items-center">
            <div className="md:w-1/2 bg-white p-6 rounded-lg shadow-lg w-full mt-8 sm:mt-0">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                Update Profile
              </h2>
              <form onSubmit={handleRegister} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    defaultValue={userData.name}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    required
                  />
                </div>
                <div className="flex gap-4">
                  <div className="w-1/2">
                    <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
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
                  <div className="w-1/2">
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
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
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
                <div className="flex gap-4">
                  <div className="w-1/2">
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
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
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
                      Upazilla
                    </label>
                    <select
                      id="upazilla"
                      name="upazilla"
                      defaultValue={userData?.upazilla || ""}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
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
                <div>
                  <label
                    htmlFor=""
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
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  Update Profile
                </button>
              </form>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <img
                src={bloodDrop_img}
                alt="Profile Update"
                className="w-full max-w-sm object-contain rounded-lg"
              />
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
