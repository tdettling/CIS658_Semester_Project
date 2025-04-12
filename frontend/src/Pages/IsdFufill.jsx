import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';  
import { FaPlusSquare } from "react-icons/fa";
import NewLineItemISD from '../Components/NewLineItemISD';


//   https://www.w3schools.com/howto/howto_css_dropdown.asp


function IsdFufill() {
    const { isd_number } = useParams(); 

    const [ISD_Data, setISDdata] = useState([]);
    const [totalPrice, updateTotalPrice] = useState([]);
    const [fulfillmentData, updateFulfillmentData] = useState([]);
    const [lineItems, setLineItems] = useState([]);  
    const [inventory, setInventory] = useState([]);

    const [ISD_Data_Items, setISDlines] = useState([]);


    //grab current fufillment lines matching isd number
    //it's fine if it's empty
    useEffect(() => {
        axios
            .get(`http://127.0.0.1:8000/ISDs/${isd_number}`)
            .then((res) => {
                setISDdata(res.data);
                console.log('Response Data:', res.data); 
                parse_ISD_item_list(res.data);
            })
            .catch((err) => console.error(err));
    }, [isd_number]);

    //grab current fulfillment lines matching ISD number
    useEffect(() => {
        axios
          .get(`http://127.0.0.1:8000/ISDs/fufillment/${isd_number}`)
          .then((res) => {
            updateFulfillmentData(res.data);
            setLineItems(res.data.data);
            console.log('Fulfillment Data:', res.data);
            grabTotalPricing(res.data); 
            
          })
          .catch((err) => console.error(err));
    }, [isd_number]);

        // grab stock for autofill
         useEffect(() => {
             axios
               .get('http://127.0.0.1:8000/get_inventory')
               .then((res) => {
                 setInventory(res.data.data);
               })
               .catch((err) => console.error(err));
               
         }, []);




    function grabTotalPricing() {
        let total = 0;
        // if there aren't any rows in fufillment table, then nothing has been added yet, 
        // and the price will be 0
        if (!fulfillmentData) {
            updateTotalPrice(total);
            return;
        }
        // for each row, find the row total and add it to running order total. 
        fulfillmentData.forEach(item => {
            let lineItemPrice = item.fulfilled_price * item.fulfilled_quantity;
            total += lineItemPrice;
        });
        updateTotalPrice(total);
    }

    const addNewLineItem = () => {
        setLineItems([...lineItems, {}]);  
    };

    // Update a specific line item's data
    const updateLineItemData = (index, data) => {
        const updatedLineItems = [...lineItems];
        updatedLineItems[index] = data;
        setLineItems(updatedLineItems);
    };

    // everytime there's a new line item, add it onto the prevous data
    const handleSubmit = () => {
        const allFormData = lineItems.map((_, index) => {
            const form = document.getElementById(`line-item-form-${index}`);
            const formData = new FormData(form);
        
            // Find the inventory item for the current line item
            const inventoryItem = inventory.find(item => item.sku === formData.get("fulfilled_sku") && item.po === formData.get("fulfilled_po"));
        
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
    
        // Send the data to the backend as JSON
        const payload = { item_rows: allFormData };
        axios.put(`http://127.0.0.1:8000/ISDs/fulfillment/submit/test/${isd_number}`, payload, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            console.log('Successfully updated inventory:', response);
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


    return (
        <div>
            <div> 
                <button> ISD-{ISD_Data.isd_number} </button>
                <h4> Total ISD Price: ${totalPrice} </h4>
            </div>
    
            <div>
                <p> Status Bar here</p>
                <div className="dropdown">
                    <button className="dropbtn">Status</button>
                    <div className="dropdown-content">
                        <a href="#">Link 1</a>
                        <a href="#">Link 2</a>
                        <a href="#">Link 3</a>
                    </div>
                    <button>Save</button>
                    <div> 
                        <p> Ticket Number: num</p>
                    </div>
                </div>
            </div>
    
            <div>
                <h2> Requestor: {ISD_Data.requestor_name}, {ISD_Data.requestor_email}</h2>
                <h3> {ISD_Data.requestor_address} </h3>
                <h3> Cost Center Information: {ISD_Data.cc}</h3>
            </div>
    
            <div>
                <h2>Items Requested:</h2>
                {ISD_Data_Items.map((entry, index) => (
                    <p key={index}>
                        {entry.item}, Quantity: {entry.quantity}
                    </p>
                ))}
            </div>


    
            <div>
                <button onClick={addNewLineItem}>
                    <FaPlusSquare />
                </button>
                {lineItems.map((item, index) => (
                    <NewLineItemISD 
                        key={index} 
                        index={index} 
                        inventory={inventory}
                        updateLineItemData={updateLineItemData} 
                        initialData={item} 
                    />
                ))}
                <button onClick={handleSubmit}>Submit All Items</button>
            </div>
        </div>
    );
    
}

export default IsdFufill
