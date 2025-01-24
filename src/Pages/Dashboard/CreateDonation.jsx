import React, { useContext, useEffect, useState } from "react";
import districts from "../../data/districts.json";
import upazillas from "../../data/upazillas.json";
import { AuthContext } from "../../providers/AuthProvider";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const allDistricts = districts[2]?.data;
const allUpazillas = upazillas[2]?.data;
const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

export default function CreateDonation() {
  const [userInfo, setUserInfo] = useState({});
  const { user } = useContext(AuthContext);
  // const {
  //   register,
  //   handleSubmit,
  //   watch,
  //   formState: { errors },
  // } = useForm({
  //   defaultValues: {
  //     requesterName: user?.displayName || "",
  //     requesterEmail: user?.email || "",
  //   },
  // });

  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/user?email=${user?.email}`)
        .then((res) => {
          setUserInfo(res.data);
        })
        .catch((err) => {
          console.error("Error fetching user data:", err);
        });
    }
  }, [user?.email, axiosSecure]);
  console.log(userInfo.status);

  const [district1, setDistrict] = useState({});

  const [districtUpazillas, setDistrictUpazillas] = useState([]);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userInfo.status === "Blocked") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "You cannot make donation request!",
      });
      return;
    }
    console.log("submit clicked");
    const form = e.target;
    const donationRequest = {
      requesterEmail: form.requesterEmail.value,
      requesterName: form.requesterName.value,
      district: district1.name,
      upazilla: form.upazilla.value,
      hospital: form.hospital.value,
      recipientName: form.recipientName.value,
      bloodGroup: form.bloodGroup.value,
      fullAddress: form.fullAddress.value,
      date: form.date.value,
      time: form.time.value,
      message: form.message.value,
      donationStatus: "pending",
    };

    axiosSecure.post("/createDonationRequest", donationRequest).then((res) => {
      console.log(res);
    }).then(()=>{
      Swal.fire({
        icon: "success",
        title: "Donation request created successfully",
        showConfirmButton: false,
        timer: 1500
      })
      form.reset();
    }).catch(()=>{
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    });
  };

  return (
    <div className="bg-white p-6  rounded-lg shadow-lg w-full mt-8 sm:mt-0">
      {userInfo.status === "Blocked" && (
        <p className="text-center py-2 text-lg font-semibold text-red-500">
          Note: You cannot create donation requests
        </p>
      )}
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Create Donation request
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Requester Name
          </label>
          <input
            type="text"
            name="requesterName"
            value={user?.displayName || ""}
            readOnly
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 cursor-not-allowed bg-gray-200"
          />
        </div>

        <div>
          <label htmlFor="" className="block text-gray-700 font-medium mb-2">
            Requester Email
          </label>
          <input
            type="email"
            name="requesterEmail"
            value={user?.email || ""}
            readOnly
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 cursor-not-allowed bg-gray-200"
          />
        </div>
        <div>
          <label htmlFor="" className="block text-gray-700 font-medium mb-2">
            Recipient Name
          </label>
          <input
            type="text"
            name="recipientName"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
            placeholder="Write recipient name"
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

              {bloodGroups.map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
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
            required
          />
        </div>

        <div className="flex gap-4">
          <div className="w-1/2">
            <label className="block text-gray-700 font-medium mb-2">Date</label>
            <input
              type="date"
              name="date"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
            />
          </div>

          <div className="w-1/2">
            <label className="block text-gray-700 font-medium mb-2">Time</label>
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
            required
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
  );
}
