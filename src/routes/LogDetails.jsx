import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const LogDetails = () => {
  const location = useLocation();
  const log = location.state;

  useEffect(() => {
    // Fetch log details from the API
    fetch(`http://localhost:5000/api/LogDetails/${log._id}`)
      .then(response => response.json())
      .then(data => {
        // Update the log details state
        setLogDetails(data);
      });
  }, []);

  const [logDetails, setLogDetails] = useState({});

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-2xl font-bold mb-4">Log Details</h2>
      <table className="table-auto w-full">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2">Field</th>
            <th className="px-4 py-2">Value</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(logDetails).map((key, index) => (
            <tr key={index}>
              <td className="px-4 py-2">{key}</td>
              <td className="px-4 py-2">{logDetails[key]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LogDetails;