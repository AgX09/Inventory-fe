import React, { useState, useEffect } from "react";
import axios from "axios";

const Arrival = () => {
  const [date, setDate] = useState("");
  const [technician, setTechnician] = useState("");
  const [items, setItems] = useState([]);
  const [quantitiesReceived, setQuantitiesReceived] = useState({});

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/items");
      setItems(response.data);
      // Initialize quantitiesReceived state with 0 for each item
      const initialQuantities = {};
      response.data.forEach(item => {
        initialQuantities[item._id] = 0;
      });
      setQuantitiesReceived(initialQuantities);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  const handleQuantityChange = (itemId, quantity) => {
    // Ensure quantity is not negative
    if (quantity < 0) {
      return;
    }
    setQuantitiesReceived({
      ...quantitiesReceived,
      [itemId]: quantity
    });
  };

  const handleSave = async () => {
    // Filter out items with non-zero quantities received
    const itemsToSave = items.filter(item => quantitiesReceived[item._id] > 0);
    if (itemsToSave.length === 0) {
      alert("Please enter quantities received for at least one item.");
      return;
    }
  
    try {
      const payload = {
        date,
        technicianName: technician,
        items: itemsToSave.map(item => ({
          itemId: item._id,
          name: item.name,
          pl: item.pl,
          quantityReceived: quantitiesReceived[item._id]
        }))
      };
  
      // Update the net quantity for each item with a quantity received greater than 0
      const pls = itemsToSave.map(item => item.pl);
      const quantities = itemsToSave.map(item => quantitiesReceived[item._id]);
      await axios.put("http://localhost:5000/api/items/update-netQuantity", {
        pls,
        quantities
      });
  
      await axios.post("http://localhost:5000/api/InLog", payload);
  
      alert("Data saved successfully!");
  
      // Clear inputs and quantities received
      setDate("");
      setTechnician("");
      const initialQuantities = {};
      items.forEach(item => {
        initialQuantities[item._id] = 0;
      });
      setQuantitiesReceived(initialQuantities);
    } catch (error) {
      console.error("Error saving data:", error);
      alert("Failed to save data. Please try again.");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="text-2xl font-bold pb-4">STOCK ARRIVAL</div>

      <div className="mb-4">
        <label htmlFor="date" className="block font-semibold mb-1">Date:</label>
        <input
          type="date"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border p-2 rounded"
        />
        {!date.trim() && (
          <p className="text-red-500">Date is required.</p>
        )}
      </div>
      <div className="mb-4">
        <label htmlFor="technician" className="block font-semibold mb-1">Technician Name:</label>
        <input
          type="text"
          id="technician"
          value={technician}
          onChange={(e) => setTechnician(e.target.value)}
          className="border p-2 rounded"
        />
        {!technician.trim() && (
          <p className="text-red-500">Technician Name is required.</p>
        )}
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="font-semibold">Item Name</div>
        <div className="font-semibold">PL Number</div>
        <div className="font-semibold">Quantity Received</div>
        {items.map(item => (
          <React.Fragment key={item._id}>
            <div>{item.name}</div>
            <div>{item.pl}</div>
            <input
              type="number"
              min="0"
              value={quantitiesReceived[item._id]}
              onChange={(e) => handleQuantityChange(item._id, parseInt(e.target.value))}
              className="border p-2 rounded"
            />
          </React.Fragment>
        ))}
      </div>
      <button
        onClick={handleSave}
        className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
      >
        Save Arrival
      </button>
    </div>
  );
};

export default Arrival;