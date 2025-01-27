import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "https://hope-pulse-server.vercel.app",
});

export default function useAxiosPublic() {
  return axiosPublic;
}