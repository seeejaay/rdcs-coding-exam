import { createContext } from "react";

export interface User {
  id: number;
  full_name: string;
  email: string;
  role_id?: number;
}

export interface StateContextType {
  user: User | null;
  token: string | null;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
}

export const StateContext = createContext<StateContextType>({
  user: null,
  token: null,
  setUser: () => {},
  setToken: () => {},
});
