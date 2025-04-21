/*
L Dettling 
CIS 658 Project

Sources for this file:


*/

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';  
import { FaPlusSquare } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import NewLineItemISD from '../Components/NewLineItemISD';
import { Link, useNavigate } from 'react-router-dom';  
import Select from 'react-select';

import '../Forms.css'
import api from '../api';


function IsdFufill() {
    const navigate = useNavigate();

    const { isd_number } = useParams(); 

    const [ISD_Data, setISDdata] = useState({});
    const [totalPrice, updateTotalPrice] = useState(0);
    const [fulfillmentData, updateFulfillmentData] = useState([]);
    const [lineItems, setLineItems] = useState([]);  
    const [inventory, setInventory] = useState([]);
    const [ISD_Data_Items, setISDlines] = useState([]);

    const [hasFetchedFulfillment, setHasFetchedFulfillment] = useState(false);

    const newStatus = "New";
    const onOrderStatus = "On-Order";
    const readyInvoice = "Ready-to-Invoice";
    const closedStatus = "Closed";

    const [selectedStatus, setSelectedStatus] = useState("");

    useEffect(() => {
      grabTotalPricing(lineItems);
    }, [lineItems]);
    

    useEffect(() => {
        api.get(`/ISDs/${isd_number}`)
            .then((res) => {
                setISDdata(res.data);
                setSelectedStatus(res.data.status);
                console.log('Response Data:', res.data);
                parse_ISD_item_list(res.data);
            })
            .catch((err) => console.error(err));
    }, [isd_number]);



    useEffect(() => {
      if (!hasFetchedFulfillment) {
        api.get(`/ISDs/fufillment/${isd_number}`)
          .then((res) => {
            updateFulfillmentData(res.data.data || []);
            setLineItems(res.data.data || []);
            grabTotalPricing(res.data.data || []);
            setHasFetchedFulfillment(true);
          })
          .catch((err) => console.error(err));
      }
    }, [isd_number, hasFetchedFulfillment]);
  


    useEffect(() => {
        api.get('/get_inventory')
            .then((res) => {
                setInventory(res.data.data);
            })
            .catch((err) => console.error(err));
    }, []);

    function grabTotalPricing(data) {
        let total = 0;
        data.forEach(item => {
            let lineItemPrice = item.fulfilled_price * item.fulfilled_quantity;
            total += lineItemPrice;
        });
        updateTotalPrice(total);
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
    
    

    const handleSubmit = () => {
        const allFormData = lineItems.map((item, index) => {
            const form = document.getElementById(`line-item-form-${index}`);
            const formData = new FormData(form);
            const inventoryItem = inventory.find(item => 
                item.sku === formData.get("fulfilled_sku") && 
                item.po === formData.get("fulfilled_po")
            );

            return {
                isd_number: isd_number,
                fulfilled_sku: formData.get("fulfilled_sku"),
                fulfilled_po: formData.get("fulfilled_po"),
                fulfilled_quantity: formData.get("fulfilled_quantity"),
                fulfilled_price: formData.get("fulfilled_price"),
                fulfilled_memo: formData.get("fulfilled_memo"),
                fulfilled_date: formData.get("fulfilled_date"),
                stock_id: inventoryItem ? inventoryItem.stock_id : null, 
            };
        });

        const payload = { item_rows: allFormData };

        api.put(`/ISDs/fulfillment/submit/test/${isd_number}`, payload)
          .then(response => {
            console.log('Successfully updated inventory:', response);
            navigate("/ISDs");
          })
          .catch(error => {
            console.error('Error updating inventory:', error);
          });

          
    };

    function parse_ISD_item_list(data){
        let itemsToDisplay = [];
        if (data.items) {
            if (Array.isArray(data.items)) {
                itemsToDisplay = data.items;
            } else {
                try {
                    itemsToDisplay = JSON.parse(data.items);
                } catch (error) {
                    console.error("Failed to parse ISD_Data.items:", error);
                }
            }
        }
        setISDlines(itemsToDisplay);
    }

    const handleStatusChange = (status) => {
        setSelectedStatus(status);
    };

    const handleStatusSave = () => {
        api.put(`/ISDs/${selectedStatus}/${isd_number}`, {})
          .then(response => {
            console.log('Successfully updated status:', response);
          })
          .catch(error => {
            console.error('Error updating status:', error);
          });
      };

    const handleBackButtonClick = () => {
        navigate("/ISDs");
      };



      function grabTotalPricing(items) {
        if (!Array.isArray(items)) {
          console.warn("Expected an array for pricing but got:", items);
          return;
        }
      
        let total = 0;
        items.forEach(item => {
          const quantity = parseFloat(item.fulfilled_quantity);
          const price = parseFloat(item.fulfilled_price);
          if (!isNaN(quantity) && !isNaN(price)) {
            total += quantity * price;
          }
        });
      
        updateTotalPrice(total);
      }
      
      
      

    

      return (
        <div>

          <div className="fulfill-header">
            <button onClick={handleBackButtonClick} className="back_button">Back to ISDs</button>
            <span className="total-price">Total ISD Price: ${totalPrice.toFixed(2)}</span>
          </div>
      
      
          <h2>ISD-{ISD_Data.isd_number}</h2>
      

          <div className="fulfill-top-row">
            <div className="info-box">
              <h2>Requestor:</h2>
              <p><strong>{ISD_Data.requestor_name}</strong></p>
              <p>{ISD_Data.requestor_email}</p>
              <p>{ISD_Data.requestor_address}</p>
              <p><strong>Cost Center:</strong> {ISD_Data.cc}</p>
            </div>
      
            <div className="info-box items-requested">
              <h2>Items Requested:</h2>
              {ISD_Data_Items.map((entry, index) => (
                <p key={index}>{entry.item}, Quantity: {entry.quantity}</p>
              ))}
            </div>
          </div>
      

          <div className="status-container">
            <p>Status:</p>
            <div className="dropdown">
              <button className="dropbtn">{selectedStatus}</button>
              <div className="dropdown-content">
                <a href="#" onClick={() => handleStatusChange(newStatus)}>{newStatus}</a>
                <a href="#" onClick={() => handleStatusChange(onOrderStatus)}>{onOrderStatus}</a>
                <a href="#" onClick={() => handleStatusChange(readyInvoice)}>{readyInvoice}</a>
                <a href="#" onClick={() => handleStatusChange(closedStatus)}>{closedStatus}</a>
              </div>
            </div>
            <button onClick={handleStatusSave} className="submit-button">Save</button>
          </div>
      

          <button onClick={addNewLineItem} className="add-line-button">
            <FaPlusSquare />
          </button>
      

          {lineItems.map((item, index) => (
            <div key={index} className="line-item-wrapper">
              <NewLineItemISD 
                index={index} 
                inventory={inventory}
                updateLineItemData={updateLineItemData} 
                initialData={item} 
                onPriceChange={grabTotalPricing} 
              />
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button
                  type="button"
                  onClick={() => removeLineItem(index)}
                  className="minus-button"
                >
                  <MdDelete size={18} />
                  Remove Line
                </button>
              </div>
            </div>
          ))}
      

          <button onClick={handleSubmit} className="submit-button">
            Submit All Items
          </button>
        </div>
      );
      
}

export default IsdFufill;
