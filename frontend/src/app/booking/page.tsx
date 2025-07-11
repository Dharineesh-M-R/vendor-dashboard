"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

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

export default function AllBookings() {
  const [id, setId] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("ongoing");
  const [driver_name, setDriver_name] = useState("");
  const [vehicle_type, setVehicle_type] = useState("");
  const [vehicle_number, setVehicle_number] = useState("");
  const [location, setLocation] = useState("");
  const [contact_number, setContact_number] = useState("");
  const [company_name, setCompany_name] = useState("");
  const [search, setSearch] = useState("");
  const [isOpen, setIsopen] = useState(false);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const toggleform = () => setIsopen(!isOpen);

  const dataentry = async () => {
    if (
      !id ||
      !date ||
      !status ||
      !driver_name ||
      !vehicle_type ||
      !vehicle_number ||
      !location ||
      !contact_number ||
      !company_name
    ) {
      alert("Please fill in all the fields before submitting.");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/booking/pushdetails",
        {
          id,
          date,
          status,
          driver_name,
          vehicle_type,
          vehicle_number,
          location,
          contact_number,
          company_name,
        }
      );

      alert("Booking added successfully");
      fetchBookings();
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        console.error("Axios error:", err.response?.data || err.message);
        alert(
          `Failed to add booking: ${err.response?.data?.error || err.message}`
        );
      } else {
        console.error("Unexpected error:", err);
        alert("An unexpected error occurred.");
      }
    }
  };

  const fetchBookings = async () => {
    try {
      setLoading(true); // Start loading
      const res = await axios.get(
        "http://localhost:5000/api/booking/datafromdb"
      );
      setBookings(res.data); // Set the bookings
    } catch (err) {
      console.error("Error fetching bookings:", err);
      setError("Failed to fetch bookings.");
    } finally {
      setLoading(false); // Always stop loading
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);
  const [loading, setLoading] = useState(true);

  const handleDelete = async (bookingId: string) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/booking/delete/${bookingId}`
      );
      fetchBookings(); // refresh after deletion
    } catch (err: any) {
      console.error("Delete error:", err.response?.data || err.message);
      alert("Failed to delete booking");
    }
  };

  const filteredBookings = bookings.filter((booking) =>
    booking.company_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">All Bookings</h1>
        <div className="flex gap-2">
          <button
            onClick={toggleform}
            className="bg-green-600 hover:bg-green-700 text-white text-sm font-medium px-4 py-2 rounded-md"
          >
            {isOpen ? "Hide Form" : "Manual Booking Form"}
          </button>
          <button
            onClick={() => router.push("/dashboard")}
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-md"
          >
            Go Back
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by Company"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-3 py-2 rounded-md w-full md:w-1/4"
        />
      </div>

      {isOpen && (
        <div className="mb-6 border p-4 rounded-lg bg-gray-50 shadow">
          <h2 className="text-lg font-semibold mb-3">Manual Booking Form</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              value={id}
              onChange={(e) => setId(e.target.value)}
              placeholder="Booking ID"
              className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              placeholder="Date"
              className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              value={driver_name}
              onChange={(e) => setDriver_name(e.target.value)}
              placeholder="Driver Name"
              className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select
              value={vehicle_type}
              onChange={(e) => setVehicle_type(e.target.value)}
              className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">-- Select --</option>
              <option value="Sedan">Sedan</option>
              <option value="Hatchback">Hatchback</option>
              <option value="SUV">SUV</option>
              <option value="Luxury">Luxury</option>
            </select>
            <input
              type="text"
              value={vehicle_number}
              onChange={(e) => setVehicle_number(e.target.value)}
              placeholder="Vehicle Number"
              className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Location"
              className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              value={contact_number}
              onChange={(e) => setContact_number(e.target.value)}
              placeholder="Contact Number"
              className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              value={company_name}
              onChange={(e) => setCompany_name(e.target.value)}
              placeholder="Company Name"
              className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mt-4 flex gap-2">
            <button
              onClick={dataentry}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md"
            >
              Add Booking
            </button>
          </div>
        </div>
      )}

      <div className="overflow-x-auto rounded-lg shadow">
        {loading ? (
          <p>Loading bookings...</p>
        ) : bookings.length === 0 ? (
          <p> No bookings found</p>
        ) : (
          <table className="min-w-full bg-white text-sm">
            <thead className="bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase">
              <tr>
                <th className="px-4 py-3">Booking ID</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Driver</th>
                <th className="px-4 py-3">Vehicle Type</th>
                <th className="px-4 py-3">Vehicle No.</th>
                <th className="px-4 py-3">Location</th>
                <th className="px-4 py-3">Contact</th>
                <th className="px-4 py-3">Company</th>
                <th className="px-4 py-3">Timer / Manually added booking</th>
                <th className="px-4 py-3">Status / Action</th>
                <th className="px-4 py-3">delete</th>
              </tr>
            </thead>
            <tbody>
              {bookings
                .filter((booking) =>
                  booking.company_name
                    .toLowerCase()
                    .includes(search.toLowerCase())
                )
                .map((booking, idx) => (
                  <tr key={booking.id}>
                    <td className="px-4 py-3">{booking.id}</td>
                    <td className="px-4 py-3">{booking.date}</td>
                    <td className="px-4 py-3">{booking.driver_name}</td>
                    <td className="px-4 py-3">{booking.vehicle_type}</td>
                    <td className="px-4 py-3">{booking.vehicle_number}</td>
                    <td className="px-4 py-3">{booking.location}</td>
                    <td className="px-4 py-3">{booking.contact_number}</td>
                    <td className="px-4 py-3">{booking.company_name}</td>
                    <td className="px-4 py-3">Manually added Booking</td>
                    <td className="px-4 py-3">{booking.status}</td>
                    <td className="px-4 py-3">
                      {" "}
                      <button
                        onClick={() => handleDelete(booking.id)}
                        className="text-red-600 hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
