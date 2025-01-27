import axios from "axios";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";

const axiosSecure = axios.create({
  baseURL: "http://localhost:5000",
});
export default function useAxiosSecure() {
  // const navigate = useNavigate();
  // const { logOut } = useContext(AuthContext);
  // request interceptor to add authorization header for every secure call to the api
  axiosSecure.interceptors.request.use(
    function (config) {
      const token = localStorage.getItem("access-token");
      config.headers.authorization = `Bearer ${token}`;
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

  // intercepts 401 and 403 status

  axiosSecure.interceptors.response.use(
    function (response) {
      return response;
    },
    async function (error) {
      const status = error.response.status;
     
      if (status === 401 || status === 403) {
        // await logOut();
        // navigate("/registration");
      }
      return Promise.reject(error);
    }
  );

  return axiosSecure;
}
