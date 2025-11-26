import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { RoleAPI } from "../../api/role";
import type { Role } from "../../types/roles";
import RoleForm from "../../components/Roles/RoleForm";
import { Loader2 } from "lucide-react";

export default function EditRole() {
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
        const response = await RoleAPI.getRoleById(Number(id));

        const roleData = response;
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
      <div className="flex justify-center items-center h64">
        <Loader2 className="animate-spin text-gray-600" size={48} />
      </div>
    );
  }

  if (error || !role) {
    return (
      <div className="flex justify-center items-center h-64 text-red-600">
        {error}
      </div>
    );
  }

  return <RoleForm role={role} />;
}
