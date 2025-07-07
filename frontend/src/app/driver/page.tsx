"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

type Driver = {
  employeeId: string;
  name: string;
  joiningDate: string;
  vehicleType: string;
  vehicleNumber: string;
  panNumber: string;
  aadhar: string;
  licenseNumber: string;
  phone: string;
  email: string;
  address: string;
  salary: string;
  department: string;
  accountNumber: string;
  ifsc: string;
};

export default function DriverManagementPage() {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [formData, setFormData] = useState<Driver>({
    employeeId: "",
    name: "",
    joiningDate: "",
    vehicleType: "",
    vehicleNumber: "",
    panNumber: "",
    aadhar: "",
    licenseNumber: "",
    phone: "",
    email: "",
    address: "",
    salary: "",
    department: "",
    accountNumber: "",
    ifsc: "",
  });

  const router = useRouter();

  const fetchDrivers = async () => {
    try {
      const res = await axios.get("/api/drivers");
      setDrivers(res.data);
    } catch (err) {
      console.error("Error fetching drivers:", err);
    }
  };

  useEffect(() => {
    fetchDrivers();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("/api/drivers", formData);
      fetchDrivers();
      setShowForm(false); // Collapse after submission
      setFormData({
        employeeId: "",
        name: "",
        joiningDate: "",
        vehicleType: "",
        vehicleNumber: "",
        panNumber: "",
        aadhar: "",
        licenseNumber: "",
        phone: "",
        email: "",
        address: "",
        salary: "",
        department: "",
        accountNumber: "",
        ifsc: "",
      });
    } catch (err) {
      console.error("Error adding driver:", err);
    }
  };

  const handleDelete = async (employeeId: string) => {
    try {
      await axios.delete(`/api/drivers/${employeeId}`);
      fetchDrivers();
    } catch (err) {
      console.error("Error deleting driver:", err);
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-10">
      <h1 className="text-3xl font-bold text-gray-800">Driver Management</h1>

      {/* Toggle Button */}
      <div className="flex gap-2 text-right">
        <button
          onClick={() => setShowForm((prev) => !prev)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-md shadow"
        >
          {showForm ? "Hide Driver Form" : "Add New Driver"}
        </button>
        <button
          onClick={() => router.push("/dashboard")}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium px-4 py-2 rounded-md shadow mb-4"
        >
          ← Go Back to Dashboard
        </button>
      </div>

      {/* Form Section */}
      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 shadow-lg rounded-lg transition-all duration-300"
        >
          {[
            ["employeeId", "Employee ID"],
            ["name", "Driver Name"],
            ["joiningDate", "Date of Joining", "date"],
            ["vehicleType", "Vehicle Type"],
            ["vehicleNumber", "Vehicle Number"],
            ["panNumber", "PAN Number"],
            ["aadhar", "Aadhar Number"],
            ["licenseNumber", "License Number"],
            ["phone", "Phone"],
            ["email", "Email"],
            ["address", "Address"],
            ["salary", "Salary"],
            ["department", "Department"],
            ["accountNumber", "Account Number"],
            ["ifsc", "IFSC Code"],
          ].map(([name, label, type = "text"]) => (
            <div key={name} className="flex flex-col">
              <label
                htmlFor={name}
                className="text-sm font-medium text-gray-700 mb-1"
              >
                {label}
              </label>
              <input
                type={type}
                name={name}
                id={name}
                value={(formData as any)[name]}
                onChange={handleChange}
                required
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          ))}
          <div className="md:col-span-2 flex justify-end">
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white font-medium px-6 py-2 rounded-md shadow"
            >
              Submit Driver Details
            </button>
          </div>
        </form>
      )}

      {/* Driver Table */}
      <div className="bg-white p-6 shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          Existing Drivers
        </h2>
        <div className="overflow-auto">
          <table className="min-w-full text-sm text-left border border-gray-200">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="p-3 border">Emp ID</th>
                <th className="p-3 border">Name</th>
                <th className="p-3 border">Vehicle</th>
                <th className="p-3 border">Phone</th>
                <th className="p-3 border">Email</th>
                <th className="p-3 border">Department</th>
                <th className="p-3 border text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {drivers.map((driver) => (
                <tr key={driver.employeeId} className="hover:bg-gray-50">
                  <td className="p-3 border">{driver.employeeId}</td>
                  <td className="p-3 border">{driver.name}</td>
                  <td className="p-3 border">
                    {driver.vehicleType} ({driver.vehicleNumber})
                  </td>
                  <td className="p-3 border">{driver.phone}</td>
                  <td className="p-3 border">{driver.email}</td>
                  <td className="p-3 border">{driver.department}</td>
                  <td className="p-3 border text-center">
                    <button
                      onClick={() => handleDelete(driver.employeeId)}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-md text-sm"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
              {drivers.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center py-4 text-gray-500">
                    No drivers found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
