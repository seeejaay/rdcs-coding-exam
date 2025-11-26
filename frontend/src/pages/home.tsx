import { useUser } from "../hooks/useUser";

export default function Home() {
  const { profile, loading } = useUser();

  if (loading) {
    return <p className="text-lg text-gray-600">Loading...</p>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow p-6">
        <h1 className="text-3xl font-bold text-gray-800">Home Page</h1>
        <p className="mt-4 text-lg text-gray-600">
          Welcome,{" "}
          <span className="font-semibold text-blue-600">
            {profile?.full_name}!
          </span>
        </p>
        <p className="text-sm text-gray-500 mt-2">Email: {profile?.email}</p>
      </div>
    </div>
  );
}
