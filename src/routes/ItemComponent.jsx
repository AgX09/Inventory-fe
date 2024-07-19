import { useState, useEffect } from "react";
import axios from "axios";

const ItemComponent = () => {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({
    name: "",
    pl: "",
    netQuantity: "",
    threshold: 10,
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(null);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/api/items");
      setItems(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching items:", error);
      setLoading(false);
    }
  };

  const handleEdit = (id) => {
    setItems(
      items.map((item) =>
        item._id === id ? { ...item, isEditing: true } : item
      )
    );
  };

  const handleSave = async (id) => {
    const item = items.find((item) => item._id === id);
    if (item.name.trim() === "") {
      setError("Name cannot be empty");
      return;
    }
    setSaveLoading(true);
    try {
      await axios.put(`http://localhost:5000/api/items/${id}`, item);
      setItems(
        items.map((item) =>
          item._id === id ? { ...item, isEditing: false } : item
        )
      );
      setSaveLoading(false);
      setError(""); // Clear error message if save is successful
    } catch (error) {
      console.error("Error saving item:", error);
      setSaveLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      setDeleteLoading(id);
      try {
        await axios.delete(`http://localhost:5000/api/items/${id}`);
        setItems(items.filter((item) => item._id !== id));
        setDeleteLoading(null);
      } catch (error) {
        console.error("Error deleting item:", error);
        setDeleteLoading(null);
      }
    }
  };

  const handleAddItem = async () => {
    if (newItem.name.trim() === "") {
      setError("Name cannot be empty");
      return;
    }
    if (items.some((item) => item.pl === newItem.pl)) {
      setError("PL number must be unique");
      return;
    }

    const itemToAdd = {
      ...newItem,
      netQuantity: newItem.netQuantity === "" ? 0 : newItem.netQuantity,
      threshold: newItem.threshold === "" ? 0 : newItem.threshold,
    };

    setSaveLoading(true);
    try {
      await axios.post("http://localhost:5000/api/items", itemToAdd);
      setNewItem({
        name: "",
        pl: "",
        netQuantity: "",
        threshold: "",
      });
      fetchItems();
      setError(""); // Clear error message if add is successful
    } catch (error) {
      console.error("Error adding new item:", error);
    } finally {
      setSaveLoading(false);
    }
  };

  const handleChange = (id, field, value) => {
    setItems(
      items.map((item) =>
        item._id === id ? { ...item, [field]: value } : item
      )
    );
  };

  return (
    <>
      <div className="container mx-auto p-4">
        <div className="text-2xl font-bold py-4">ITEMS</div>

        <div className="flex gap-4 items-center mb-4">
          <div className="w-1/5 text-lg font-semibold">Item Name</div>
          <div className="w-1/5 text-lg font-semibold">PL Number</div>
          <div className="w-1/5 text-lg font-semibold">Net Quantity</div>
          <div className="w-1/5 text-lg font-semibold">Threshold Quantity</div>
        </div>
        {loading ? (
          <div className="text-center">Loading...</div>
        ) : (
          items.map((item) => (
            <div key={item._id} className="flex gap-4 items-center mb-4">
              <input
                type="text"
                value={item.name}
                onChange={(e) => handleChange(item._id, "name", e.target.value)}
                disabled={!item.isEditing}
                className="border p-2 rounded w-1/5"
              />
              <input
                type="text"
                value={item.pl}
                onChange={(e) => handleChange(item._id, "pl", e.target.value)}
                disabled={!item.isEditing}
                className="border p-2 rounded w-1/5"
              />
              <input
                type="text"
                value={item.netQuantity}
                onChange={(e) =>
                  handleChange(item._id, "netQuantity", e.target.value)
                }
                disabled={!item.isEditing}
                className="border p-2 rounded w-1/5"
              />
              <input
                type="text"
                value={item.threshold}
                onChange={(e) =>
                  handleChange(item._id, "threshold", e.target.value)
                }
                disabled={!item.isEditing}
                className="border p-2 rounded w-1/5"
              />
              {item.isEditing ? (
                <button
                  onClick={() => handleSave(item._id)}
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  {saveLoading ? "Saving..." : "Save"}
                </button>
              ) : (
                <button
                  onClick={() => handleEdit(item._id)}
                  className="bg-yellow-500 text-white px-4 py-2 rounded"
                >
                  Edit
                </button>
              )}
              <button
                onClick={() => handleDelete(item._id)}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                {deleteLoading === item._id ? "Deleting..." : "Delete"}
              </button>
            </div>
          ))
        )}
        <div className="flex gap-4 items-center mt-6">
          <input
            type="text"
            placeholder="Name"
            value={newItem.name}
            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
            className="border p-2 rounded w-1/5"
          />
          <input
            type="text"
            placeholder="PL Number"
            value={newItem.pl}
            onChange={(e) => setNewItem({ ...newItem, pl: e.target.value })}
            className="border p-2 rounded w-1/5"
          />
          <input
            type="text"
            placeholder="Net Quantity"
            value={newItem.netQuantity}
            onChange={(e) =>
              setNewItem({ ...newItem, netQuantity: e.target.value })
            }
            className="border p-2 rounded w-1/5"
          />
          <input
            type="text"
            placeholder="Threshold"
            value={newItem.threshold}
            onChange={(e) =>
              setNewItem({ ...newItem, threshold: e.target.value })
            }
            className="border p-2 rounded w-1/5"
          />
          <button
            onClick={handleAddItem}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            {saveLoading ? "Saving..." : "Add Item"}
          </button>
        </div>
        {error && <div className="text-red-500 mt-2">{error}</div>}
      </div>
    </>
  );
};

export default ItemComponent;