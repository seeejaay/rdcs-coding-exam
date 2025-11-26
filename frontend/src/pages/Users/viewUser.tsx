import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { UserAPI } from "../../api/user";
import { RoleAPI } from "../../api/role";
import type { User } from "../../types/users";
import type { Role } from "../../types/roles";
import {
  ArrowLeft,
  ClipboardList,
  Loader2,
  Mail,
  Pencil,
  Shield,
  UserIcon,
} from "lucide-react";

export default function ViewUser() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<Role | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      if (!id) {
        navigate("/users");
        return;
      }
      try {
        setLoading(true);
        const [userData, rolesData] = await Promise.all([
          UserAPI.getUserById(Number(id)),
          RoleAPI.getRoles(),
        ]);
        setUser(userData);
        const userRole =
          rolesData.find((r: Role) => r.id === userData.role_id) || null;
        setRole(userRole);
      } catch (err) {
        console.error("Failed to fetch user:", err);
        setError("Failed to load user data. Please try again later.");
        setTimeout(() => {
          navigate("/users");
        }, 2000);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-65">
        <Loader2 className="animate-spin h-6 w-6 text-gray-600" />
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="text-red-500 text-center mt-10">
        {error || "User not found."}
      </div>
    );
  }
  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800">User Details</h1>
        <div className="flex space-x-3">
          <Link
            to={`/users/${user.id}/edit`}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Pencil className="h-4 w-4 mr-2" />
            Edit
          </Link>
          <button
            type="button"
            onClick={() => navigate("/users")}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors
          cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="bg-linear-to-r from-blue-500 to-blue-600 px-6 py-8">
          <div className="flex items-center">
            <div className="h-20 w-20 rounded-full bg-white flex items-center justify-center">
              <UserIcon className="h-10 w-10 text-blue-600" />
            </div>
            <div className="ml-6">
              <h2 className="text-2xl font-bold text-white">
                {user.full_name}
              </h2>
              <p className="text-blue-100">{user.email}</p>
            </div>
          </div>
        </div>

        <div className="px-6 py-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor=""
                className="flex items-center text-sm font-medium text-gray-500 mb-2"
              >
                <UserIcon className="h-4 w-4 mr-2" />
                Full Name
              </label>
              <p className="text-lg text-gray-900">{user.full_name}</p>
            </div>
            <div>
              <label
                htmlFor=""
                className="flex items-center text-sm font-medium text-gray-500 mb-2"
              >
                <Mail className="h-4 w-4 mr-2" />
                Email Address
              </label>
              <p className="text-lg text-gray-900">{user.email}</p>
            </div>
            {/* Role */}
            <div>
              <label className="flex items-center text-sm font-medium text-gray-500 mb-2">
                <Shield className="h-4 w-4 mr-2" />
                Role
              </label>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-blue-100 text-blue-800">
                {role?.name || "N/A"}
              </span>
            </div>
            <div>
              {role?.description && (
                <div>
                  <label
                    htmlFor=""
                    className="flex items-center text-sm font-medium text-gray-500 mb-2"
                  >
                    <ClipboardList className="h-4 w-4 mr-2" />
                    Role Description
                  </label>
                  <p className="text-lg text-gray-900">{role.description}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>

    /* // <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
    //   <h2 className="text-2xl font-semibold mb-4">User Details</h2>
    //   <div className="mb-4">
    //     <h3 className="text-lg font-medium">Name:</h3>
    //     <p className="text-gray-700">{user.full_name}</p>
    //   </div>
    //   <div className="mb-4">
    //     <h3 className="text-lg font-medium">Email:</h3>
    //     <p className="text-gray-700">{user.email}</p>
    //   </div>
    //   <div className="mb-4">
    //     <h3 className="text-lg font-medium">Role:</h3>
    //     <p className="text-gray-700">{role ? role.name : "Role not found"}</p>
    //   </div>
    // </div> */
  );
}
