import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { RoleAPI } from "../../api/role";
import type { Role } from "../../types/roles";
import { ArrowLeft, FileText, Loader2, Pencil, Shield } from "lucide-react";

export default function ViewRole() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [role, setRole] = useState<Role | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRole = async () => {
      if (!id) {
        navigate("/roles");
        return;
      }
      try {
        setLoading(true);
        const roleData = await RoleAPI.getRoleById(Number(id));
        setRole(roleData);
      } catch (err) {
        console.error("Failed to fetch role:", err);
        setError("Failed to load role data. Please try again later.");
        setTimeout(() => {
          navigate("/roles");
        }, 2000);
      } finally {
        setLoading(false);
      }
    };

    fetchRole();
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-65">
        <Loader2 className="animate-spin h-6 w-6 text-gray-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64 text-red-600">
        {error}
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Role Details</h1>
        <div className="flex space-x-3">
          <Link
            to={`/roles/${role?.id}/edit`}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Pencil className="h-4 w-4 mr-2" />
            Edit
          </Link>
          <button
            type="button"
            onClick={() => navigate("/roles")}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </button>
        </div>
      </div>

      {/* Role Information Card */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {/* Header Section */}
        <div className="bg-linear-to-r from-purple-500 to-purple-600 px-6 py-8">
          <div className="flex items-center">
            <div className="h-20 w-20 rounded-full bg-white flex items-center justify-center">
              <Shield className="h-10 w-10 text-purple-600" />
            </div>
            <div className="ml-6">
              <h2 className="text-2xl font-bold text-white">{role?.name}</h2>
              <p className="text-purple-100">Role Information</p>
            </div>
          </div>
        </div>

        {/* Details Section */}
        <div className="px-6 py-6">
          <div className="grid grid-cols-1 gap-6">
            {/* Role Name */}
            <div>
              <label className="flex items-center text-sm font-medium text-gray-500 mb-2">
                <Shield className="h-4 w-4 mr-2" />
                Role Name
              </label>
              <p className="text-lg text-gray-900">{role?.name}</p>
            </div>

            {/* Description */}
            <div>
              <label className="flex items-center text-sm font-medium text-gray-500 mb-2">
                <FileText className="h-4 w-4 mr-2" />
                Description
              </label>
              <p className="text-lg text-gray-900">
                {role?.description || (
                  <span className="text-gray-400 italic">
                    No description provided
                  </span>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
