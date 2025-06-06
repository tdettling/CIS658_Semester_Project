/*
L Dettling 
CIS 658 Project

Sources for this file:
https://www.w3schools.com/react/react_useeffect.asp
https://react.dev/reference/react/useEffect
https://www.digitalocean.com/community/tutorials/react-axios-react
https://axios-http.com/docs/handling_errors
https://stackoverflow.com/questions/49967779/axios-handling-errors
https://www.w3schools.com/jsref/jsref_slice_array.asp
https://react.dev/learn/updating-arrays-in-state
*/


import React, { useEffect, useState } from 'react';
import axios from "axios"
import { useNavigate } from "react-router-dom";
import api from '../../api';


function POSearch() {
  const [PO_Search, setPOSearch] = useState('');
  const [inventory, setInventory] = useState([]);

  const navigate = useNavigate();


  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!PO_Search) return;
  
    try {
      const res = await api.get('/get_inventory'); 
      const inventoryList = res.data.data;
  
      const stock_item = inventoryList.find((item) => item.po === PO_Search);
      if (stock_item) {
        navigate(`/inventory/edit/${stock_item.stock_id}`);
      } else {
        alert("PO not found.");
      }
    } catch (err) {
      console.error("Error fetching inventory:", err);
    }
  };
  

  return (
    <div className="search-container">
      <form onSubmit={handleSubmit} className="search-form">
        <div className="input-container">
          <input
            id="PO_Search"
            type="text"
            name="po_search"
            data-cy="po_search"
            placeholder="PO"
            value={PO_Search}
            onChange={(e) => setPOSearch(e.target.value)}
            className="input-field"
          />
        </div>
        <input type="submit" value="Search" data-cy="po_submit" className="submit-button" />
      </form>
    </div>
  );
}

export default POSearch;
