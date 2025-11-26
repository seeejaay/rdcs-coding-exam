import { useEffect, useState } from "react";
import { UserAPI } from "../api/user";
import type { User } from "../types/users";

export const useUser = () => {
  const [profile, setProfile] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const response = await UserAPI.getProfile();
        setProfile(response.data); // Access nested data property
      } catch (err) {
        console.error("Failed to fetch user profile:", err);
        setError("Failed to load user data");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const getUsers = async () => {
    try {
      setLoading(true);
      const response = await UserAPI.getUsers();
      return response.data; // Access nested data property
    } catch (err) {
      console.error("Failed to fetch users:", err);
      setError("Failed to load users");
      return [];
    } finally {
      setLoading(false);
    }
  };

  return { profile, loading, error, getUsers };
};
