import { Outlet, NavLink } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useUser } from "../../hooks/useUser";

import { Home, User, Shield, LogOut } from "lucide-react";

export default function Layout() {
  const { profile } = useUser();
  const { logout } = useAuth();

  const navigation = [
    {
      name: "Home",
      href: "/",
      icon: Home,
    },
    {
      name: "Users",
      href: "/users",
      icon: User,
    },
    {
      name: "Roles",
      href: "/roles",
      icon: Shield,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* SideBar */}
      <aside className="w-64 bg-white  flex flex-col shadow-sm">
        {/* sidebar header */}.
        <div className="h-16 flex items-center justify-center px-6 border-b">
          <h1 className="text-xl font-semibold text-gray-800 text-center">
            RDCS Exam
          </h1>
        </div>
        {/* user information */}
        <div className="px-6 py-4 border-b">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
              {profile?.full_name.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-800">
                {profile?.full_name || "User"}
              </p>
              <p className="text-xs text-gray-500">
                {profile?.email || "No email provided"}
              </p>
            </div>
          </div>
        </div>
        {/* navigation links */}
        <nav className="flex-1 pl-4 py-6 space-y-2">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              end={item.href === "/"}
              className={({ isActive }) =>
                `flex items-center pl-4 py-3 text-sm font-medium rounded-l-full transition-colors ${
                  isActive
                    ? "bg-gray-100 text-blue-700 border-r-4 border-blue-500"
                    : "text-gray-600 hover:bg-gray-200"
                }`
              }
            >
              <item.icon className="h-5 w-5 mr-3" />
              {item.name}
            </NavLink>
          ))}
        </nav>
        {/* logout button */}
        <div className="px-6 py-4 border-t">
          <button
            onClick={logout}
            className="w-full flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors hover:cursor-pointer"
          >
            <LogOut className="h-5 w-5 mr-2" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
