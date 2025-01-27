import { useContext, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";

export default function DonationRequestsDetails() {
  const { userInfo } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const params = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: donationRequest = {}, refetch } = useQuery({
    queryKey: ["donationRequest", params.id],
    queryFn: () =>
      axiosSecure.get(`/donationRequest/${params.id}`).then((res) => res.data),
  });

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleConfirmDonation = () => {
    axiosSecure
      .patch(`/request-status-update/${donationRequest._id}`, {
        status: "inprogress",
        donorName: `${userInfo.name}`,
        donorEmail: `${userInfo.email}`
      })
      .then(() => {
        refetch();
      });
    closeModal();
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Donation Request Details</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <p>
          <strong>Recipient Name:</strong> {donationRequest.recipientName}
        </p>
        <p>
          <strong>Location:</strong>{" "}
          {`${donationRequest.district}, ${donationRequest.upazilla}`}
        </p>
        <p>
          <strong>Hospital:</strong> {donationRequest.hospital}
        </p>
        <p>
          <strong>Blood Group:</strong> {donationRequest.bloodGroup}
        </p>
        <p>
          <strong>Date:</strong> {donationRequest.date}
        </p>
        <p>
          <strong>Time:</strong> {donationRequest.time}
        </p>
        <p>
          <strong>Message:</strong> {donationRequest.message}
        </p>
        <p>
          <strong>Status:</strong> {donationRequest.donationStatus}
        </p>
      </div>

      <button
        onClick={openModal}
        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      >
        Donate
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Confirm Donation</h2>
            <form>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Donor Name
                </label>
                <input
                  type="text"
                  value={userInfo?.name || ""}
                  readOnly
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Donor Email
                </label>
                <input
                  type="email"
                  value={userInfo?.email || ""}
                  readOnly
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={closeModal}
                  className="mr-2 bg-gray-500 text-white py-1 px-4 rounded hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleConfirmDonation}
                  className="bg-blue-500 text-white py-1 px-4 rounded hover:bg-blue-600"
                >
                  Confirm
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
