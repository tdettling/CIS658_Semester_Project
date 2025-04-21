/*
L Dettling 
CIS 658 Project

Sources for this file:
https://stackoverflow.com/questions/64210380/get-value-from-e-target-name-and-use-in-react-hooks-setstate

https://www.reddit.com/r/reactjs/comments/rwqufw/what_is_the_difference_between_these_prevstate/?rdt=53661

*/

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AddLineItemISD from '../Components/AddLineItemISD';
import { isAuthenticated } from '../auth';
import '../Forms.css';
import { MdDelete } from "react-icons/md";




import api from '../api';

import { FaPlusSquare } from "react-icons/fa";

const CreateStockItem = () => {
  const [formData, setFormData] = useState({
    requestor_name: "",
    requestor_email: "",
    requestor_address: "",
    cc: "",
    ticket_number: "",
    status: "",
    items: ""
  });

  const [message, setMessage] = useState("");
  const [lineItems, setLineItems] = useState([]);

const newStatus = "New";
const onOrderStatus = "On-Order";
const readyInvoice = "Ready-to-Invoice";
const closedStatus = "Closed";

const [selectedStatus, setSelectedStatus] = useState("New"); 


  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (lineItems.length === 0) {
      alert("You must add at least one item before submitting")
      return;
    }
  
    const finalFormData = {
      ...formData,
      status: selectedStatus,
      items: JSON.stringify(lineItems),
    };
    
  
    console.log(finalFormData);
  
    try {
      const res = await api.post('/ISDs/new', finalFormData);
      console.log(res.data);
      setMessage('Item added successfully!');
      navigate('/ISDs');
    } catch (error) {
      console.error(error);
      setMessage('Error adding item');
    }
  };
  

        // take the elemnt name [] and whatever we types, and update our form. 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    
  };


  // Back button click 
  const handleEditButtonClick = () => {
    navigate("/ISDs");
  };

  // parse list
  function parseList(){
    // list [x, x, x]
  }

  const addNewLineItem = () => {
    setLineItems([...lineItems, {}]);  
};

const removeLineItem = (indexToRemove) => {
  setLineItems(prevItems => prevItems.filter((_, index) => index !== indexToRemove));
};


const updateLineItemData = (index, data) => {
    const updatedLineItems = [...lineItems];
    updatedLineItems[index] = data;
    setLineItems(updatedLineItems);
};

return (
  <div className="form-container align-left">
    <button onClick={handleEditButtonClick} className="back_button">
      Back to ISDs
    </button>

    <h2>Add New Inventory Item</h2>

    <form onSubmit={handleSubmit} className="inventory-form">
      <div className="form-row">
        <div className="form-group">
          <label>Requestor Name</label>
          <input
            type="text"
            name="requestor_name"
            value={formData.requestor_name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Requestor Email</label>
          <input
            type="text"
            name="requestor_email"
            value={formData.requestor_email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Requestor Address</label>
          <input
            type="text"
            name="requestor_address"
            value={formData.requestor_address}
            onChange={handleChange}
            required
          />
        </div>
      </div>


      <div className="form-row">
        <div className="form-group">
          <label>Cost Center</label>
          <input
            type="text"
            name="cc"
            value={formData.cc}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Ticket Number</label>
          <input
            type="number"
            name="ticket_number"
            value={formData.ticket_number}
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
          <a href="#" onClick={() => setSelectedStatus(newStatus)}>{newStatus}</a>
          <a href="#" onClick={() => setSelectedStatus(onOrderStatus)}>{onOrderStatus}</a>
          <a href="#" onClick={() => setSelectedStatus(readyInvoice)}>{readyInvoice}</a>
          <a href="#" onClick={() => setSelectedStatus(closedStatus)}>{closedStatus}</a>
        </div>
      </div>
    </div>
  </div>
</div>


     
      <div className="add-line-button-row">
        <button type="button" onClick={addNewLineItem} className="plus-button">
          <FaPlusSquare />
        </button>
      </div>


      {lineItems.map((item, index) => (
        <div key={index} className="line-item-wrapper">
  <AddLineItemISD index={index} updateLineItemData={updateLineItemData} />

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
          <button
            type="button"
            onClick={() => removeLineItem(index)}
            className="minus-button"
          >
            <MdDelete size={18} style={{ marginRight: '6px' }} />
            Remove Line
          </button>
        </div>
      </div>

    ))}



      <button type="submit" className="submit-button">Submit</button>
    </form>

    {message && <p>{message}</p>}
  </div>
);


};

export default CreateStockItem;

