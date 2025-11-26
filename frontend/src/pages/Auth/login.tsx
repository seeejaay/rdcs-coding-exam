import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../../hooks/useStateContext";
import { useAuth } from "../../hooks/useAuth";
import type { ApiErrorResponse } from "../../types/error";

import { Eye, EyeOff, Mail, Lock, Loader2 } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { setUser, setToken } = useStateContext();
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await login(email, password);
      const token = response.data.token;
      const user = response.data.user;
      setToken(token);
      setUser(user);
      navigate("/");
    } catch (err) {
      const apiError = err as ApiErrorResponse;
      setError(
        apiError.response?.data?.message || "An unexpected error occurred."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-linear-to-r from-blue-500 to-purple-600 via-purple-500 w-full flex-col px-4">
      <div
        className="w-full max-w-md p-8 bg-gray-100 rounded-xl
            shadow-[0_-10px_40px_hsla(0,0%,0%,0.1)] 
        "
      >
        <h1 className="text-2xl md:text-4xl font-bold mb-2 text-gray-800 text-center">
          Welcome Back!
        </h1>
        <p className="mb-8 text-gray-700 max-w-md px-4 text-center ">
          Sign In to continue.
        </p>
        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded mt-4 border-l-2 border-red-500">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="space-y-4 mt-4 flex items-start justify-center flex-col w-full ">
            <div className="w-full flex flex-col items-start justify-center">
              <label
                htmlFor="email"
                className="block text-gray-700 font-semibold mb-2"
              >
                <Mail className="inline-block mr-2" size={16} />
                Email
              </label>
              <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  name="email"
                  id="email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="example@example.com"
                  className="w-full pl-10 pr-3 py-3 bg-white border border-gray-300 rounded-lg 
                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                  transition-all"
                />
              </div>
            </div>

            <div className="w-full flex flex-col items-start justify-center mb-8">
              <label
                htmlFor="password"
                className="block text-gray-700 font-semibold mb-2"
              >
                <Lock className="inline-block mr-2" size={16} />
                Password
              </label>
              <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Enter your password"
                  className="w-full pl-10 pr-3 py-3 bg-white border border-gray-300 rounded-lg 
                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                  transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-800"
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>
            </div>

            <div className="w-full flex items-center justify-between">
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold
                    hover:bg-blue-700 active:scale-[0.98] 
                    disabled:opacity-50 disabled:cursor-not-allowed
                    transition-all shadow-md hover:shadow-lg hover:cursor-pointer"
                disabled={loading}
              >
                {loading ? (
                  <Loader2 className="animate-spin mx-auto" />
                ) : (
                  "Sign In"
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}
