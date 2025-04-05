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

import React, { useEffect, useState } from 'react';
import axios from "axios"
import { useNavigate } from "react-router-dom";
import { MdEdit } from "react-icons/md";

export const ShowInventory = (props) => { 
  const [inventory, setInventory] = useState([]);
  const [onOrderItems, setOnOrderItems] = useState([]); 
  const [partialItems, setPartialItems] = useState([]);
  const [deliveredItems, setDeliveredItems] = useState([]);
  
  // flag to trigger refetch after adding or editing stock item
  const [fetchInventory, setFetchInventory] = useState(true);
  
  const navigate = useNavigate();

  useEffect(() => {
    if (fetchInventory) {
      axios
        .get('http://127.0.0.1:8000/get_inventory')
        .then((res) => {
          console.log('Received raw inventory data:', res.data.data);
          setInventory(res.data.data);
          sortInventory(res.data.data);
        })
        .catch((err) => console.error(err));
        
      setFetchInventory(false);
    }
  }, [fetchInventory]);

  function sortInventory(data) {
    console.log('Received inventory data:', data);  // Check the data here
    const onOrder = data.filter((item) => item.status === "On-Order");
    const partiallyReceived = data.filter((item) => item.status === "Partially Received");
    const delivered = data.filter((item) => item.status === "Delivered");
    console.log('Delivered Items:', delivered);  // Check the delivered items here
    setOnOrderItems(onOrder);
    setPartialItems(partiallyReceived);
    setDeliveredItems(delivered);
  }

  const handleEditButtonClick = (stockNumber) => {
    // Navigate to the edit page with the stock number
    navigate(`/inventory/edit/${stockNumber}`);
  };

  const handleNewButtonClick = () => {
    navigate("/inventory/new");
  };

  return (
    <div className="inventory-container">
      <h1>Inventory Report</h1>

      <button onClick={handleNewButtonClick} className="newStock_button">
        New Stock Item
      </button>

      <h2>On-Order Items</h2>
      <table className="inventory-table">
        <thead>
          <tr>
            <th> </th>
            <th>PO</th>
            <th>Product Name</th>
            <th>SKU</th>
            <th>Price ($)</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {onOrderItems.map((item, index) => (
            <tr key={index}>
              <td>
                <button
                  onClick={() => handleEditButtonClick(item.stock_id)} 
                  className="editStock_button"
                >
                  <MdEdit className="editStockIcon"/>
                </button>
              </td>
              <td>{item.po}</td>
              <td>{item.product_name}</td>
              <td>{item.sku}</td>
              <td>${item.price}</td>
              <td>{item.quantity_ordered}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Partially Received Items</h2>
      <table className="inventory-table">
        <thead>
          <tr>
            <th> </th>
            <th>PO</th>
            <th>Product Name</th>
            <th>SKU</th>
            <th>Price ($)</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {partialItems.map((item, index) => (
            <tr key={index}>
              <td>
                <button
                  onClick={() => handleEditButtonClick(item.sku)} // Passing the SKU as stock number
                  className="editStock_button"
                >
                  <MdEdit className="editStockIcon"/>
                </button>
              </td>
              <td>{item.po}</td>
              <td>{item.product_name}</td>
              <td>{item.sku}</td>
              <td>${item.price}</td>
              <td>{item.quantity_ordered}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Delivered Items</h2>
      <table className="inventory-table">
        <thead>
          <tr>
            <th> </th>
            <th>PO</th>
            <th>Product Name</th>
            <th>SKU</th>
            <th>Price ($)</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {deliveredItems.map((item, index) => (
            <tr key={index}>
              <td>
                <button
                  onClick={() => handleEditButtonClick(item.stock_id)} // Passing the SKU as stock number
                  className="editStock_button"
                >
                  <MdEdit className="editStockIcon"/>
                </button>
              </td>
              <td>{item.po}</td>
              <td>{item.product_name}</td>
              <td>{item.sku}</td>
              <td>${item.price}</td>
              <td>{item.quantity_ordered}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ShowInventory;
