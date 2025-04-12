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
//icons
// https://react-icons.github.io/react-icons/
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { FaPlusSquare } from "react-icons/fa";
import DeletePopup from '../Components/DeletePopup';

export const ShowInventory = (props) => { 
  const [inventory, setInventory] = useState([]);
  const [onOrderItems, setOnOrderItems] = useState([]); 
  const [partialItems, setPartialItems] = useState([]);
  const [deliveredItems, setDeliveredItems] = useState([]);

  //deleting an item, double check via popup
  const [deletePopup, setPopup] = useState(false);
  const [deletePopupItem, setDeletePopupItem] = useState(null);

  
  // flag to trigger refresh after adding/editing stock item
  const [fetchInventory, setFetchInventory] = useState(true);
  
  const navigate = useNavigate();

  useEffect(() => {
    if (fetchInventory) {
      axios
        .get('http://127.0.0.1:8000/get_inventory')
        .then((res) => {
          setInventory(res.data.data);
          sortInventory(res.data.data);
        })
        .catch((err) => console.error(err));
        
      setFetchInventory(false);
    }
  }, [fetchInventory]);

  function sortInventory(data) {

    const onOrder = data.filter((item) => item.status === "On-Order");
    const partiallyReceived = data.filter((item) => item.status === "Partially Received");
    const delivered = data.filter((item) => item.status === "Delivered");

    setOnOrderItems(onOrder);
    setPartialItems(partiallyReceived);
    setDeliveredItems(delivered);
  }

  const handleEditButtonClick = (stockNumber) => {
    // grab the stock info
    navigate(`/inventory/edit/${stockNumber}`);
  };

  const handleNewButtonClick = () => {
    navigate("/inventory/new");
  };

  const handleDeleteButtonClick = async (e, stock_id) => {
    e.preventDefault();
  
    try {
      const res = await axios.delete(`http://127.0.0.1:8000/inventory/delete/${stock_id}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      console.log('Delete successful:', res.data);
      // triggers refresh, usestate will only update when a compnent is refreshed. 
      navigate('/inventory'); 
    } catch (err) {
      console.error('Error deleting item:', err);
    }
  };
  
  // handle PO search

  return (
    <div className="inventory-container">
      <h1>Inventory Report</h1>
      <div>
      <form autocomplete="on" action="/">
                <div class="autocomplete" >
                    <input id="PO_Search" type="text" name="po_search" placeholder="PO # "/>
                </div>

                <input type="submit"/>

            </form>
      </div>

      <button onClick={handleNewButtonClick} className="newStock_button">
      
       <FaPlusSquare className='addStockIcon' />
      </button>


      <h2>On-Order Items</h2>

      <table className="inventory-table">
        <thead>
                <tr>
                  <th> Actions </th>
                  <th>PO</th>
                  <th>Product Name</th>
                  <th>SKU</th>
                  <th>Price ($)</th>
                  <th>Quantity Ordered</th>
                  <th>Quantity Available</th>
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

          <button
            onClick={() => {
              setPopup(true);
              setDeletePopupItem(item);
            }}
            className="editStock_button"
          >
            <MdDelete className="editStockIcon"/>
          </button>
        </td>
        <td>{item.po}</td>
        <td>{item.product_name}</td>
        <td>{item.sku}</td>
        <td>${item.price}</td>
        <td>{item.quantity_ordered}</td>
        <td>{item.quantity_available}</td>
      </tr>

          ))}
        </tbody>
      </table>

        {deletePopupItem && (
        <DeletePopup
          trigger={deletePopup}
          setTrigger={(val) => {
            setPopup(val);
            if (!val) setDeletePopupItem(null);
          }}
          onConfirm={(e) => {
            handleDeleteButtonClick(e, deletePopupItem?.stock_id);
            setPopup(false);
            setDeletePopupItem(null);
            setFetchInventory(true);
          }}
          >


          <h2>Are you sure you want to delete this stock item?</h2>
          <p>Product Name: {deletePopupItem.product_name}</p>
          <p>PO Number: {deletePopupItem.po}</p>
        </DeletePopup>
      )}


      <h2>Partially Received Items</h2>
      <table className="inventory-table">
        <thead>
          <tr>
            <th> Actions </th>
            <th>PO</th>
            <th>Product Name</th>
            <th>SKU</th>
            <th>Price ($)</th>
            <th>Quantity</th>
            <th>Quantity Available</th>
          </tr>
        </thead>
        <tbody>
          {partialItems.map((item, index) => (
            <tr key={index}>
              <td>
                <button
                  onClick={() => handleEditButtonClick(item.stock_id)} 
                  className="editStock_button"
                >
                  <MdEdit className="editStockIcon"/>
                </button>

                <button
                  onClick={() => {
                    setPopup(true);
                    setDeletePopupItem(item);
                  }}
                  className="editStock_button"
                >
                  <MdDelete className="editStockIcon"/>
                </button>


              </td>
              <td>{item.po}</td>
              <td>{item.product_name}</td>
              <td>{item.sku}</td>
              <td>${item.price}</td>
              <td>{item.quantity_ordered}</td>
              <td>{item.quantity_available}</td>
            </tr>
          ))}
        </tbody>
            </table>

        {deletePopupItem && (
        <DeletePopup
          trigger={deletePopup}
          setTrigger={(val) => {
            setPopup(val);
            if (!val) setDeletePopupItem(null);
          }}
          onConfirm={(e) => {
            handleDeleteButtonClick(e, deletePopupItem?.stock_id);
            setPopup(false);
            setDeletePopupItem(null);
            setFetchInventory(true);
          }}
          >

          
          <h2>Are you sure you want to delete this stock item?</h2>
          <p>Product Name: {deletePopupItem.product_name}</p>
          <p>PO Number: {deletePopupItem.po}</p>
        </DeletePopup>
      )}

      <h2>Delivered Items</h2>
      <table className="inventory-table">
        <thead>
          <tr>
            <th> Actions </th>
            <th>PO</th>
            <th>Product Name</th>
            <th>SKU</th>
            <th>Price ($)</th>
            <th>Quantity</th>
            <th>Quantity Available</th>
          </tr>
        </thead>
        <tbody>
          {deliveredItems.map((item, index) => (
            <tr key={index}>
              <td>
                <button
                  onClick={() => handleEditButtonClick(item.stock_id)} 
                  className="editStock_button"
                >
                  <MdEdit className="editStockIcon"/>
                </button>

                <button
                  onClick={() => {
                    setPopup(true);
                    setDeletePopupItem(item);
                  }}
                  className="editStock_button"
                >
                  <MdDelete className="editStockIcon"/>
                </button>
              </td>
              <td>{item.po}</td>
              <td>{item.product_name}</td>
              <td>{item.sku}</td>
              <td>${item.price}</td>
              <td>{item.quantity_ordered}</td>
              <td>{item.quantity_available}</td>
            </tr>
          ))}
        </tbody>
        </table>

        {deletePopupItem && (
        <DeletePopup
          trigger={deletePopup}
          setTrigger={(val) => {
            setPopup(val);
            if (!val) setDeletePopupItem(null);
          }}
          onConfirm={(e) => {
            handleDeleteButtonClick(e, deletePopupItem?.stock_id);
            setPopup(false);
            setDeletePopupItem(null);
            setFetchInventory(true);
          }}
          >

          
          <h2>Are you sure you want to delete this stock item?</h2>
          <p>Product Name: {deletePopupItem.product_name}</p>
          <p>PO Number: {deletePopupItem.po}</p>
        </DeletePopup>
        )}
    </div>
  );
};

export default ShowInventory;
