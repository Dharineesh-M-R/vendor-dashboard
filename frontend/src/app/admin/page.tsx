"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
};

export default function AdminPage() {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [unauthorized, setUnauthorized] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      const email = localStorage.getItem("loggedInEmail");

      if (!email) {
        setUnauthorized(true);
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          "http://localhost:5000/api/admin/all-users",
          {
            headers: {
              "x-user-email": email,
            },
          }
        );

        setUsers(response.data);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        if (error.response && error.response.status === 403) {
          setUnauthorized(true);
        } else {
          console.error("Error fetching users:", error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const makeAsAdmin = async (userId: string) => {
    try {
      const email = localStorage.getItem("loggedInEmail");
      await axios.put(
        `http://localhost:5000/api/admin/make-admin`,
        { userId },
        { headers: { "x-user-email": email } }
      );
      setUsers((prev) =>
        prev.map((user) =>
          user.id === userId ? { ...user, role: "admin" } : user
        )
      );
    } catch (error) {
      console.error("Error making admin:", error);
    }
  };

  const makeAsStaff = async (userId: string) => {
    try {
      const email = localStorage.getItem("loggedInEmail");
      await axios.put(
        `http://localhost:5000/api/admin/make-staff`,
        { userId },
        { headers: { "x-user-email": email } }
      );
      setUsers((prev) =>
        prev.map((user) =>
          user.id === userId ? { ...user, role: "staff" } : user
        )
      );
    } catch (error) {
      console.error("Error making staff:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-xl space-y-4">
        <span className="animate-pulse text-gray-600">Loading...</span>
        <button
          onClick={() => router.push("/dashboard")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md shadow"
        >
          Go Back to Dashboard
        </button>
      </div>
    );
  }

  if (unauthorized) {
    return (
      <div className="flex flex-col items-center justify-center h-screen space-y-4">
        <p className="text-red-600 text-lg font-semibold">
          You do not have access to this page.
        </p>
        <button
          onClick={() => router.push("/dashboard")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md shadow"
        >
          Go Back to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800">User Management</h1>
        <button
          onClick={() => router.push("/dashboard")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow"
        >
          Go Back to Dashboard
        </button>
      </div>

      <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
        <table className="min-w-full table-auto rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-blue-100 text-gray-700 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Name</th>
              <th className="py-3 px-6 text-left">Email</th>
              <th className="py-3 px-6 text-left">Role</th>
              <th className="py-3 px-6 text-left">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm font-medium">
            {users.map((user) => (
              <tr
                key={user.id}
                className="border-b border-gray-200 hover:bg-blue-50 transition duration-150"
              >
                <td className="py-3 px-6">{user.name}</td>
                <td className="py-3 px-6">{user.email}</td>
                <td className="py-3 px-6 capitalize">{user.role}</td>
                <td className="py-3 px-6">
                  {user.role === "admin" ? (
                    <button
                      onClick={() => makeAsStaff(user.id)}
                      className="text-red-600 hover:underline"
                    >
                      Make as Staff
                    </button>
                  ) : (
                    <button
                      onClick={() => makeAsAdmin(user.id)}
                      className="text-green-600 hover:underline"
                    >
                      Make as Admin
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
