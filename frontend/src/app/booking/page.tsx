'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const initialBookings = [
  {
    id: 'BK001',
    date: '2025-07-01',
    driver: 'Ravi Kumar',
    vehicleType: 'Sedan',
    vehicleNumber: 'AP 09 AB 1234',
    location: 'Hyderabad',
    contact: '9876543210',
    company: 'ABC Pvt Ltd',
    status: 'Completed',
  },
  {
    id: 'BK002',
    date: '2025-07-02',
    driver: 'Nikhil Reddy',
    vehicleType: 'SUV',
    vehicleNumber: 'TS 08 CD 5678',
    location: 'Vijayawada',
    contact: '8765432109',
    company: 'XYZ Corp',
    status: 'Ongoing',
  },
];

export default function AllBookings() {
  const [bookings, setBookings] = useState(initialBookings);
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [newBooking, setNewBooking] = useState({
    id: '',
    date: '',
    driver: '',
    vehicleType: '',
    vehicleNumber: '',
    location: '',
    contact: '',
    company: '',
    status: 'Ongoing',
  });

  const router = useRouter();

  const filteredBookings = bookings.filter((b) =>
    b.company.toLowerCase().includes(search.toLowerCase())
  );

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setNewBooking((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddBooking = () => {
    setBookings((prev) => [...prev, newBooking]);
    setNewBooking({
      id: '',
      date: '',
      driver: '',
      vehicleType: '',
      vehicleNumber: '',
      location: '',
      contact: '',
      company: '',
      status: 'Ongoing',
    });
    setShowForm(false);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">All Bookings</h1>
        <div className="flex gap-2">
          <button
            onClick={() => setShowForm(true)}
            className="bg-green-600 hover:bg-green-700 text-white text-sm font-medium px-4 py-2 rounded-md"
          >
            Manual Booking
          </button>
          <button
            onClick={() => router.push('/dashboard')}
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

      {/* Manual Booking Form */}
      {showForm && (
        <div className="mb-6 border p-4 rounded-lg bg-gray-50 shadow">
          <h2 className="text-lg font-semibold mb-3">Manual Booking Form</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { label: 'Booking ID', name: 'id' },
              { label: 'Date', name: 'date', type: 'date' },
              { label: 'Driver', name: 'driver' },
              { label: 'Vehicle Type', name: 'vehicleType' },
              { label: 'Vehicle No.', name: 'vehicleNumber' },
              { label: 'Location', name: 'location' },
              { label: 'Contact', name: 'contact' },
              { label: 'Company', name: 'company' },
            ].map(({ label, name, type = 'text' }) => (
              <div key={name}>
                <label className="block text-sm font-medium mb-1">{label}</label>
                <input
                  type={type}
                  name={name}
                  value={(newBooking as any)[name]}
                  onChange={handleInputChange}
                  className="w-full border px-3 py-2 rounded-md"
                />
              </div>
            ))}
          </div>
          <div className="mt-4 flex gap-2">
            <button
              onClick={handleAddBooking}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md"
            >
              Add Booking
            </button>
            <button
              onClick={() => setShowForm(false)}
              className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded-md"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Booking Table */}
      <div className="overflow-x-auto rounded-lg shadow">
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
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredBookings.map((b) => (
              <tr key={b.id} className="hover:bg-gray-50">
                <td className="px-4 py-3">{b.id}</td>
                <td className="px-4 py-3">{b.date}</td>
                <td className="px-4 py-3">{b.driver}</td>
                <td className="px-4 py-3">{b.vehicleType}</td>
                <td className="px-4 py-3">{b.vehicleNumber}</td>
                <td className="px-4 py-3">{b.location}</td>
                <td className="px-4 py-3">{b.contact}</td>
                <td className="px-4 py-3">{b.company}</td>
                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      b.status === 'Completed'
                        ? 'bg-green-100 text-green-700'
                        : b.status === 'Ongoing'
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {b.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
