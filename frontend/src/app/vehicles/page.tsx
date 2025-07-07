'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

type Vehicle = {
  vehicleType: string;
  plateNumber: string;
  model: string;
  availability: string;
  conditionStatus: string;
  insurance: string;
};

const VendorVehicleManagement = () => {
  const router = useRouter();

  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<Vehicle>({
    vehicleType: '',
    plateNumber: '',
    model: '',
    availability: 'Available',
    conditionStatus: 'Good',
    insurance: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddVehicle = () => {
    setVehicles([...vehicles, formData]);
    setFormData({
      vehicleType: '',
      plateNumber: '',
      model: '',
      availability: 'Available',
      conditionStatus: 'Good',
      insurance: '',
    });
    setShowForm(false);
  };

  const handleRemoveVehicle = (index: number) => {
    const updated = [...vehicles];
    updated.splice(index, 1);
    setVehicles(updated);
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Vehicle Management</h1>
        <button
          onClick={() => router.push('/dashboard')}
          className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 transition"
        >
          Go Back
        </button>
      </div>

      {/* Toggle Form */}
      <button
        onClick={() => setShowForm(!showForm)}
        className="mb-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {showForm ? 'Close Form' : 'Add Vehicle'}
      </button>

      {/* Form */}
      {showForm && (
        <div className="bg-white shadow-md rounded p-6 mb-6 border border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="vehicleType"
              value={formData.vehicleType}
              onChange={handleInputChange}
              placeholder="Vehicle Type"
              className="border p-2 rounded w-full"
            />
            <input
              type="text"
              name="plateNumber"
              value={formData.plateNumber}
              onChange={handleInputChange}
              placeholder="Plate Number"
              className="border p-2 rounded w-full"
            />
            <input
              type="text"
              name="model"
              value={formData.model}
              onChange={handleInputChange}
              placeholder="Model"
              className="border p-2 rounded w-full"
            />
            <select
              name="availability"
              value={formData.availability}
              onChange={handleInputChange}
              className="border p-2 rounded w-full"
            >
              <option value="Available">Available</option>
              <option value="Unavailable">Unavailable</option>
            </select>
            <select
              name="conditionStatus"
              value={formData.conditionStatus}
              onChange={handleInputChange}
              className="border p-2 rounded w-full"
            >
              <option value="Good">Good</option>
              <option value="Needs Maintenance">Needs Maintenance</option>
            </select>
            <input
              type="text"
              name="insurance"
              value={formData.insurance}
              onChange={handleInputChange}
              placeholder="Insurance Details"
              className="border p-2 rounded w-full"
            />
          </div>
          <button
            onClick={handleAddVehicle}
            className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Submit
          </button>
        </div>
      )}

      {/* Vehicles Table */}
      <div className="overflow-x-auto bg-white shadow-md rounded border border-gray-200">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2">Vehicle Type</th>
              <th className="px-4 py-2">Plate Number</th>
              <th className="px-4 py-2">Model</th>
              <th className="px-4 py-2">Availability</th>
              <th className="px-4 py-2">Condition</th>
              <th className="px-4 py-2">Insurance</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {vehicles.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-4 text-gray-500">
                  No vehicles added yet.
                </td>
              </tr>
            ) : (
              vehicles.map((vehicle, index) => (
                <tr key={index} className="border-t">
                  <td className="px-4 py-2">{vehicle.vehicleType}</td>
                  <td className="px-4 py-2">{vehicle.plateNumber}</td>
                  <td className="px-4 py-2">{vehicle.model}</td>
                  <td className="px-4 py-2">{vehicle.availability}</td>
                  <td className="px-4 py-2">{vehicle.conditionStatus}</td>
                  <td className="px-4 py-2">{vehicle.insurance}</td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => handleRemoveVehicle(index)}
                      className="text-red-600 hover:underline"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VendorVehicleManagement;
