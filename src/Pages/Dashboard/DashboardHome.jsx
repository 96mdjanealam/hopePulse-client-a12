import React, { useContext, useEffect } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import useAxiosSecure from "../../hooks/useAxiosSecure";

export default function DashboardHome() {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  console.log(user);

  useEffect(() => {
    axiosSecure
      .get(`/donationRequests?email=${user?.email}`)
      .then((res) => {
        console.log(res.data);
      })
      .catch(() => {});
  }, [axiosSecure, user?.email]);

  return (
    <div>
      <h4>Welcome {user?.displayName}</h4>
    </div>
  );
}
