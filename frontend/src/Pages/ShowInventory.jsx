/*
L Dettling
CIS 658


Tutorial for APIs - 
http://medium.com/nerd-for-tech/fetching-api-using-useeffect-hook-in-react-js-7b9b34e427ca
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

import React, { useEffect, useState, View } from 'react';
import axios from "axios"
  
  export const ShowInventory = (props) => { 
    const [inventory, setInventory] = useState([]);

    useEffect(() => {
        getInventoryData();
    }, []);

    const getInventoryData = () => {
        axios
        .get('http://127.0.0.1:8000/inventory')
        .then((res) => {
            setInventory(res.data);
            console.log(inventory)
        } )
        .catch((err) => console.error(err));
    };

    return (
        <div>
          <h1>Wow! Here is our inventory</h1>
          <ul>
            {inventory.map((item) => (
              <li key={item.stock_number}>
                <h3>{item.product_name} (SKU: {item.sku})</h3>

                <p>PO: {item.PO}</p>
                <p>Price: ${item.price}</p>
                <p>Quantity: {item.quantity}</p>
                <p>Vendor: {item.vendor}</p>
                <p>Status: {item.status}</p>

                {item.serial_numbers.length > 0 && (
                  <div>
                    <h4>Serial Numbers:</h4>
                    <ul>
                      {item.serial_numbers.map((serial, index) => (
                        <li key={index}>{serial}</li>
                      ))}
                    </ul>
                  </div>


                )}
              </li>
            ))}
          </ul>
        </div>
      );
      
}

export default ShowInventory;