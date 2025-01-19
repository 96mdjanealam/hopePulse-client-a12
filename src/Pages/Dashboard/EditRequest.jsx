import { useParams } from 'react-router-dom';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import React, { useContext, useEffect, useState } from 'react';
import districts from '../../data/districts.json';
import upazillas from '../../data/upazillas.json';
import { AuthContext } from '../../providers/AuthProvider';
import Swal from 'sweetalert2';

const allDistricts = districts[2]?.data;
const allUpazillas = upazillas[2]?.data;
const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

export default function EditRequest() {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const params = useParams();

  const [donationRequest, setDonationRequest] = useState(null);
  const [districtUpazillas, setDistrictUpazillas] = useState([]);

  useEffect(() => {
    axiosSecure
      .get(`/donationRequest/${params.id}`)
      .then((res) => setDonationRequest(res.data))
      .catch((err) => console.error(err));
  }, [axiosSecure, params.id]);

  const handleDistrict = (e) => {
    const selectedId = e.target.value;
    const upazillas = allUpazillas.filter(
      (item) => item.district_id === selectedId
    );
    setDistrictUpazillas(upazillas);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted');
  };

  if (!donationRequest) return <p>Loading...</p>;

  return (
    <div>
      <p>EditRequest</p>
      <div className="bg-white p-6 rounded-lg shadow-lg w-full mt-8 sm:mt-0">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Edit Donation Request
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Requester Name
            </label>
            <input
              type="text"
              name="requesterName"
              value={user?.displayName || ''}
              readOnly
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-200"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Requester Email
            </label>
            <input
              type="email"
              name="requesterEmail"
              value={user?.email || ''}
              readOnly
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-200"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Recipient Name
            </label>
            <input
              type="text"
              defaultValue={donationRequest.recipientName}
              name="recipientName"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              placeholder="Write recipient name"
            />
          </div>

          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="block text-gray-700 font-medium mb-2">
                Recipient District
              </label>
              <select
                name="district"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                defaultValue={donationRequest.districtId || ''}
                onChange={handleDistrict}
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
              <label className="block text-gray-700 font-medium mb-2">
                Recipient Upazilla
              </label>
              <select
                name="upazilla"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                defaultValue={donationRequest.upazilla || ''}
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
                Hospital Name
              </label>
              <input
                type="text"
                name="hospital"
                defaultValue={donationRequest.hospital || ''}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                placeholder="Hospital name"
              />
            </div>

            <div className="w-1/2">
              <label className="block text-gray-700 font-medium mb-2">
                Blood Group
              </label>
              <select
                name="bloodGroup"
                defaultValue={donationRequest.bloodGroup || ''}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              >
                <option value="" disabled>
                  Select blood group
                </option>
                {bloodGroups.map((group, index) => (
                  <option key={index} value={group}>
                    {group}
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
              defaultValue={donationRequest.fullAddress || ''}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              placeholder="(e.g., Zahir Raihan Rd, Dhaka)"
            />
          </div>

          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="block text-gray-700 font-medium mb-2">Date</label>
              <input
                type="date"
                name="date"
                defaultValue={donationRequest.date || ''}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>

            <div className="w-1/2">
              <label className="block text-gray-700 font-medium mb-2">Time</label>
              <input
                type="time"
                name="time"
                defaultValue={donationRequest.time || ''}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Requester Message
            </label>
            <textarea
              name="message"
              defaultValue={donationRequest.message || ''}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              placeholder="Write your message here."
              rows="2"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-red-600 text-white py-3 px-6 rounded-lg hover:bg-red-700 transition"
          >
            Update Request
          </button>
        </form>
      </div>
    </div>
  );
}
