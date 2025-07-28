"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import axios from "axios";
import { ToastContainer } from "react-toastify";

type Vehicle = {
  vehid: string;
  vehicle_type: string;
  plate_number: string;
  model: string;
  availability: string;
  condition_check_status: string;
  vehicle_insurance: string;
};

const VendorVehicleManagement = () => {
  const router = useRouter();

  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [vehid, setvehid] = useState("VEH");
  const [vehicle_type, setvehicle_type] = useState("");
  const [plate_number, setplate_number] = useState("");
  const [model, setmodel] = useState("");
  const [availability, setavailability] = useState("");
  const [condition_check_status, setcondition_check_status] = useState("");
  const [vehicle_insurance, setvehicle_insurance] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const handlesubmit = async () => {
    if (
      !vehid ||
      !vehicle_type ||
      !plate_number ||
      !model ||
      !availability ||
      !condition_check_status ||
      !vehicle_insurance
    ) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/vehicles/senddata", {
        vehid,
        vehicle_type,
        plate_number,
        model,
        availability,
        condition_check_status,
        vehicle_insurance,
      });

      alert("Vehicle added successfully!");
      fetchdata();

      // Clear form
      setvehid("");
      setvehicle_type("");
      setplate_number("");
      setmodel("");
      setavailability("");
      setcondition_check_status("");
      setvehicle_insurance("");
    } catch (error) {
      console.error("Error submitting vehicle:", error);
      alert("Failed to add vehicle.");
    }
  };

  const handleDelete = async (vehid: string) => {
    try {
      await axios.delete(`http://localhost:5000/api/vehicles/delete/${vehid}`);
      alert("Vehicle deleted successfully!");
      fetchdata();
    } catch (error) {
      console.error("Delete error:", error);
      alert("Failed to delete vehicle.");
    }
  };

  const fetchdata = useCallback( async () => {
    try {
      setLoading(true);
      console.log(loading);
      const res = await axios.get("http://localhost:5000/api/vehicles/getdata");
      setVehicles(res.data);
    } catch (err) {
      console.error("Error fetching vehicles:", err);
      setError("Failed to fetch vehicles.");
      console.log(error);
    } finally {
      setLoading(false);
    }
  },[error,loading]);

  useEffect(() => {
    fetchdata();
  }, [fetchdata]);

  return (
    <div className="p-6 w-full">
      <ToastContainer />
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Vehicle Management</h1>
        <button
          onClick={() => router.push("/dashboard")}
          className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 transition"
        >
          Go Back
        </button>
      </div>

      <Tabs defaultValue="view" className="w-full">
        <TabsList>
          <TabsTrigger value="view">View</TabsTrigger>
          <TabsTrigger value="addveh">Add Vehicle</TabsTrigger>
          <TabsTrigger value="delveh">Delete Vehicle</TabsTrigger>
        </TabsList>

        {/* View Vehicles */}
        <TabsContent value="view">
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
                  vehicles.map((vehicle) => (
                    <tr key={vehicle.vehid} className="border-t">
                      <td className="px-4 py-2">{vehicle.vehicle_type}</td>
                      <td className="px-4 py-2">{vehicle.plate_number}</td>
                      <td className="px-4 py-2">{vehicle.model}</td>
                      <td className="px-4 py-2">{vehicle.availability}</td>
                      <td className="px-4 py-2">{vehicle.condition_check_status}</td>
                      <td className="px-4 py-2">{vehicle.vehicle_insurance}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </TabsContent>

        {/* Add Vehicle */}
        <TabsContent value="addveh">
          <div className="bg-white shadow-md rounded p-6 mb-6 border border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                value={vehid}
                onChange={(e) => setvehid(e.target.value)}
                placeholder="Vehicle ID"
                className="border p-2 rounded w-full"
              />
              <input
                type="text"
                value={vehicle_type}
                onChange={(e) => setvehicle_type(e.target.value)}
                placeholder="Vehicle Type"
                className="border p-2 rounded w-full"
              />
              <input
                type="text"
                value={plate_number}
                onChange={(e) => setplate_number(e.target.value)}
                placeholder="Plate Number"
                className="border p-2 rounded w-full"
              />
              <input
                type="text"
                value={model}
                onChange={(e) => setmodel(e.target.value)}
                placeholder="Model"
                className="border p-2 rounded w-full"
              />
              <select
                value={availability}
                onChange={(e) => setavailability(e.target.value)}
                className="border p-2 rounded w-full"
              >
                <option value="">Availability</option>
                <option value="Available">Available</option>
                <option value="Unavailable">Unavailable</option>
              </select>
              <select
                value={condition_check_status}
                onChange={(e) => setcondition_check_status(e.target.value)}
                className="border p-2 rounded w-full"
              >
                <option value="">Vehicle condition</option>
                <option value="Good">Good</option>
                <option value="Needs Maintenance">Needs Maintenance</option>
              </select>
              <input
                type="text"
                value={vehicle_insurance}
                onChange={(e) => setvehicle_insurance(e.target.value)}
                placeholder="Insurance Details"
                className="border p-2 rounded w-full"
              />
            </div>
            <button
              onClick={handlesubmit}
              className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Submit
            </button>
          </div>
        </TabsContent>

        {/* Delete Vehicles */}
        <TabsContent value="delveh">
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
                  vehicles.map((vehicle) => (
                    <tr key={vehicle.vehid} className="border-t">
                      <td className="px-4 py-2">{vehicle.vehicle_type}</td>
                      <td className="px-4 py-2">{vehicle.plate_number}</td>
                      <td className="px-4 py-2">{vehicle.model}</td>
                      <td className="px-4 py-2">{vehicle.availability}</td>
                      <td className="px-4 py-2">{vehicle.condition_check_status}</td>
                      <td className="px-4 py-2">{vehicle.vehicle_insurance}</td>
                      <td className="px-4 py-2">
                        <button
                          onClick={() => handleDelete(vehicle.vehid)}
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
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default VendorVehicleManagement;
