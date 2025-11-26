import { Routes, Route, Navigate } from "react-router-dom";
import { useStateContext } from "./hooks/useStateContext";
import "./App.css";
import Login from "./pages/Auth/login";

import Home from "./pages/home";
import Layout from "./components/Layout/layout";
import UserList from "./pages/Users/userList";
import CreateUser from "./pages/Users/createUser";
import EditUser from "./pages/Users/editUser";
import ViewUser from "./pages/Users/viewUser";
import RoleList from "./pages/Roles/roleList";
import CreateRole from "./pages/Roles/createRole";
import EditRole from "./pages/Roles/editRole";
import ViewRole from "./pages/Roles/viewRole";
function App() {
  const { token } = useStateContext();

  return (
    <Routes>
      {/* Public route */}
      <Route
        path="/login"
        element={token ? <Navigate to="/" replace /> : <Login />}
      />

      {/* Protected routes with Layout */}
      {token ? (
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          {/* User Management */}
          <Route path="/users" element={<UserList />} />
          <Route path="/users/create" element={<CreateUser />} />
          <Route path="/users/:id/edit" element={<EditUser />} />
          <Route path="/users/:id" element={<ViewUser />} />
          {/* Role Management */}
          <Route path="/roles" element={<RoleList />} />
          <Route path="/roles/create" element={<CreateRole />} />
          <Route path="/roles/:id/edit" element={<EditRole />} />
          <Route path="/roles/:id" element={<ViewRole />} />
        </Route>
      ) : (
        // Default Route
        <Route path="*" element={<Navigate to="/login" replace />} />
      )}
    </Routes>
  );
}

export default App;
