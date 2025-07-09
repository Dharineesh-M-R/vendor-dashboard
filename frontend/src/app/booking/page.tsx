'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function AllBookings() {
  const[id,setId]=useState('');
  const[date,setDate]=useState('');
  const[status,setStatus]=useState('');
  const[driverName,setDrivername]=useState('');
  const[vehicletype,setVehicletype]=useState('');
  const[vehiclenumber,setVehiclenumber]=useState('');
  const[location,setLocation]=useState('');
  const[contactnumber,setContactnumber]=useState('');
  const [search, setSearch] = useState('');
  const router = useRouter();
  
  const dataentry = async () => {
    const res = await axios.post('',{id,date,status,driverName,vehicletype,vehiclenumber,location,contactnumber});
  }


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
            <input 
            type="text" 
            value={id} 
            onChange={(e) => setId(e.target.value)} 
            placeholder='Booking ID'
            className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input 
            type="date" 
            value={date} 
            onChange={(e) => setDate(e.target.value)} 
            placeholder='Date'
            className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input 
            type="text" 
            value={status} 
            onChange={(e) => setStatus(e.target.value)} 
            placeholder='Status'
            className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input 
            type="text" 
            value={driverName} 
            onChange={(e) => setDrivername(e.target.value)} 
            placeholder='Driver Name'
            className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input 
            type="text" 
            value={vehicletype} 
            onChange={(e) => setVehicletype(e.target.value)} 
            placeholder='Vehicle Type'
            className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input 
            type="text" 
            value={vehiclenumber} 
            onChange={(e) => setVehiclenumber(e.target.value)} 
            placeholder='Booking ID'
            className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input 
            type="text" 
            value={location} 
            onChange={(e) => setLocation(e.target.value)} 
            placeholder='Booking ID'
            className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input 
            type="text" 
            value={contactnumber} 
            onChange={(e) => setContactnumber(e.target.value)} 
            placeholder='Booking ID'
            className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            
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
              <th className="px-4 py-3">Status / Action</th>
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
                  {b.status === 'Not Yet Accepted' ? (
                    <div className="flex flex-col gap-1">
                      <button
                        onClick={() => handleUpdateStatus(b.id, 'Accepted')}
                        className="bg-green-600 hover:bg-green-700 text-white text-xs px-2 py-1 rounded"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => handleUpdateStatus(b.id, 'Rejected')}
                        className="bg-red-600 hover:bg-red-700 text-white text-xs px-2 py-1 rounded"
                      >
                        Reject
                      </button>
                      <button
                        onClick={() => handleUpdateStatus(b.id, 'Pushed to Open Market')}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white text-xs px-2 py-1 rounded"
                      >
                        Push to Open Market
                      </button>
                    </div>
                  ) : (
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        b.status === 'Completed'
                          ? 'bg-green-100 text-green-700'
                          : b.status === 'Ongoing'
                          ? 'bg-blue-100 text-blue-700'
                          : b.status === 'Accepted'
                          ? 'bg-purple-100 text-purple-700'
                          : b.status === 'Rejected'
                          ? 'bg-red-100 text-red-700'
                          : b.status === 'Pushed to Open Market'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {b.status}
                    </span>
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
