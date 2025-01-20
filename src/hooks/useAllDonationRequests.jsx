import { useEffect, useState } from "react";
import useAxiosSecure from "./useAxiosSecure";

export default function useAllDonationRequests() {
  const axiosSecure = useAxiosSecure();
  const [allDonationRequests, setAllDonationRequests] = useState([]);

  useEffect(() => {
    axiosSecure.get("/allDonationRequestsAd").then((res) => {
      setAllDonationRequests(res.data);
    });
  }, [axiosSecure]);
  console.log(allDonationRequests);

  return allDonationRequests;
}
