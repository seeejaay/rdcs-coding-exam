import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RoleAPI } from "../../api/role";
import type { Role, CreateRoleData, UpdateRoleData } from "../../types/roles";
import { AxiosError } from "axios";
import { ArrowLeft, Save } from "lucide-react";
import {
  validateRoleName,
  validateRoleDescription,
} from "../../utils/validation";

interface RoleFormProps {
  role?: Role;
}

interface ValidationErrorResponse {
  errors: Record<string, string[]>;
}

export default function RoleForm({ role }: RoleFormProps) {
  const navigate = useNavigate();
  const isEditMode = !!role;

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: role?.name || "",
    description: role?.description || "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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

    // Name validation
    const nameError = validateRoleName(formData.name);
    if (nameError) {
      newErrors.name = nameError;
    }

    // Description validation (optional)
    const descriptionError = validateRoleDescription(formData.description);
    if (descriptionError) {
      newErrors.description = descriptionError;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const submitData = {
        name: formData.name.trim(),
        description: formData.description.trim() || undefined,
      };

      if (isEditMode) {
        await RoleAPI.updateRole(role!.id, submitData as UpdateRoleData);
      } else {
        await RoleAPI.createRole(submitData as CreateRoleData);
      }

      navigate("/roles");
    } catch (error) {
      console.error("Failed to save role:", error);

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
        alert("Failed to save role. Please try again.");
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
          {isEditMode ? "Edit Role" : "Create Role"}
        </h1>
        <button
          onClick={() => navigate("/roles")}
          className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </button>
      </div>

      {/* Form */}
      <div className="bg-white rounded-lg shadow p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Role Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Role Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.name ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter role name (e.g., Admin, Manager)"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Description
              <span className="text-gray-500 text-xs ml-2">(Optional)</span>
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.description ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter role description (max 500 characters)"
            />
            <p className="mt-1 text-xs text-gray-500">
              {formData.description.length}/500 characters
            </p>
            {errors.description && (
              <p className="mt-1 text-sm text-red-600">{errors.description}</p>
            )}
          </div>

          {/* Submit Buttons */}
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => navigate("/roles")}
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
                ? "Update Role"
                : "Create Role"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
