import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';  
import EditItemForm from '../Components/EditItemForm';

const EditStock = () => {
  const { stock_id } = useParams(); 
  const navigate = useNavigate();
  const [item, setItem] = useState(null);

  const [formData, setFormData] = useState({
    product_name: '',
    sku: '',
    po: '',
    price: '',
    quantity_ordered: '',
    quantity_arrived: '',
    quantity_available: '',
    vendor: '',
    status: '',
    serial_numbers: '',
    category: '',
  });

  // grab the current item data when the component mounts
  useEffect(() => {
    const fetchItem = async () => {
      try {
        const res = await axios.get(`http://127.0.0.1:8000/inventory/${stock_id}`, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        console.log('Grabbing current item:', res.data);
        setFormData(res.data); 
      } catch (err) {
        console.error('Error fetching current item:', err);
      }
    };

    fetchItem();
  }, [stock_id]);


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.put(`http://127.0.0.1:8000/inventory/update/${stock_id}`, formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('Edit successful:', res.data);
      navigate('/inventory'); 
    } catch (err) {
      console.error('Error editing item:', err);
    }
  };

  // onChange for edit compnment
  // parent owns formdata, we keep on change
    // Handle form field changes
      // https://stackoverflow.com/questions/64210380/get-value-from-e-target-name-and-use-in-react-hooks-setstate
    // https://www.reddit.com/r/reactjs/comments/rwqufw/what_is_the_difference_between_these_prevstate/?rdt=53661
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  return (
    <div>
      <h1>Welcome to Our Store!</h1>
      <p>Edit Stock</p>
      <p>Editing Item with ID: {stock_id}</p>

      <div className="form-container">
        <EditItemForm formData={formData} handleChange={handleChange} handleSubmit={handleSubmit} setFormData={setFormData} title="Edit a Stock Item" />
      </div>
    </div>
  );
};

export default EditStock;
