export interface User {
  id: number;
  full_name: string;
  email: string;
  role_id: number;
}

export interface CreateUserData {
  full_name: string;
  email: string;
  password: string;
  password_confirmation: string;
  role_id: number;
}

export interface UpdateUserData {
  full_name?: string;
  email?: string;
  password?: string;
  password_confirmation?: string;
  role_id?: number;
}
