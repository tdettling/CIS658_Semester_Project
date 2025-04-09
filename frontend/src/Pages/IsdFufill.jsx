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


    //grab current fufillment lines matching isd number
    //it's fine if it's empty
    useEffect(() => {
        axios
            .get(`http://127.0.0.1:8000/ISDs/${isd_number}`)
            .then((res) => {
                setISDdata(res.data);
                console.log('Response Data:', res.data); 
            })
            .catch((err) => console.error(err));
    }, [isd_number]);

    //grab current fulfillment lines matching ISD number
    useEffect(() => {
        axios
          .get(`http://127.0.0.1:8000/ISDs/fufillment/${isd_number}`)
          .then((res) => {
            updateFulfillmentData(res.data);
            console.log('Fulfillment Data:', res.data);
            grabTotalPricing(res.data); 
          })
          .catch((err) => console.error(err));
    }, [isd_number]);




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

    // everytime there's a new line item, add it onto the prevous data
    const addNewLineItem = () => {
        setLineItems([...lineItems, {}]);  
    }
    
    //on submit button hit, send form data to fufillment database to be added
    const handleSubmit = () => {
        // Collect all form data from each NewLineItemISD
        const allFormData = lineItems.map((_, index) => {
            const form = document.getElementById(`line-item-form-${index}`);
            const formData = new FormData(form);
            return {
                fulfilled_sku: formData.get("fulfilled_sku"),
                fulfilled_po: formData.get("fulfilled_po"),
                fulfilled_quantity: formData.get("fulfilled_quantity"),
                fulfilled_price: formData.get("fulfilled_price"), 
                fulfilled_memo: formData.get("fulfilled_memo"), 
                fulfilled_date: formData.get("fulfilled_date"), 

            };
        });
        
        // Send the data to the backend
        axios.post('http://127.0.0.1:8000/ISDs/fulfillments', allFormData)
            .then(response => {
                console.log('Successfully added fulfillment data:', response);
            })
            .catch(error => {
                console.error('Error adding fulfillment data:', error);
            });
    }


  return (
    <div>

    <div> 
      <button> ISD-{ISD_Data.isd_number} </button>
      <h4> Total ISD Price: ${totalPrice} </h4>

      </div>

      <div>
        <p> Status Bar here</p>
                <div class="dropdown">
        <button class="dropbtn">Status</button>
        <div class="dropdown-content">
            <a href="#">Link 1</a>
            <a href="#">Link 2</a>
            <a href="#">Link 3</a>
        </div>
        <button>
            Save
        </button>

        <div> 
        <p> Ticket Number: num</p>
        </div>

</div>
      </div>

      <div>
        <h2> Requestor Name here</h2>
        <h3> Requestor Email here </h3>
        <h3> Cost Center Information: info here</h3>
      </div>

      <div>
        <h2> Items Requested: </h2>
        <p> some item </p>
        <p> some item </p>
        <p> some item </p>
      </div>

        <div>
        <button onClick={addNewLineItem}>
                    <FaPlusSquare />
                </button>

                    {lineItems.map((_, index) => (
                    <NewLineItemISD key={index} index={index} />
                ))}

                <button onClick={handleSubmit}>Submit All Items</button>
        </div>

      
    </div>
  )
}

export default IsdFufill
