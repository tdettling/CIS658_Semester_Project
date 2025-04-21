/*
L Dettling 
CIS 658 Project

Sources for this file:
https://stackoverflow.com/questions/64210380/get-value-from-e-target-name-and-use-in-react-hooks-setstate

https://www.reddit.com/r/reactjs/comments/rwqufw/what_is_the_difference_between_these_prevstate/?rdt=53661


https://www.w3schools.com/react/react_useeffect.asp
https://react.dev/reference/react/useEffect
https://www.digitalocean.com/community/tutorials/react-axios-react
https://axios-http.com/docs/handling_errors
https://stackoverflow.com/questions/49967779/axios-handling-errors
https://www.w3schools.com/jsref/jsref_slice_array.asp
https://react.dev/learn/updating-arrays-in-state
*/

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';  
import EditItemForm from '../Components/EditItemForm';

import api from '../api';

const EditStock = () => {
  const { stock_id } = useParams(); 
  const navigate = useNavigate();
  const [item, setItem] = useState(null);

  const [formData, setFormData] = useState({
    product_name: '',
    sku: '',
    po: '',
    price: 0,
    quantity_ordered: 0,
    quantity_arrived: 0,
    quantity_available: 0,
    vendor: '',
    status: '',
    category: '',
  });

  // grab the current item data when the component mounts
  useEffect(() => {
    const fetchItem = async () => {
      try {
        const res = await api.get(`/inventory/${stock_id}`);
        console.log('Grabbing current item:', res.data);
  
        setFormData({
          ...res.data
        });
  
      } catch (err) {
        console.error('Error fetching current item:', err);
      }
    };
  
    fetchItem();
  }, [stock_id]);


  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const res = await api.put(`/inventory/update/${stock_id}`, formData);
      console.log('Edit successful:', res.data);
      navigate('/inventory');
    } catch (err) {
      console.error('Error editing item:', err);
    }
  };

  // onChange for edit compnment
  // parent owns formdata, we keep on change

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

    // Back button click 
    const handleEditButtonClick = () => {
      navigate("/inventory");
    };

  return (
    <div>
                <button onClick={handleEditButtonClick} className="back_button">
                Back to Inventory 
        </button>
      <p>Editing Item with ID: {stock_id}</p>

      <div className="form-container">
        <EditItemForm formData={formData} handleChange={handleChange} handleSubmit={handleSubmit} setFormData={setFormData} title="Edit a Stock Item" />
      </div>
    </div>
  );
};

export default EditStock;
