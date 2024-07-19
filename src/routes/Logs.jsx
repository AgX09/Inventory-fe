import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logs = () => {
  const [inLogs, setInLogs] = useState([]);
  const [outLogs, setOutLogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch inlog data from the API
    fetch('http://localhost:5000/api/InLog')
      .then(response => response.json())
      .then(data => setInLogs(data));

    // Fetch outlog data from the API
    fetch('http://localhost:5000/api/OutLog')
      .then(response => response.json())
      .then(data => setOutLogs(data));
  }, []);

  const handleLogClick = (log) => {
    // Navigate to the log details page with the log data
    navigate(`/log-details/${log._id}`, { state: log });
  };

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-2xl font-bold mb-4">Inlog</h2>
      <table className="table-auto w-full">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2">Date</th>
            <th className="px-4 py-2">Items</th>
            <th className="px-4 py-2">Technician</th>
          </tr>
        </thead>
        <tbody>
          {inLogs.sort((a, b) => new Date(b.date) - new Date(a.date)).map(log => (
            <tr
              key={log._id}
              onClick={() => handleLogClick(log)}
              className="border-b hover:bg-gray-100 cursor-pointer"
            >
              <td className="px-4 py-2">{new Date(log.date).toLocaleDateString()}</td>
              <td className="px-4 py-2">{log.items.length}</td>
              <td className="px-4 py-2">{log.technicianName}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 className="text-2xl font-bold mb-4 mt-8">Outlog</h2>
      <table className="table-auto w-full">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2">Date</th>
            <th className="px-4 py-2">Items</th>
            <th className="px-4 py-2">Technician</th>
          </tr>
        </thead>
        <tbody>
          {outLogs.sort((a, b) => new Date(b.date) - new Date(a.date)).map(log => (
            <tr
              key={log._id}
              onClick={() => handleLogClick(log)}
              className="border-b hover:bg-gray-100 cursor-pointer"
            >
              <td className="px-4 py-2">{new Date(log.date).toLocaleDateString()}</td>
              <td className="px-4 py-2">{log.items.length}</td>
              <td className="px-4 py-2">{log.technicianName}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Logs;