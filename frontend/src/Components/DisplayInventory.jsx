/*
L Dettling 
CIS 658 Project

Sources for this file:
https://www.youtube.com/watch?v=YxQlt3n1ZPA

https://www.w3schools.com/react/react_useeffect.asp
https://react.dev/reference/react/useEffect
https://www.digitalocean.com/community/tutorials/react-axios-react
https://axios-http.com/docs/handling_errors
https://stackoverflow.com/questions/49967779/axios-handling-errors
https://www.w3schools.com/jsref/jsref_slice_array.asp
https://react.dev/learn/updating-arrays-in-state
*/


import React, { useState } from "react";

/*
productName
sku: 'P2425HE',
  productPrice: 196.00,
  quantity: 30, 
  poNumber: 'PO-1000456',
  description: "This monitor has a USB-Hub base, so you will never need a dell docking station again! This product is 24 inches",
}, 
*/

const DisplayInventory = ({data}) => {

  const [inventory, updateInventory ] = useState(data);

  function handleChange(event, index, attribute) {
    // take the previous state of the inventory, refeence it (safty updates first), and then use the spread operator to update with event value. 
    // did something SUPER similar in CIS 657 
    updateInventory((prevInventory) => {
      let newInventory = [...prevInventory]; 
      
      switch (attribute) {
        case "name":
          newInventory[index] = { ...newInventory[index], productName: event.target.value };
          break;

        case "price":
          newInventory[index] = { ...newInventory[index], productPrice: event.target.value };
          break;
        
        case "SKU":
          newInventory[index] = { ...newInventory[index], sku: event.target.value };
          break;

        case "quantity":
          newInventory[index] = { ...newInventory[index], quantity: event.target.value };
          break;

        case "PO":
          newInventory[index] = { ...newInventory[index], poNumber: event.target.value };
          break;

        case "desc":
          newInventory[index] = { ...newInventory[index], description: event.target.value };
          break;

        default:
          console.log("Something is bad");
          break;
      }
    return newInventory;
  });
}


  return (
    <div className="inventory-container">
      <h2>Technology Acquisition Inventory</h2>
      <ul>
      
        {inventory.map((item, index) => (
          <li key={index}>
            <h3>{item.productName} ({item.sku})</h3>
            <p>Price: ${item.productPrice}</p>
            <p>Quantity: {item.quantity}</p>
            <p>PO Number: {item.poNumber}</p>
            <p>Description: {item.description}</p>

            <h2> Want to edit the item? </h2>
            <div className="editItem-container">
              <p> Product name: </p><input type="text" onChange={(event) => handleChange(event, index, "name")} /> <br/>
            </div>
            <div className="editItem-container">
              <p> Product Price: </p><input type="number" onChange={(event) => handleChange(event, index, "price")} /> <br/>
            </div><div className="editItem-container">
              <p> Product SKU: </p><input type="text" onChange={(event) => handleChange(event, index, "SKU")} /> <br/>
            </div>
            <div className="editItem-container">
              <p> Product Quantity: </p><input type="number" onChange={(event) => handleChange(event, index, "quantity")} /> <br/>
            </div>
            <div className="editItem-container">
              <p> PO Number: </p><input type="text" onChange={(event) => handleChange(event, index, "PO")} /><br/>
            </div>
            <div className="editItem-container">
              <p> Description: </p><input type="text" onChange={(event) => handleChange(event, index, "desc")} /> <br/>
            </div>

          </li>
        ))}
      </ul>
      
    </div>
  );
};

export default DisplayInventory;