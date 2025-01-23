import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

export default function AllUsers() {
  const axiosSecure = useAxiosSecure();

  const { data: allUsers = [], refetch } = useQuery({
    queryKey: ["allUsers"],
    queryFn: async () => {
      const response = await axiosSecure.get("/allUsers");
      return response.data;
    },
  });

  const handleBlock = async (id) => {
    try {
      console.log(`Block user with ID: ${id}`);
      await axiosSecure.patch(`/user-update/status/${id}`, {
        status: "Blocked",
      });
      await refetch();
    } catch (error) {
      console.error("Error blocking user:", error);
    }
  };

  const handleUnblock = async (id) => {
    try {
      console.log(`Unblock user with ID: ${id}`);
      await axiosSecure.patch(`/user-update/status/${id}`, {
        status: "Active",
      });
      await refetch();
    } catch (error) {
      console.error("Error unblocking user:", error);
    }
  };

  const handleVolunteer = async (id) => {
    try {
      console.log(`User with ID: ${id} updated to Volunteer role`);
      await axiosSecure.patch(`/user-update/role/${id}`, { role: "Volunteer" });
      await refetch();
    } catch (error) {
      console.error("Error updating role:", error);
    }
  };
  const handleAdmin = async (id) => {
    try {
      console.log(`User with ID: ${id} updated to Admin role`);
      await axiosSecure.patch(`/user-update/role/${id}`, { role: "Admin" });
      await refetch();
    } catch (error) {
      console.error("Error updating role:", error);
    }
  };

  return (
    <div className="overflow-x-auto p-6">
      <table className="min-w-full border border-gray-300 bg-white rounded-lg">
        <thead className="bg-gray-100">
          <tr>
            <th className="border border-gray-300 px-4 py-2 text-left">
              Image
            </th>
            <th className="border border-gray-300 px-4 py-2 text-left">
              Email
            </th>
            <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Role</th>
            <th className="border border-gray-300 px-4 py-2 text-left">
              Status
            </th>
            <th className="border border-gray-300 px-4 py-2 text-center">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {allUsers.map((user) => (
            <tr
              key={user._id}
              className="hover:bg-gray-50 border border-gray-300"
            >
              <td className="border border-gray-300 px-4 py-2">
                <img
                  src={user.image}
                  alt={user.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
              </td>
              <td className="border border-gray-300 px-4 py-2">{user.email}</td>
              <td className="border border-gray-300 px-4 py-2">{user.name}</td>
              <td className="border border-gray-300 px-4 py-2">{user.role}</td>
              <td className="border border-gray-300 px-4 py-2">
                <span
                  className={`px-2 py-1 rounded text-sm ${
                    user.status === "Active"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {user.status}
                </span>
              </td>
              <td className="flex flex-wrap justify-center items-center gap-2 m-2">
                {user.role !== "Admin" && (
                  <button
                    onClick={() => handleAdmin(user._id)}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                  >
                    Admin
                  </button>
                )}
                {user.role !== "Volunteer" && (
                  <button
                    onClick={() => handleVolunteer(user._id)}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                  >
                    Volunteer
                  </button>
                )}
                {user.status !== "Active" ? (
                  <button
                    onClick={() => handleUnblock(user._id)}
                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                  >
                    Unblock
                  </button>
                ) : (
                  <button
                    onClick={() => handleBlock(user._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Block
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
