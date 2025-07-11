"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function DriverManagementPage() {
  const[empid,setEmpid]=useState('');
  const[driver_name,setDriver_name]=useState('');
  const[date_of_joining,setDate_of_joining]=useState('');
  const[vehicle_type,setvehicle_type]=useState('');
  const[vehicle_number,setvehicle_number]=useState('');
  const[pan_number,setpan_number]=useState('');
  const[aadhar_number,setaadhar_number]=useState('');
  const[liscence_number,setliscence_number]=useState('');
  const[phone_number,setphone_number]=useState('');
  const[email,setemail]=useState('');
  const[address,setaddress]=useState('');
  const[salary,setsalary]=useState('');
  const[department,setdepartment]=useState('');
  const[account_number,setaccount_number]=useState('');
  const[ifsc_code,setifsc_code]=useState('');
  const [showForm, setShowForm] = useState(false);
  const router = useRouter();

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const pushdata = async (e: React.FormEvent) => {
  e.preventDefault(); // <-- This is important!
  if (!empid || !driver_name || !phone_number) {
  alert("Please fill all required fields.");
  return;
  }
  try {
    await axios.post('http://localhost:5000/api/drivers/driverdata', {
      empid, driver_name, date_of_joining, vehicle_type, vehicle_number,
      pan_number, aadhar_number, liscence_number, phone_number, email,
      address, salary, department, account_number, ifsc_code
    });
    alert("Form submitted!");
  } catch (err) {
    alert("Failed to submit form");
    console.error(err);
  }
};
 

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-10">
      <h1 className="text-3xl font-bold text-gray-800">Driver Management</h1>

      {/* Toggle Button */}
      <div className="flex gap-2 text-right">
        <button
          onClick={toggleForm}
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

      {showForm && (
        <form
          onSubmit={pushdata}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 shadow-lg rounded-lg transition-all duration-300"
        >
          <input 
          type="text"
          placeholder="Employee ID" 
          value={empid}
          onChange={(e) => setEmpid(e.target.value)}
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"/>
          <input 
          type="text"
          placeholder="Driver Name" 
          value={driver_name}
          onChange={(e) => setDriver_name(e.target.value)}
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"/>
          <input 
          type="date"
          placeholder="Date of Joining" 
          value={date_of_joining}
          onChange={(e) => setDate_of_joining(e.target.value)}
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"/>
          <input 
          type="text"
          placeholder="Vehicle Type" 
          value={vehicle_type}
          onChange={(e) => setvehicle_type(e.target.value)}
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"/>
          <input 
          type="text"
          placeholder="Vehicle Number" 
          value={vehicle_number}
          onChange={(e) => setvehicle_number(e.target.value)}
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"/>
          <input 
          type="text"
          placeholder="Pan Number" 
          value={pan_number}
          onChange={(e) => setpan_number(e.target.value)}
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"/>
          <input 
          type="text"
          placeholder="Aadhar Number" 
          value={aadhar_number}
          onChange={(e) => setaadhar_number(e.target.value)}
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"/>
          <input 
          type="text"
          placeholder="Liscence Number" 
          value={liscence_number}
          onChange={(e) => setliscence_number(e.target.value)}
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"/>
          <input 
          type="text"
          placeholder="Phone Number" 
          value={phone_number}
          onChange={(e) => setphone_number(e.target.value)}
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"/>
          <input 
          type="text"
          placeholder="Email" 
          value={email}
          onChange={(e) => setemail(e.target.value)}
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"/>
          <input 
          type="text"
          placeholder="Address" 
          value={address}
          onChange={(e) => setaddress(e.target.value)}
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"/>
          <input 
          type="text"
          placeholder="Salary" 
          value={salary}
          onChange={(e) => setsalary(e.target.value)}
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"/>
          <input 
          type="text"
          placeholder="Department" 
          value={department}
          onChange={(e) => setdepartment(e.target.value)}
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"/>
          <input 
          type="text"
          placeholder="Account Number" 
          value={account_number}
          onChange={(e) => setaccount_number(e.target.value)}
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"/>
          <input 
          type="text"
          placeholder="IFSC Code" 
          value={ifsc_code}
          onChange={(e) => setifsc_code(e.target.value)}
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"/>
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
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
