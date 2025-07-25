"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import axios from "axios";

type Invoice = {
  invid: string;
  date: string;
  amount: number;
  status: string;
  company_name: string;
  description: string;
};

const InvoiceBilling = () => {
  const router = useRouter();

  const [showForm, setShowForm] = useState(false);
  const [invid, setinvid] = useState("INV");
  const [date, setdate] = useState("");
  const [amount, setamount] = useState<number>(0);
  const [status, setstatus] = useState("");
  const [company_name, setcompany_name] = useState("");
  const [description, setdescription] = useState("");

  const [allInvoices, setAllInvoices] = useState<Invoice[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const receivedInvoices = allInvoices.filter((inv) => inv.status === "Received");
  const pendingInvoices = allInvoices.filter((inv) => inv.status === "Pending");

  const datafromdb = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/api/invoices/datafromdb");
      setAllInvoices(res.data);
    } catch (err) {
      console.error("Error fetching invoices:", err);
      setError("Failed to fetch invoices.");
    } finally {
      setLoading(false);
    }
  };

  const handleadd = async () => {
    if (!invid || !date || amount <= 0 || !status || !company_name) {
      alert("Enter all details.");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/invoices/senddata", {
        invid,
        date,
        amount,
        status,
        company_name,
        description,
      });

      alert("Successfully added.");
      await datafromdb();
      setinvid("INV");
      setdate("");
      setamount(0);
      setstatus("Pending");
      setcompany_name("");
      setdescription("");
      setShowForm(false);
    } catch (error) {
      alert("Error in adding data.");
      console.error(error);
    }
  };

  const markAsReceived = async (invid: string) => {
    try {
      await axios.put(`http://localhost:5000/api/invoices/mark-received/${invid}`);
      await datafromdb();
    } catch (error) {
      console.error("Failed to mark invoice as received:", error);
    }
  };

  useEffect(() => {
    datafromdb();
  }, []);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Invoice & Billing</h1>
        <button
          onClick={() => router.push("/dashboard")}
          className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 transition"
        >
          Go Back
        </button>
      </div>

      <button
        onClick={() => setShowForm(!showForm)}
        className="mb-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {showForm ? "Close Form" : "Create Invoice"}
      </button>

      {showForm && (
        <div className="bg-white shadow-md p-6 rounded border mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" value={invid} onChange={(e) => setinvid(e.target.value)} placeholder="Invoice ID" className="border p-2 rounded" />
            <input type="date" value={date} onChange={(e) => setdate(e.target.value)} className="border p-2 rounded" />
            <input type="number" value={amount} onChange={(e) => setamount(Number(e.target.value))} placeholder="Amount" className="border p-2 rounded" />
            <select value={status} onChange={(e) => setstatus(e.target.value)} className="border p-2 rounded">
              <option value="">Status</option>
              <option value="Received">Received</option>
              <option value="Pending">Pending</option>
            </select>
            <input type="text" value={company_name} onChange={(e) => setcompany_name(e.target.value)} placeholder="Company Name" className="border p-2 rounded" />
            <input type="text" value={description} onChange={(e) => setdescription(e.target.value)} placeholder="Description" className="border p-2 rounded" />
          </div>
          <button onClick={handleadd} className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Submit</button>
        </div>
      )}

      <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-green-100 p-4 rounded shadow">
          <p className="text-lg font-semibold">Payments Received</p>
          <p className="text-2xl font-bold text-green-700">₹ {receivedInvoices.reduce((total, inv) => total + inv.amount, 0)}</p>
        </div>
        <div className="bg-yellow-100 p-4 rounded shadow">
          <p className="text-lg font-semibold">Pending Payments</p>
          <p className="text-2xl font-bold text-yellow-700">₹ {pendingInvoices.reduce((total, inv) => total + inv.amount, 0)}</p>
        </div>
      </div>

      <Tabs defaultValue="rec" className="w-full">
        <TabsList>
          <TabsTrigger value="rec">Received</TabsTrigger>
          <TabsTrigger value="pen">Pending</TabsTrigger>
        </TabsList>

        <TabsContent value="rec">
          <InvoiceTable invoices={receivedInvoices} markAsReceived={undefined} />
        </TabsContent>
        <TabsContent value="pen">
          <InvoiceTable invoices={pendingInvoices} markAsReceived={markAsReceived} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

const InvoiceTable = ({
  invoices,
  markAsReceived,
}: {
  invoices: Invoice[];
  markAsReceived?: (invid: string) => void;
}) => (
  <div className="w-full max-w-full overflow-x-auto rounded-lg border border-gray-200 shadow-md">
    <table className="w-full text-left text-sm">
      <thead className="bg-gray-100">
        <tr>
          <th className="px-4 py-2">Invoice</th>
          <th className="px-4 py-2">Date</th>
          <th className="px-4 py-2">Amount</th>
          <th className="px-4 py-2">Status</th>
          <th className="px-4 py-2">Description</th>
          {markAsReceived && <th className="px-4 py-2">Action</th>}
        </tr>
      </thead>
      <tbody>
        {invoices.length === 0 ? (
          <tr>
            <td colSpan={6} className="text-center py-4 text-gray-500">
              No invoices submitted.
            </td>
          </tr>
        ) : (
          invoices.map((inv) => (
            <tr key={inv.invid} className="border-t">
              <td className="px-4 py-2">{inv.invid}</td>
              <td className="px-4 py-2">{inv.date}</td>
              <td className="px-4 py-2">₹ {inv.amount}</td>
              <td className="px-4 py-2">
                <span className={`px-2 py-1 rounded text-white text-xs ${inv.status === "Received" ? "bg-green-500" : "bg-yellow-500"}`}>
                  {inv.status}
                </span>
              </td>
              <td className="px-4 py-2">{inv.description || "-"}</td>
              {markAsReceived && (
                <td className="px-4 py-2">
                  <button
                    onClick={() => markAsReceived(inv.invid)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 text-sm rounded"
                  >
                    Mark as Received
                  </button>
                </td>
              )}
            </tr>
          ))
        )}
      </tbody>
    </table>
  </div>
);

export default InvoiceBilling;
