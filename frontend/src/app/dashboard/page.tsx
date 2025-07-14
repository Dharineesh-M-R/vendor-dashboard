"use client";

import { useState, useEffect } from "react";
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
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [error, setError] = useState("");

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
          `http://localhost:5000/api/user/${storedEmail}`
        );

        setName(res.data.name);
        setRole(res.data.role);
      } catch (err) {
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

  const loadactivebookings = async () => {
    try {
      setLoading(true); // Start loading
      const res = await axios.get(
        "http://localhost:5000/api/auth/activebooking"
      );
      setBooking(res.data); // Set the bookings
    } catch (err) {
      console.error("Error fetching bookings:", err);
      setError("Failed to fetch bookings.");
    } finally {
      setLoading(false); // Always stop loading
    }
  };
  useEffect(() => {
    loadactivebookings();
  }, []);

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
              <div>...</div>
            </div>
            <div className="w-65 rounded-2xl shadow-lg p-4 bg-white">
              <div>Pending Invoices</div>
              <br />
              <div>...</div>
            </div>
            <div className="w-65 rounded-2xl shadow-lg p-4 bg-white">
              <div>Drivers Active</div>
              <br />
              <div>...</div>
            </div>
            <div className="w-65 rounded-2xl shadow-lg p-4 bg-white">
              <div>Vehicles Available</div>
              <br />
              <div>...</div>
            </div>
          </div>

          <Tabs defaultValue="account" className="w-[400px]">
            <TabsList>
              <TabsTrigger value="lvbk">Active Bookings</TabsTrigger>
              <TabsTrigger value="bh">Booking History</TabsTrigger>
              <TabsTrigger value="ct">Custom Tables</TabsTrigger>
            </TabsList>
            <TabsContent value="lvbk">
              <table className="min-w-full bg-white text-sm">
                <thead className="bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase">
                  <tr>
                    <td className="px-4 py-3">Booking ID</td>
                    <td className="px-4 py-3">Date</td>
                    <td className="px-4 py-3">Location</td>
                    <td className="px-4 py-3">Driver Name</td>
                    <td className="px-4 py-3">Company Name</td>
                    <td className="px-4 py-3">Contact Number</td>
                    <td className="px-4 py-3">Status</td>
                    <td className="px-4 py-3">Upadte status</td>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan={7} className="p-4 text-center text-gray-500">
                        Content Loading...
                      </td>
                    </tr>
                  ) : booking.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="p-4 text-center text-gray-500">
                        No records found.
                      </td>
                    </tr>
                  ) : (
                    booking.map((booking, idx) => (
                      <tr key={booking.id}>
                        <td className="px-4 py-3">{booking.id}</td>
                        <td className="px-4 py-3">{booking.date}</td>
                        <td className="px-4 py-3">{booking.location}</td>
                        <td className="px-4 py-3">{booking.driver_name}</td>
                        <td className="px-4 py-3">{booking.company_name}</td>
                        <td className="px-4 py-3">{booking.contact_number}</td>
                        <td className="px-4 py-3 bg-blue-100 border border-blue-800 rounded">
                          {booking.status}
                        </td>
                        <td className="px-4 py-3">
                          <button className="px-3 py-1 bg-green-500 text-white text-sm rounded hover:bg-green-600">
                            Completed
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </TabsContent>
            <TabsContent value="bh">...</TabsContent>
            <TabsContent value="ct">...</TabsContent>
          </Tabs>
        </main>
      </div>
    </>
  );
}
