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



import React, { useState, useEffect } from 'react';

function AddLineItemISD({ index, updateLineItemData }) {
  const [formData, setFormData] = useState({
    item: '',
    quantity: 0,
  });

  useEffect(() => {
    updateLineItemData(index, formData);
  }, [formData]);

  return (
    <div className='lineItemElement'>
      <div className="autocomplete">
        
        <div className="lineItem-field">
          <label htmlFor={`item-${index}`}>Item</label>
          <input
            id={`item-${index}`}
            type="text"
            name="item"
            value={formData.item}
            onChange={e => setFormData({ ...formData, item: e.target.value })}
            placeholder="Item"
            required
          />
        </div>
  
        <div className="lineItem-field">
          <label htmlFor={`quantity-${index}`}>Quantity</label>
          <input
            id={`quantity-${index}`}
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={e => setFormData({ ...formData, quantity: e.target.value })}
            placeholder="Quantity"
            required
          />
        </div>
  
      </div>
    </div>
  );
  
}

export default AddLineItemISD;
