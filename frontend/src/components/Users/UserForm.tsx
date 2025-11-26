import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserAPI } from "../../api/user";
import { RoleAPI } from "../../api/role";
import type { User, CreateUserData, UpdateUserData } from "../../types/users";
import type { Role } from "../../types/roles";
import { AxiosError } from "axios";
import { ArrowLeft, Save } from "lucide-react";
import {
  validateFullName,
  validateEmail,
  validatePassword,
  validatePasswordConfirmation,
  validateRequired,
} from "../../utils/validation";

interface UserFormProps {
  user?: User;
}

interface ValidationErrorResponse {
  errors: Record<string, string[]>;
}

export default function UserForm({ user }: UserFormProps) {
  const navigate = useNavigate();
  const isEditMode = !!user;

  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    full_name: user?.full_name || "",
    email: user?.email || "",
    password: "",
    password_confirmation: "",
    role_id: user?.role_id?.toString() || "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const rolesData = await RoleAPI.getRoles();
        setRoles(rolesData);

        if (!user && rolesData.length > 0) {
          setFormData((prev) => ({
            ...prev,
            role_id: rolesData[0].id.toString(),
          }));
        }
      } catch (error) {
        console.error("Failed to fetch roles:", error);
        setRoles([]);
      }
    };
    fetchRoles();
  }, [user]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error for this field when user types
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  // Validate form
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // name validation
    const fullNameError = validateFullName(formData.full_name);
    if (fullNameError) {
      newErrors.full_name = fullNameError;
    }

    // email validation
    const emailError = validateEmail(formData.email);
    if (emailError) {
      newErrors.email = emailError;
    }

    // password validation
    if (!isEditMode) {
      const requiredError = validateRequired(formData.password, "Password");
      if (requiredError) {
        newErrors.password = requiredError;
      } else {
        const passwordError = validatePassword(formData.password);
        if (passwordError) {
          newErrors.password = passwordError;
        }
      }
    } else if (formData.password) {
      const passwordError = validatePassword(formData.password);
      if (passwordError) {
        newErrors.password = passwordError;
      }
    }

    // confirm password
    if (formData.password) {
      const confirmError = validatePasswordConfirmation(
        formData.password,
        formData.password_confirmation
      );
      if (confirmError) {
        newErrors.password_confirmation = confirmError;
      }
    }

    // role validation
    const roleError = validateRequired(formData.role_id, "Role");
    if (roleError) {
      newErrors.role_id = roleError;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      if (isEditMode) {
        const updateData: UpdateUserData = {
          full_name: formData.full_name.trim(),
          email: formData.email.trim(),
          role_id: Number(formData.role_id),
        };

        if (formData.password) {
          updateData.password = formData.password;
          updateData.password_confirmation = formData.password_confirmation;
        }

        await UserAPI.updateUser(user!.id, updateData);
      } else {
        const createData: CreateUserData = {
          full_name: formData.full_name.trim(),
          email: formData.email.trim(),
          password: formData.password,
          password_confirmation: formData.password_confirmation,
          role_id: Number(formData.role_id),
        };

        await UserAPI.createUser(createData);
      }

      navigate("/users");
    } catch (error) {
      console.error("Failed to save user:", error);

      const axiosError = error as AxiosError<ValidationErrorResponse>;

      if (axiosError.response?.data?.errors) {
        const backendErrors: Record<string, string> = {};
        Object.entries(axiosError.response.data.errors).forEach(
          ([key, value]) => {
            backendErrors[key] = Array.isArray(value) ? value[0] : value;
          }
        );
        setErrors(backendErrors);
      } else {
        alert("Failed to save user. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          {isEditMode ? "Edit User" : "Create User"}
        </h1>
        <button
          onClick={() => navigate("/users")}
          className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </button>
      </div>

      {/* Form */}
      <div className="bg-white rounded-lg shadow p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Full Name */}
          <div>
            <label
              htmlFor="full_name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="full_name"
              name="full_name"
              value={formData.full_name}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.full_name ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter full name"
            />
            {errors.full_name && (
              <p className="mt-1 text-sm text-red-600">{errors.full_name}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter email address"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password {!isEditMode && <span className="text-red-500">*</span>}
              {isEditMode && (
                <span className="text-gray-500 text-xs ml-2">
                  (Leave blank to keep current password)
                </span>
              )}
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter password"
            />
            <p className="mt-1 text-xs text-gray-500">
              Must be 8+ characters with uppercase, lowercase, number, and
              special character
            </p>
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">{errors.password}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label
              htmlFor="password_confirmation"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Confirm Password{" "}
              {!isEditMode && <span className="text-red-500">*</span>}
            </label>
            <input
              type="password"
              id="password_confirmation"
              name="password_confirmation"
              value={formData.password_confirmation}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.password_confirmation
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
              placeholder="Confirm password"
            />
            {errors.password_confirmation && (
              <p className="mt-1 text-sm text-red-600">
                {errors.password_confirmation}
              </p>
            )}
          </div>

          {/* Role */}
          <div>
            <label
              htmlFor="role_id"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Role <span className="text-red-500">*</span>
            </label>
            <select
              id="role_id"
              name="role_id"
              value={formData.role_id}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.role_id ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">Select a role</option>
              {roles.map((role) => (
                <option key={role.id} value={role.id}>
                  {role.name}
                </option>
              ))}
            </select>
            {errors.role_id && (
              <p className="mt-1 text-sm text-red-600">{errors.role_id}</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => navigate("/users")}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save className="h-4 w-4 mr-2" />
              {loading
                ? "Saving..."
                : isEditMode
                ? "Update User"
                : "Create User"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
