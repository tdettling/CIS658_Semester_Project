/*
L Dettling
CIS 658


Tutorial for APIs - 
http://medium.com/nerd-for-tech/fetching-api-using-useeffect-hook-in-react-js-7b9b34e427ca

Tables:
https://www.geeksforgeeks.org/how-to-create-a-table-in-reactjs/

Making edit icons appear when a button is selected: 
https://stackoverflow.com/questions/75354703/show-specific-item-when-button-clicked-from-list-of-items-in-react?utm_source=chatgpt.com


*/

    /* IN-CLASS CODE
    static addColor(color) {
    const options = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=UTF-8'
      },
      body: JSON.stringify(color)
    }
    console.log('Attempting to post new color')
    console.log(color)

    return fetch(`${apiURL}/colors/`, options).then(async response => {
      if (response.ok) {
        console.log('Response was ok')
        return response.json()
      } else {
        console.log('There was a error')
        throw new Error(`Problem with POST:  ${(await response.json()).message}`)
      }
    })
  }

    */

  //tutorial --

import React, { useEffect, useState } from 'react';
import axios from "axios"
import { useNavigate } from "react-router-dom";
  
  export const ShowInventory = (props) => { 
    const [inventory, setInventory] = useState([]);

    const [onOrderItems, setOnOrderItems] = useState([]);
    const [deliveredItems, setDeliveredItems] = useState([]);

    // Makes the items viable for editing
    const [editItems, setEditItems] = useState([]);
    const [editItemVisable, setEditVisable] = useState(false);
    const [editButtonName, setEditButtonName] = useState("Edit Stock Items")

    const navigate = useNavigate();

    useEffect(() => {
        axios
        .get('http://127.0.0.1:8000/inventory')
        .then((res) => {
            setInventory(res.data);
            sortInventory(res.data);
            console.log(inventory)
        } )
        .catch((err) => console.error(err));
      }, []);


    function sortInventory(data) {
      const onOrder = data.filter((item) => item.status === "On-Order");
      const delivered = data.filter((item) => item.status === "Delivered");
      console.log(onOrder)
      setOnOrderItems(onOrder);
      setDeliveredItems(delivered);
    }

    const handleEditButtonClick = () => {
      if (editButtonName == "Submit"){
        navigate("/inventory/edit")
      }
      setEditVisable(true); 
      setEditButtonName("Submit")
  };

    

    return (
      <div className="inventory-container">
        <h1>Inventory Report</h1>

        <button onClick={handleEditButtonClick} className="editStock_button">
                {editButtonName}
        </button>
  
        <h2>On-Order Items</h2>
        <table className="inventory-table">
          <thead>
            <tr>
              <th>Stock ID</th>
              <th>Product Name</th>
              <th>SKU</th>
              <th>PO</th>
              <th>Price ($)</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {onOrderItems.map((item, index) => (
              <tr key={index}>
              <td>
                  {editItemVisable && <span>✔️</span>}
              </td>
                <td>{item.stock_number}</td>
                <td>{item.product_name}</td>
                <td>{item.sku}</td>
                <td>{item.PO}</td>
                <td>${item.price}</td>
                <td>{item.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h2>Delivered Items</h2>
        <table className="inventory-table">
          <thead>
            <tr>
              <th>Stock ID</th>
              <th>Product Name</th>
              <th>SKU</th>
              <th>PO</th>
              <th>Price ($)</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {deliveredItems.map((item, index) => (
              <tr key={index}>
                <td>{item.stock_number}</td>
                <td>{item.product_name}</td>
                <td>{item.sku}</td>
                <td>{item.PO}</td>
                <td>${item.price}</td>
                <td>{item.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  
  export default ShowInventory;