import React, { useState, useEffect } from "react";
import axios from "axios";

const Consumption = () => {
  const [date, setDate] = useState("");
  const [technician, setTechnician] = useState("");
  const [trainNumber, setTrainNumber] = useState("");
  const [items, setItems] = useState([]);
  const [itemDetails, setItemDetails] = useState({});

  useEffect(() => {
    fetchItems();
    const currentDate = new Date().toISOString().slice(0, 10);
    setDate(currentDate);
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/items");
      setItems(response.data);
      const initialDetails = {};
      response.data.forEach((item) => {
        initialDetails[item._id] = {
          quantity: 0,
          remarks: "",
          serialNumber: "",
        };
      });
      setItemDetails(initialDetails);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  const handleTrainNumberChange = (value) => {
    // Ensure trainNumber is a valid string
    const trainNumberString = value.toString().trim();
    setTrainNumber(trainNumberString);
  };

  const handleItemDetailChange = (itemId, field, value) => {
    // Ensure quantity is a valid number
    let parsedValue = value;
    if (field === "quantity") {
      parsedValue = parseInt(value);
      if (isNaN(parsedValue)) {
        parsedValue = 0; // Set default to 0 if not a number
      }
    }
    setItemDetails((prevItemDetails) => ({
      ...prevItemDetails,
      [itemId]: {
        ...prevItemDetails[itemId],
        [field]: parsedValue,
      },
    }));
  };

  const handleSave = async () => {
    if (!technician.trim()) {
      alert("Technician Name is required.");
      return;
    }
  
    if (!trainNumber.trim()) {
      alert("Train Number is required.");
      return;
    }
  
    const itemsToSave = items.filter((item) => itemDetails[item._id].quantity > 0);
  
    if (itemsToSave.length === 0) {
      alert("Please enter quantities consumed for at least one item.");
      return;
    }
  
    const payload = {
      date,
      technicianName: technician,
      trainNumber,
      items: itemsToSave.map((item) => ({
        _id: item._id,
        name: item.name,
        pl: item.pl,
        quantityConsumed: itemDetails[item._id].quantity,
        remarks: itemDetails[item._id].remarks,
        serialNumber: itemDetails[item._id].serialNumber,
      })),
    };
  
    console.log("Payload to send:", payload); // Debugging line
  
    try {
      // Update the net quantity for each item with a quantity consumed greater than 0
      const plQuantities = itemsToSave.map((item) => ({
        pl: item.pl,
        quantity: itemDetails[item._id].quantity,
      }));
      await axios.put("http://localhost:5000/api/items/decrement-netQuantity", {
        plQuantities,
      });
  
      await axios.post("http://localhost:5000/api/OutLog", payload);
      alert("Data saved successfully!");
  
      setDate(new Date().toISOString().slice(0, 10));
      setTechnician("");
      setTrainNumber("");
      const initialDetails = {};
      items.forEach((item) => {
        initialDetails[item._id] = {
          quantity: 0,
          remarks: "",
          serialNumber: "",
        };
      });
      setItemDetails(initialDetails);
    } catch (error) {
      console.error("Error saving data:", error);
      alert("Failed to save data. Please try again.");
    }
  };
  

  return (
    <div className="container mx-auto p-4">
      <div className="text-2xl font-bold pb-4">STOCK CONSUMPTION</div>

      <div className="mb-4">
        <label htmlFor="date" className="block font-semibold mb-1">
          Date:
        </label>
        <input
          type="date"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border p-2 rounded"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="technician" className="block font-semibold mb-1">
          Technician Name:
        </label>
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
      <div className="mb-4">
        <label htmlFor="trainNumber" className="block font-semibold mb-1">
          Train Number:
        </label>
        <input
          type="number"
          id="trainNumber"
          value={trainNumber}
          onChange={(e) => handleTrainNumberChange(e.target.value)}
          className="border p-2 rounded"
        />

        {!trainNumber.trim() && (
          <p className="text-red-500">Train Number is required.</p>
        )}
      </div>
      <div className="grid grid-cols-5 gap-4">
        <div className="font-semibold">Item Name</div>
        <div className="font-semibold">PL Number</div>
        <div className="font-semibold">Quantity Consumed</div>
        <div className="font-semibold">Remarks</div>
        <div className="font-semibold">Serial Number</div>
        {items.map((item) => (
          <React.Fragment key={item._id}>
            <div>{item.name}</div>
            <div>{item.pl}</div>
            <input
              type="number"
              min="0"
              value={itemDetails[item._id].quantity}
              onChange={(e) =>
                handleItemDetailChange(item._id, "quantity", e.target.value)
              }
              className="border p-2 rounded"
            />
            <input
              type="text"
              value={itemDetails[item._id]?.remarks || ""}
              onChange={(e) =>
                handleItemDetailChange(item._id, "remarks", e.target.value)
              }
              className="border p-2 rounded"
            />

            <input
              type="text"
              value={itemDetails[item._id]?.serialNumber || ""}
              onChange={(e) =>
                handleItemDetailChange(item._id, "serialNumber", e.target.value)
              }
              className="border p-2 rounded"
            />
          </React.Fragment>
        ))}
      </div>
      <button
        onClick={handleSave}
        className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
      >
        Save Consumption
      </button>
    </div>
  );
};

export default Consumption;
