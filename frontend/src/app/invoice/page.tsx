'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

type Invoice = {
  invoiceNumber: string;
  date: string;
  amount: string;
  status: 'Received' | 'Pending';
};

const InvoiceBilling = () => {
  const router = useRouter();
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [formData, setFormData] = useState<Invoice>({
    invoiceNumber: '',
    date: '',
    amount: '',
    status: 'Pending',
  });
  const [showForm, setShowForm] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddInvoice = () => {
    setInvoices([...invoices, formData]);
    setFormData({
      invoiceNumber: '',
      date: '',
      amount: '',
      status: 'Pending',
    });
    setShowForm(false);
  };

  const totalReceived = invoices
    .filter((inv) => inv.status === 'Received')
    .reduce((sum, inv) => sum + parseFloat(inv.amount || '0'), 0);

  const totalPending = invoices
    .filter((inv) => inv.status === 'Pending')
    .reduce((sum, inv) => sum + parseFloat(inv.amount || '0'), 0);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Invoice & Billing</h1>
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
        {showForm ? 'Close Form' : 'Submit Invoice'}
      </button>

      {/* Form */}
      {showForm && (
        <div className="bg-white shadow-md p-6 rounded border mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="invoiceNumber"
              value={formData.invoiceNumber}
              onChange={handleChange}
              placeholder="Invoice Number"
              className="border p-2 rounded"
            />
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="border p-2 rounded"
            />
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              placeholder="Amount"
              className="border p-2 rounded"
            />
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="border p-2 rounded"
            >
              <option value="Received">Received</option>
              <option value="Pending">Pending</option>
            </select>
          </div>
          <button
            onClick={handleAddInvoice}
            className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Submit
          </button>
        </div>
      )}

      {/* Reports */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-green-100 p-4 rounded shadow">
          <p className="text-lg font-semibold">Payments Received</p>
          <p className="text-2xl font-bold text-green-700">₹ {totalReceived.toFixed(2)}</p>
        </div>
        <div className="bg-yellow-100 p-4 rounded shadow">
          <p className="text-lg font-semibold">Pending Payments</p>
          <p className="text-2xl font-bold text-yellow-700">₹ {totalPending.toFixed(2)}</p>
        </div>
        <div className="bg-blue-100 p-4 rounded shadow">
          <p className="text-lg font-semibold">Monthly Report</p>
          <p className="text-md text-gray-700">Coming Soon...</p>
        </div>
      </div>

      {/* Invoice Table */}
      <div className="overflow-x-auto bg-white shadow-md rounded border border-gray-200">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2">Invoice #</th>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Amount</th>
              <th className="px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {invoices.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center py-4 text-gray-500">
                  No invoices submitted.
                </td>
              </tr>
            ) : (
              invoices.map((inv, idx) => (
                <tr key={idx} className="border-t">
                  <td className="px-4 py-2">{inv.invoiceNumber}</td>
                  <td className="px-4 py-2">{inv.date}</td>
                  <td className="px-4 py-2">₹ {inv.amount}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`px-2 py-1 rounded text-white text-xs ${
                        inv.status === 'Received' ? 'bg-green-500' : 'bg-yellow-500'
                      }`}
                    >
                      {inv.status}
                    </span>
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

export default InvoiceBilling;
