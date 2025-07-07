'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const CustomInfoTables = () => {
  const router = useRouter();

  const [columns, setColumns] = useState<string[]>([]);
  const [columnInput, setColumnInput] = useState('');
  const [rows, setRows] = useState<string[][]>([]);
  const [rowData, setRowData] = useState<string[]>([]);

  const handleAddColumn = () => {
    if (columnInput.trim()) {
      setColumns([...columns, columnInput.trim()]);
      setColumnInput('');
      setRowData([...rowData, '']);
    }
  };

  const handleRowInputChange = (value: string, index: number) => {
    const updatedRow = [...rowData];
    updatedRow[index] = value;
    setRowData(updatedRow);
  };

  const handleAddRow = () => {
    if (rowData.some(cell => cell.trim() !== '')) {
      setRows([...rows, rowData]);
      setRowData(columns.map(() => ''));
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Custom Info Tables</h1>
        <button
          onClick={() => router.push('/dashboard')}
          className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 transition"
        >
          Go Back
        </button>
      </div>

      {/* Column Creation */}
      <div className="bg-white shadow p-4 rounded border mb-6">
        <div className="flex flex-wrap items-center gap-4">
          <input
            type="text"
            value={columnInput}
            onChange={(e) => setColumnInput(e.target.value)}
            placeholder="Enter column name"
            className="border p-2 rounded flex-1 min-w-[200px]"
          />
          <button
            onClick={handleAddColumn}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Add Column
          </button>
        </div>

        {columns.length > 0 && (
          <div className="mt-4">
            <p className="text-sm text-gray-600">Current Columns:</p>
            <ul className="flex flex-wrap gap-2 mt-1">
              {columns.map((col, idx) => (
                <li key={idx} className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded">
                  {col}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Row Input */}
      {columns.length > 0 && (
        <div className="bg-white shadow p-4 rounded border mb-6">
          <p className="mb-2 text-lg font-semibold">Add Row Data</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {columns.map((col, idx) => (
              <input
                key={idx}
                type="text"
                placeholder={`Enter ${col}`}
                value={rowData[idx] || ''}
                onChange={(e) => handleRowInputChange(e.target.value, idx)}
                className="border p-2 rounded"
              />
            ))}
          </div>
          <button
            onClick={handleAddRow}
            className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Add Row
          </button>
        </div>
      )}

      {/* Data Table */}
      {rows.length > 0 && (
        <div className="overflow-x-auto bg-white shadow rounded border">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-100">
              <tr>
                {columns.map((col, idx) => (
                  <th key={idx} className="px-4 py-2">{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, rowIndex) => (
                <tr key={rowIndex} className="border-t">
                  {row.map((cell, cellIndex) => (
                    <td key={cellIndex} className="px-4 py-2">{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {columns.length === 0 && (
        <p className="text-center text-gray-500 mt-8">Start by adding column names to create a custom table.</p>
      )}
    </div>
  );
};

export default CustomInfoTables;
