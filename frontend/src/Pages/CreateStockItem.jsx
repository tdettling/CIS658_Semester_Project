/*
L Dettling 
CIS 658 Project

Sources for this file:

*/

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import api from '../api';



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
    category: ""
  });

  const onOrderStatus = "On-Order";
  const partiallyReceived = "Partially Received";
  const delivered = "Delivered";
  const closedStatus = "Closed";

  const [selectedStatus, setSelectedStatus] = useState(onOrderStatus);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      status: selectedStatus  
    };

    try {
      const res = await api.post('/inventory/add', payload);
      console.log(res.data);
      setMessage('Item added successfully!');
      navigate('/inventory');
    } catch (error) {
      console.error(error);
      setMessage('Error adding item');
    }
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
  <div className="form-row">
    <div className="form-group">
      <label>Product Name</label>
      <input
        type="text"
        name="product_name"
        value={formData.product_name}
        onChange={handleChange}
        required
      />
    </div>

    <div className="form-group">
      <label>SKU</label>
      <input
        type="text"
        name="sku"
        value={formData.sku}
        onChange={handleChange}
        required
      />
    </div>

    <div className="form-group">
      <label>PO</label>
      <input
        type="text"
        name="po"
        value={formData.po}
        onChange={handleChange}
        required
      />
    </div>
  </div>

  <div className="form-row">
    <div className="form-group">
      <label>Price</label>
      <input
        type="number"
        name="price"
        value={formData.price}
        onChange={handleChange}
        required
      />
    </div>

    <div className="form-group">
      <label>Quantity Ordered</label>
      <input
        type="number"
        name="quantity_ordered"
        value={formData.quantity_ordered}
        onChange={handleChange}
        required
      />
    </div>

    <div className="form-group">
      <label>Quantity Arrived</label>
      <input
        type="number"
        name="quantity_arrived"
        value={formData.quantity_arrived}
        onChange={handleChange}
        required
      />
    </div>
  </div>

  <div className="form-row">
    <div className="form-group">
      <label>Quantity Available</label>
      <input
        type="number"
        name="quantity_available"
        value={formData.quantity_available}
        onChange={handleChange}
        required
      />
    </div>

    <div className="form-group">
      <label>Vendor</label>
      <input
        type="text"
        name="vendor"
        value={formData.vendor}
        onChange={handleChange}
        required
      />
    </div>

    <div className="form-group">
      <label>Category</label>
      <input
        type="text"
        name="category"
        value={formData.category}
        onChange={handleChange}
        required
      />
    </div>
  </div>


  <div className="form-row">
    <div className="form-group">
      <label>Status</label>
      <div className="status-container">
        <div className="dropdown">
          <button className="dropbtn">{selectedStatus}</button>
          <div className="dropdown-content">
            <a href="#" onClick={() => setSelectedStatus(onOrderStatus)}>{onOrderStatus}</a>
            <a href="#" onClick={() => setSelectedStatus(partiallyReceived)}>{partiallyReceived}</a>
            <a href="#" onClick={() => setSelectedStatus(delivered)}>{delivered}</a>
            <a href="#" onClick={() => setSelectedStatus(closedStatus)}>{closedStatus}</a>
          </div>
        </div>
      </div>
    </div>
  </div>

  <button type="submit" className="submit-button">Submit Item</button>
</form>


      {message && <p>{message}</p>}
    </div>
  );
};

export default CreateStockItem;

