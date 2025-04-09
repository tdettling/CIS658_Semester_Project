import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateStockItem = () => {
  const [formData, setFormData] = useState({
    product_name: "",
    sku: "",
    po: "",
    price: "",
    quantity_ordered: "",
    quantity_arrived: "",
    quantity_available: "",
    vendor: "",
    status: "",
    serial_numbers: "",
    category: ""
  });

  const [message, setMessage] = useState(""); // For displaying success or error message
  const navigate = useNavigate();

  // Handle form submits
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://127.0.0.1:8000/inventory/add', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log(res.data);
      setMessage('Item added successfully!');
      navigate('/inventory'); 
    } catch (error) {
      console.error(error);
      setMessage('Error adding item');
    }
  };

  // Handle form field changes
          // https://stackoverflow.com/questions/64210380/get-value-from-e-target-name-and-use-in-react-hooks-setstate
        // https://www.reddit.com/r/reactjs/comments/rwqufw/what_is_the_difference_between_these_prevstate/?rdt=53661

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    
  };

  // Back button click 
  const handleEditButtonClick = () => {
    navigate("/inventory");
  };

  return (
    <div className="form-container">
            <button onClick={handleEditButtonClick} className="back_button">
                Back to Inventory 
        </button>
      <h2>Add New Inventory Item</h2>
      <form onSubmit={handleSubmit} className="inventory-form">

        <div className="form-group">
          <label>Product Name</label>
          <input
            type="text"
            name="product_name"
            value={formData.product_name}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>SKU</label>
          <input
            type="text"
            name="sku"
            value={formData.sku}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>PO</label>
          <input
            type="text"
            name="po"
            value={formData.po}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Price</label>
          <input
            type="text"
            name="price"
            value={formData.price}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Quantity Ordered</label>
          <input
            type="text"
            name="quantity_ordered"
            value={formData.quantity_ordered}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Quantity Arrived</label>
          <input
            type="text"
            name="quantity_arrived"
            value={formData.quantity_arrived}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Quantity Available</label>
          <input
            type="text"
            name="quantity_available"
            value={formData.quantity_available}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Vendor</label>
          <input
            type="text"
            name="vendor"
            value={formData.vendor}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Status</label>
          <input
            type="text"
            name="status"
            value={formData.status}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Serial Numbers</label>
          <input
            type="text"
            name="serial_numbers"
            value={formData.serial_numbers}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Category</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
          />
        </div>

        <button type="submit">Add Item</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
};

export default CreateStockItem;

