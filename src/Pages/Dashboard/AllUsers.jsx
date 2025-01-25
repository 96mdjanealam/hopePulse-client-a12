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
      <table className="min-w-full bg-white rounded-lg shadow-md overflow-hidden">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Image
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Email
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Role
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {allUsers.map((user) => (
            <tr key={user._id} className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4 whitespace-nowrap">
                <img
                  src={user.image}
                  alt={user.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {user.email}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {user.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {user.role}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    user.status === "Active"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {user.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                <div className="flex flex-wrap justify-center gap-2">
                  {user.role !== "Admin" && (
                    <button
                      onClick={() => handleAdmin(user._id)}
                      className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition-colors text-sm"
                    >
                      Admin
                    </button>
                  )}
                  {user.role !== "Volunteer" && (
                    <button
                      onClick={() => handleVolunteer(user._id)}
                      className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition-colors text-sm"
                    >
                      Volunteer
                    </button>
                  )}
                  {user.status !== "Active" ? (
                    <button
                      onClick={() => handleUnblock(user._id)}
                      className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 transition-colors text-sm"
                    >
                      Unblock
                    </button>
                  ) : (
                    <button
                      onClick={() => handleBlock(user._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition-colors text-sm"
                    >
                      Block
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}