"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import {
  LayoutDashboard,
  Bell,
  Users,
  Car,
  FileText,
  Table,
} from "lucide-react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";

type Booking = {
  id: string;
  date: string;
  status: string;
  driver_name: string;
  vehicle_type: string;
  vehicle_number: string;
  location: string;
  contact_number: string;
  company_name: string;
};

export default function MainPage() {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [booking, setBooking] = useState<Booking[]>([]);
  const [booking1, setBooking1] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [error, setError] = useState("");
  const [ongoingCount, setOngoingCount] = useState<number | null>(null);
  const [pendingCount, setPendingCount] = useState<number | null>(null);

  useEffect(() => {
    const storedEmail = localStorage.getItem("loggedInEmail");
    if (!storedEmail) {
      console.warn("No email found. Redirecting...");
      router.push("/login");
      return;
    }

    setEmail(storedEmail);

    const fetchUser = async () => {
      try {
        const res = await axios.get(
          `https://vendor-dashboard-t7pq.onrender.com/api/user/${storedEmail}`
        );

        setName(res.data.name);
        setRole(res.data.role);
      } catch (err) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const error = err as any;
        console.error(
          "Error fetching user info",
          error.response?.data || error.message
        );
      }
    };

    fetchUser();
  }, [router]);

  const logoutFunc = () => {
    localStorage.removeItem("loggedInEmail");
    router.push("/login");
  };

  const loadactivebookings = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axios.get("https://vendor-dashboard-t7pq.onrender.com/api/auth/activebooking");
      setBooking(res.data);
    } catch (err) {
      console.error("Error fetching bookings:", err);
      setError("Failed to fetch bookings.");
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [error]);

  const allbookings = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axios.get("https://vendor-dashboard-t7pq.onrender.com/api/auth/allbooking");
      setBooking1(res.data);
    } catch (err) {
      console.error("Error fetching bookings:", err);
      setError("Failed to fetch bookings.");
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchCount = useCallback(async () => {
    try {
      const res = await axios.get("https://vendor-dashboard-t7pq.onrender.com/api/auth/ongoing-count");
      setOngoingCount(res.data.count);
    } catch (error) {
      console.error("Error fetching count", error);
    }
  }, []);

  const fetchpending = useCallback(async () => {
    try {
      const res = await axios.get("https://vendor-dashboard-t7pq.onrender.com/api/auth/pending-count");
      setPendingCount(res.data.count);
    } catch (error) {
      console.error("Error fetching count", error);
    }
  }, []);

  useEffect(() => {
    loadactivebookings();
    allbookings();
    fetchCount();
    fetchpending();
  }, [loadactivebookings, allbookings, fetchCount, fetchpending]);

  const handlecompleted = async (bookingId: string) => {
    try {
      const res = await axios.put(
        `https://vendor-dashboard-t7pq.onrender.com/api/auth/update-status/${bookingId}`
      );

      if (res.status === 200) {
        alert("Booking marked as completed!");
        loadactivebookings();
      } else {
        alert("Failed to update booking status.");
      }
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Something went wrong while updating status.");
    }
  };


  return (
    <>
      <div className="grid grid-cols-12 gap-x-2 gap-y-2 h-screen">
        <aside className="col-span-2 border-r p-6 space-y-6 shadow-sm">
          <div className="text-xl text-black font-bold font-sans">
            Vendor Panel
          </div>
          <nav className="space-y-4">
            <a
              href="/booking"
              className="flex gap-2 items-center text-gray-500 hover:text-black"
            >
              <Bell size={18} />
              <span>Bookings</span>
            </a>
            <a
              href="/driver"
              className="flex gap-2 items-center text-gray-500 hover:text-black"
            >
              <Users size={18} />
              <span>Drivers</span>
            </a>
            <a
              href="/vehicles"
              className="flex gap-2 items-center text-gray-500 hover:text-black"
            >
              <Car size={18} />
              <span>Vehicles</span>
            </a>
            <a
              href="/invoice"
              className="flex gap-2 items-center text-gray-500 hover:text-black"
            >
              <FileText size={18} />
              <span>Invoices</span>
            </a>
            <a
              href="/customtable"
              className="flex gap-2 items-center text-gray-500 hover:text-black"
            >
              <Table size={18} />
              <span>Custom Tables</span>
            </a>
            {role === "admin" && (
              <a
                href="/admin"
                className="flex gap-2 items-center text-gray-500 hover:text-black"
              >
                <Users size={18} />
                <span>Staff Management</span>
              </a>
            )}
          </nav>
        </aside>

        <main className="col-span-10 bg-white p-6 space-y-6">
          <div className="flex justify-between items-center col-span-10">
            <h2 className="text-2xl font-semibold text-black">
              <div className="flex items-center gap-2">
                <LayoutDashboard size={18} />
                Dashboard Overview
              </div>
            </h2>
            <div className="text-sm">
              <DropdownMenu>
                <DropdownMenuTrigger className="font-medium">
                  My Account
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>{name || "Loading..."}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    {email || "Email not available"}
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    {role || "Role not available"}
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={logoutFunc}
                    >
                      Logout
                    </Button>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <hr />

          <div className="flex flex-wrap grid-cols-10 gap-4">
            <div className="w-65 rounded-2xl shadow-lg p-4 bg-white">
              <div>Upcoming Bookings</div>
              <br />
              <div>{ongoingCount !== null ? ongoingCount : "Loading..."}</div>
            </div>
            <div className="w-65 rounded-2xl shadow-lg p-4 bg-white">
              <div>Pending Invoices</div>
              <br />
              <div>{pendingCount !== null ? pendingCount : "Loading..."}</div>
            </div>
          </div>

          <Tabs defaultValue="lvbk" className="w-full">
            <TabsList>
              <TabsTrigger value="lvbk">Active Bookings</TabsTrigger>
              <TabsTrigger value="bh">Booking History</TabsTrigger>
            </TabsList>
            <TabsContent value="lvbk">
              <div className="w-full max-w-full overflow-x-auto rounded-lg border border-gray-200 shadow-md">
                <table className="w-full text-sm text-left text-gray-700 divide-y divide-gray-200">
                  <thead className="bg-gray-100 uppercase text-xs font-semibold tracking-wider text-gray-600">
                    <tr>
                      <th className="px-6 py-3">Booking ID</th>
                      <th className="px-6 py-3">Date</th>
                      <th className="px-6 py-3">Location</th>
                      <th className="px-6 py-3">Driver Name</th>
                      <th className="px-6 py-3">Company Name</th>
                      <th className="px-6 py-3">Contact Number</th>
                      <th className="px-6 py-3">Status</th>
                      <th className="px-6 py-3">Update Status</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {loading ? (
                      <tr>
                        <td
                          colSpan={8}
                          className="p-6 text-center text-gray-500"
                        >
                          Content Loading...
                        </td>
                      </tr>
                    ) : booking.length === 0 ? (
                      <tr>
                        <td
                          colSpan={8}
                          className="p-6 text-center text-gray-500"
                        >
                          No records found.
                        </td>
                      </tr>
                    ) : (
                      booking.map((booking) => (
                        <tr
                          key={booking.id}
                          className="hover:bg-gray-50 transition"
                        >
                          <td className="px-6 py-4">{booking.id}</td>
                          <td className="px-6 py-4">{booking.date}</td>
                          <td className="px-6 py-4">{booking.location}</td>
                          <td className="px-6 py-4">{booking.driver_name}</td>
                          <td className="px-6 py-4">{booking.company_name}</td>
                          <td className="px-6 py-4">
                            {booking.contact_number}
                          </td>
                          <td className="px-6 py-4">
                            <span className="inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800">
                              {booking.status}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <button
                              onClick={() => handlecompleted(booking.id)}
                              className="rounded bg-green-600 px-4 py-2 text-xs text-white hover:bg-green-700 transition"
                            >
                              Completed
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </TabsContent>
            <TabsContent value="bh">
              <div className="w-full max-w-full overflow-x-auto rounded-lg border border-gray-200 shadow-md">
                <table className="w-full text-sm text-left text-gray-700 divide-y divide-gray-200">
                  <thead className="bg-gray-100 uppercase text-xs font-semibold tracking-wider text-gray-600">
                    <tr>
                      <th className="px-6 py-3">Booking ID</th>
                      <th className="px-6 py-3">Date</th>
                      <th className="px-6 py-3">Location</th>
                      <th className="px-6 py-3">Driver Name</th>
                      <th className="px-6 py-3">Company Name</th>
                      <th className="px-6 py-3">Contact Number</th>
                      <th className="px-6 py-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {loading ? (
                      <tr>
                        <td
                          colSpan={8}
                          className="p-6 text-center text-gray-500"
                        >
                          Content Loading...
                        </td>
                      </tr>
                    ) : booking1.length === 0 ? (
                      <tr>
                        <td
                          colSpan={8}
                          className="p-6 text-center text-gray-500"
                        >
                          No records found.
                        </td>
                      </tr>
                    ) : (
                      booking1.map((booking1) => (
                        <tr
                          key={booking1.id}
                          className="hover:bg-gray-50 transition"
                        >
                          <td className="px-6 py-4">{booking1.id}</td>
                          <td className="px-6 py-4">{booking1.date}</td>
                          <td className="px-6 py-4">{booking1.location}</td>
                          <td className="px-6 py-4">{booking1.driver_name}</td>
                          <td className="px-6 py-4">{booking1.company_name}</td>
                          <td className="px-6 py-4">
                            {booking1.contact_number}
                          </td>
                          <td className="px-6 py-4">
                            <span
                              className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${
                                booking1.status === "completed"
                                  ? "bg-green-100 text-green-800"
                                  : booking1.status === "cancelled"
                                  ? "bg-red-100 text-red-800"
                                  : "bg-blue-100 text-blue-800"
                              }`}
                            >
                              {booking1.status}
                            </span>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </>
  );
}
