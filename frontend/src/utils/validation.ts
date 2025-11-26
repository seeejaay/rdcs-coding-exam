// Validate full name
export const validateFullName = (name: string): string | null => {
  if (!name.trim()) {
    return "Full name is required";
  }
  if (name.trim().length < 2) {
    return "Full name must be at least 2 characters";
  }
  if (name.trim().length > 255) {
    return "Full name must not exceed 255 characters";
  }
  if (!/^[a-zA-Z\s'-]+$/.test(name)) {
    return "Full name can only contain letters, spaces, hyphens, and apostrophes";
  }
  return null;
};

// Validate email
export const validateEmail = (email: string): string | null => {
  if (!email.trim()) {
    return "Email is required";
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return "Invalid email format";
  }
  if (email.length > 255) {
    return "Email must not exceed 255 characters";
  }
  return null;
};

// Validate password
export const validatePassword = (password: string): string | null => {
  if (password.length < 8) {
    return "Password must be at least 8 characters";
  }
  if (password.length > 255) {
    return "Password must not exceed 255 characters";
  }
  if (!/[A-Z]/.test(password)) {
    return "Password must contain at least one uppercase letter";
  }
  if (!/[a-z]/.test(password)) {
    return "Password must contain at least one lowercase letter";
  }
  if (!/[0-9]/.test(password)) {
    return "Password must contain at least one number";
  }
  if (!/[!@#$%^&*(),.?":{}|<>_\-+=\[\]\\\/;'`~]/.test(password)) {
    return "Password must contain at least one special character";
  }
  return null;
};

// Validate password confirmation
export const validatePasswordConfirmation = (
  password: string,
  confirmation: string
): string | null => {
  if (!confirmation) {
    return "Please confirm your password";
  }
  if (password !== confirmation) {
    return "Passwords do not match";
  }
  return null;
};

// Validate required field
export const validateRequired = (
  value: string,
  fieldName: string
): string | null => {
  if (!value || !value.trim()) {
    return `${fieldName} is required`;
  }
  return null;
};

// Validate role name
export const validateRoleName = (name: string): string | null => {
  if (!name.trim()) {
    return "Role name is required";
  }
  if (name.trim().length < 2) {
    return "Role name must be at least 2 characters";
  }
  if (name.trim().length > 100) {
    return "Role name must not exceed 100 characters";
  }
  if (!/^[a-zA-Z\s]+$/.test(name)) {
    return "Role name can only contain letters and spaces";
  }
  return null;
};

// Validate role description (optional field)
export const validateRoleDescription = (description: string): string | null => {
  if (description && description.length > 500) {
    return "Description must not exceed 500 characters";
  }
  if (description && /[<>|]/.test(description)) {
    return "Description contains invalid characters";
  }
  return null;
};
