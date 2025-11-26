import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { UserAPI } from "../../api/user";
import type { User } from "../../types/users";
import UserForm from "../../components/Users/UserForm";
import { Loader2 } from "lucide-react";

export default function EditUser() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
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
        const response = await UserAPI.getUserById(Number(id));

        const userData = response;
        setUser(userData);
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
      <div className="flex justify-center items-center h-64">
        <Loader2 className="animate-spin text-gray-600" size={48} />
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="flex justify-center items-center h-64 text-red-600">
        {error}
      </div>
    );
  }
  return <UserForm user={user} />;
}
